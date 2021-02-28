# Tic Tac Toe Multiplayer Game

This respository consists of python, javascript, html, and css files which will allow users to play a game of Tic Tac Toe 
between 2 players when two instances of the tab are opened. Additional players joining will be spectators.

## Getting Started Technologies

In this project, I used the Flask framework, Socket.IO library for real time communication, and the React library.

### Flask and React App
---
#### About 
- Flask is a lightweight web framework which will help our Python code be the server for our game. 
- React is a Javascript Library which will allow us to make our front end interface for our game.

#### Installation
1) `sudo pip install flask` or `pip install flask`
2) `npm install`
3) `pip install -r requirements.txt`

#### Additional
1) In your project directory, run the command `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local`.

#### Note
- Everything installed up until this point will not work yet, because we still need to install our SocketIO library 
for flask and react.

### SocketIO for Flask and React
---

### About
This library is the bridge between our connections from one tab to another and will allow us to establish mutliplayer compatibility.

#### Installation
1) `pip install flask-socketio`
2) `pip install flask-cors`
3) `npm install socket.io-client --save`

#### Testing our App (Finally!)
1) Open two instances of your terminal and head into your project directory.
2) Run the command `python app.py` in  (this starts our flask server) one terminal.
3) In the next terminal, run the command `npm run start`.
4) Now you should be able to open two tabs and play the game!

### Deploying our App to Heroku
--- 

#### About
Heroku is a cloud platform company which will essentially allow us to host our code on their servers and we can run our game on there.

#### Installation
1. `npm install -g heroku`

#### Setup 
1) First we will need to create a free account on [Heroku](https://www.heroku.com/).
2) Next, we will create a  `requirements.txt` file which will list all the libraries and packages our app uses. This information is needed because Heroku's servers will 
  download said packages and libraries so it can run the app on their servers.
  In your terminal, type the following:
  1. `touch requirements.txt`
  2. `pip freeze > requirements.txt`
3) Once that is done, we will need a `Procfile`, which is a file that will tell Heroku what command to use to run our app.
  1. In your terminal, type: `touch Procfile`
  2. Next, open up the `Procfile` and type your commands needed to run your app. In my case I would write: `web: python main.py`. 
4) Now for the actual deploying part, open your terminal and follow along:
  1. Login to Heroku via terminal: `heroku login -i`
  2. Next go to your project folder and create the heroku app: `heroku create --buildpack heroku/python`
  3. Now we will add the nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
  4. Now we will push our code to heroku: `git push heroku main`



