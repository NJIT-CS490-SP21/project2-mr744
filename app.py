'''
Author: Mihir Rana
Date: 3/14/2021
'''
# disabling some of the errors
# pylint: disable= E1101, C0413, R0903, W0603, W1508
import os
from flask import Flask, send_from_directory, json, request, session  # pylint: disable=unused-import
from flask_socketio import SocketIO, join_room
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from dotenv import load_dotenv, find_dotenv

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

USERS_LIST = []
USER_DICT = {}
ID_COUNT = 1
LIMIT = 0
LEADERBOARD = {}

socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    ''' setting up project '''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    ''' When a client connects from this Socket connection, this function is run '''
    print('User connected!')


# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    ''' When a client disconnects from this Socket connection, this function is run '''
    global USER_DICT, USERS_LIST, ID_COUNT

    if request.sid in USER_DICT:
        if USER_DICT[request.sid][1] <= 2:
            USERS_LIST = clear_on_id(USER_DICT[request.sid][1], USERS_LIST)
            socketio.emit('disconnect', {'users_list': USERS_LIST})

    print('User disconnected!')


def clear_on_id(player_id, users_list):
    ''' clear all data structures upon p1 or p2 leaving '''
    global ID_COUNT
    if player_id <= 2:
        USER_DICT.clear()
        LEADERBOARD.clear()
        users_list.clear()
        ID_COUNT = 1
    return USERS_LIST


@socketio.on('move')
def on_chat(data):
    ''' emitting the move made by a player '''
    socketio.emit('move', data, broadcast=True, include_self=False)


# keeping tracking of which players have joined the match
@socketio.on('login')
def on_players(data):
    ''' # keeping tracking of which players have joined the match '''
    global ID_COUNT, LEADERBOARD, USERS_LIST
    #check if username is already in database, if so no need to add them again
    #first query whole table
    query_player = models.Players.query.filter_by(
        username=data['username']).first()

    print(query_player)
    #player not in db, then add them
    if query_player is None:

        new_player = models.Players(username=data['username'], score=100)
        LEADERBOARD = add_player(new_player)
        print("here")
        print(LEADERBOARD)

    is_active = False

    if ID_COUNT == 1:
        is_active = True

    #given the username
    USER_DICT[request.sid] = [data['username'], ID_COUNT, is_active]

    USERS_LIST = on_user_join(data['username'], USERS_LIST)

    room = data['logged']
    join_room(room)
    data = {'user_dict': USER_DICT, 'users': USERS_LIST}

    # #query the LEADERBOARD by order
    if LEADERBOARD == {}:
        ordered_list = models.Players.query.order_by(desc(
            models.Players.score)).all()

        for user in ordered_list:
            LEADERBOARD[user.username] = user.score

    print(f"The board is: {LEADERBOARD}")
    data['leaderboard'] = json.dumps(LEADERBOARD, sort_keys=False)
    socketio.emit('login', data, broadcast=True, include_self=True, room=room)


def on_user_join(name, users_list):
    ''' when user joins '''
    global ID_COUNT
    users_list.append(name)
    ID_COUNT += 1
    return users_list


def add_player(new_player):
    '''setting up function to add players into the db'''
    db.session.add(new_player)
    db.session.commit()
    ordered_list = my_order_by()
    return get_leader(ordered_list)


def my_order_by():
    ''' ordering the players '''
    ordered_list = models.Players.query.order_by(desc(
        models.Players.score)).all()
    return ordered_list


def get_leader(query_result):
    '''retrieving the leaderboard'''
    leaderboard = {}
    print(query_result)
    for user in query_result:
        leaderboard[user.username] = user.score
    return leaderboard


@socketio.on('turn')
def on_next_turn(data):
    '''keep track of whose turn it is '''
    global LIMIT, LEADERBOARD, USERS_LIST
    print("On Last")
    data['all_users'] = USERS_LIST

    #if the game is finished, putting a LIMIT here cuz the function called
    #was getting duplicated for some reason
    if (data['status'] == 1 and LIMIT == 0):
        LIMIT += 1
        data['able'] = False

        # this means if game is not a draw
        if data['game'] != "":

            # find the winner, add one point
            update_score(data['game'], 1)  #
            # #find the loser, subtract one point
            loser_index = -1
            if USERS_LIST.index(
                    data['game']
            ) == 0:  #if the winner is the first player to join then make second player loser
                loser_index = 1
            else:
                loser_index = 0

            LEADERBOARD = update_score(USERS_LIST[loser_index], -1)  #loser

        data['leaderboard'] = json.dumps(LEADERBOARD, sort_keys=False)
        #find the loser, minus one point
        socketio.emit('turn', data, broadcast=True, include_self=True)
    elif LIMIT == 0:
        print("Sending ")
        data['able'] = True

        print("Sending!")
        #emit the playerId and if it is their turn
        socketio.emit('turn', data, broadcast=True, include_self=False)


def update_score(the_username, num):
    ''' updating the score '''
    the_player = my_filter_by(the_username, num)
    player_score(the_player, num)
    db.session.commit()
    ordered_list = my_order_by()
    return get_leader(ordered_list)


def my_filter_by(the_username, num):
    ''' searching specific user '''
    print(num)
    return db.session.query(
        models.Players).filter_by(username=the_username).first()


def player_score(the_player, num):
    ''' the player score is updated'''
    the_player.score = the_player.score + num


@socketio.on('replay')
def reset(data):
    ''' emitting the message that player wants to play again '''
    global LIMIT
    LIMIT = 0
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
