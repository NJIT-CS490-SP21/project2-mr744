import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_socketio import join_room, leave_room
from dotenv import load_dotenv, find_dotenv
import json
load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import models
db.create_all()


cors = CORS(app, resources={r"/": {"origins": ""}})

users_list = []
user_dict = {}
id_count = 1 
game_status = []
limit = 0
leaderboard = {}

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    global user_dict, users_list, id_count

    if request.sid in user_dict:
        if(user_dict[request.sid][1] <= 2):
            user_dict.clear()
            leaderboard.clear()
            users_list.clear()
            id_count = 1
            socketio.emit('disconnect', {'users_list':users_list})
            
    print('User disconnected!')
    

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('move')
def on_chat(data): # data is whatever arg you pass in your emit call on client

    socketio.emit('move',  data, broadcast=True, include_self=False)

# keeping tracking of which players have joined the match
@socketio.on('login')
def on_players(data):
    global id_count, leaderboard
    #check if username is already in database, if so no need to add them again
    #first query whole table
    query_player = models.Players.query.filter_by(username=data['username']).first()

    #player not in db, then add them
    if query_player == None:
        new_player = models.Players(username=data['username'], score=100)
        db.session.add(new_player)
        db.session.commit()
    
    isActive = False

    if id_count == 1:
        isActive =True
    
    #given the username
    user_dict[request.sid] = [ data['username'],id_count, isActive]
    users_list.append(data['username'])
    id_count+=1
    
    room = data['logged']
    
    join_room(room)

    data ={'user_dict': user_dict, 'users': users_list}
    
    #query the leaderboard by order
    ordered_list = models.Players.query.order_by(desc(models.Players.score)).all()

    for user in ordered_list:
        leaderboard[user.username] = user.score

    data['leaderboard'] = json.dumps(leaderboard, sort_keys=False)
    
    socketio.emit('login', data, broadcast=True, include_self=True, room=room)
    
@socketio.on('turn')
def on_next_turn(data):
    global limit,leaderboard
    print("On Last")
    data['all_users'] = users_list
    
    #if the game is finished, putting a limit here cuz the function called was getting duplicated for some reason
    if(data['status'] == 1 and limit == 0):
        limit+=1
        data['able'] = False
        
            # this means if game is not a draw
        if data['game'] != "":
                
                # find the winner, add one point
            winner = db.session.query(models.Players).filter_by(username=data['game']).first() 
        
            winner.score+=1
                
                # #find the loser, subtract one point
            loser_index = -1
            if users_list.index(data['game']) == 0: #if the winner is the first player to join then make second player loser
                loser_index = 1
            else:
                loser_index = 0
                    
            loser = db.session.query(models.Players).filter_by(username=users_list[loser_index]).first()
            loser.score-=1
            db.session.commit()
            
            #update leaderboard
            ordered_list = models.Players.query.order_by(desc(models.Players.score)).all()
            
            for user in ordered_list:
                leaderboard[user.username] = user.score
            
            
        data['leaderboard'] = json.dumps(leaderboard, sort_keys=False)      
            #find the loser, minus one point
        socketio.emit('turn', data, broadcast=True, include_self=True)
        return None
    elif limit == 0:
        print("Sending ")
        data['able'] = True
    
        print("Sending!")
        #emit the playerId and if it is their turn
        socketio.emit('turn', data, broadcast=True, include_self=False)
    
@socketio.on('replay')
def reset(data):
    global limit
    limit = 0
    #emit the playerId and if it is their turn
    socketio.emit('replay', data, broadcast=True, include_self=False)

    
# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )