import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')


cors = CORS(app, resources={r"/": {"origins": ""}})

users_list = []

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
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('move')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('move',  data, broadcast=True, include_self=False)

# keeping tracking of which players have joined the match
@socketio.on('login')
def on_players(data):
    print(str(data))
    
    users_list.append(data['users'])
    
    
    socketio.emit('login', data, broadcast=True, include_self=False)
    
    
@socketio.on('turn')
def on_next_turn(data):
    data['all_users'] = users_list
    
    print(str(data))
    
    #emit the playerId and if it is their turn
    socketio.emit('turn', data, broadcast=True, include_self=False)
 

# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)