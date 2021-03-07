# Tic Tac Toe Multiplayer Game (Updated for Milestone 2)

This respository consists of python, javascript, html, and css files which will allow users to play a game of Tic Tac Toe 
between 2 players when two instances of the tab are opened. Additional players joining will be spectators.

## Getting Started Technologies

In this project, I used the Flask framework, Socket.IO library for real time communication, and the React library.

### References
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) and [Flask SocketIO](https://flask-socketio.readthedocs.io/en/latest/)
- [Javascript/React SocketIO](https://socket.io/docs/v3)
- [React Docs](https://reactjs.org/docs/getting-started.html)

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

### Setting up Our Database (PostgresSql)

#### Installation
1) `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql  docs`

#### Setup
1) Once you have installed PostgreSql using the command above we initialize the database.
2) Initialize: `sudo service postgresql initdb`
3) To start the service: `sudo service postgresql start`
4) Now we can make a superuser(if an error says 'could not change directory' that means it worked): `sudo -u postgres createuser --superuser $USER`
5) Now lets make a database: `sudo -u postgres createdb $USER`
6) To ensure that your user shows up follow the commands:
   - `psql`
   - `\du`
   - `\l`
7) Making a new user: 
   - `create user some_username_here superuser password 'some_unique_new_password_here'`
   - `\q` (to quit sql)
8) Now to save your passwords to a `sql.env` file with the following format `SQL_USER=` and `SQL_PASSWORD=`.

### SQLAlchemy

#### About
To now query and access our database we will use SQLAlchemy.

#### Installation
1) `pip install psycopg2-binary`
2) `pip install Flask-SQLAlchemy==2.1`

#### Creating new database for Heroku and connect our code
1) Login to heroku: `heroku login -i`
2) Create new app: `heroku create`
3) Add a database on our heroku app:`heroku addons:create heroku-postgresql:hobby-dev`
4) To see the config vars that are set by heroku for us: `heroku config`
5) Set the database variable as an environment variable: `export DATABASE_URL='pas config value here'`

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

### Known Problems
1) One issue that I have is the styling with the CSS. When implementing the Leaderboard button to show the scores of the users on the UI, I would have an issue where the title
of the players playing against one another would get pushed out of the center of the screen and to the left handside. One method that I think would work to fix this issue is 
have the title of the players playing against one another fixed at the location using absolute positioning. 

2) Another issue that I had, which was having to deal with the python server was that one of the socket functions was receiving duplicate messages twice from a single client.
To checkout what was going on, I had basically console logged and printed everywhere in the javascript and python files. I found out that my client was only sending one emit 
message despite the python server recieiving two. I checked online, and stackoverflow said that I may have something wrong with the rooms, so I deleted the rooms that I had 
setup for that function. But that still never worked. So I made a hotfix by adding an if statement with a counter to only allow the function to excute twice but this time to 
emit only once to send back info to the client.

### Technical Issues
1) One challenge that I faced during the emits between the python and javascript files was when I was sending a json data to App.js from app.py. I had created a python 
dictionary mapping the usernames to their respecitive scores. So essentially the keys as the names and values as the scores. The problem arose when I wanted to send this data 
from `app.py to App.js`. React kept on giving me "objects are not valid as a react child use an array instead". The mistake that I was making was that I needed to format the 
dictionary from the python file. I used this [post](https://stackoverflow.com/questions/10844064/items-in-json-object-are-out-of-order-using-json-dumps) from stack overflow to 
guide me. I essentially needed to used `json.dumps(dictionary_name,sort_keys=False)` on the server side before sending the data. And on the client side, when recieving the 
dictionary I neede to use `JSON.parse(dictionary_name)` in the App.js. This was neede to maintain the structure of the dictionary from python to javascript.

2) One simple mistake that I made but one which took hours to fix was deploying my code to heroku. I kept on getting the error `no module named flask`. My first instinct was to 
check my `requirements.txt` file to ensure it had the flask module. And gladly it did. Then the next step I took was to reinstall the flask module. I repeated this a couple of 
times and it still hadn't worked. So then I removed my git heroku remote and tried building the project again. This step still didn't work. So finally, I asked a friend for help
and they asked me to check if I had installed the buildpacks on the heroku. I went to the website and to my suprise I never had installed that. So once I installed that, I was 
already to go. It was such an overlooked mistake by one that cost me hours.


