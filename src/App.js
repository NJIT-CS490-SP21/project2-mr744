import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board }  from './Board.js';
import { User } from './Users.js';
import {Result } from './Result.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io();

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currPlayers, setPlayers] = useState([]);   //initial array is empty since we don't know how many players will join
  const inputRef = useRef(null); //get user input 
  const [userName, setUser] = useState(null); //for username
  const [view, setView ] = useState(false);  //show board
  const [results, setResults] = useState(false);//show the game results 
  const [playerId, setPlayId] = useState(0);//player id
  const [activePlayer, setActive] = useState(false);  //active player
  const [winner, setWinner] = useState(null);
  
  function updateBoard(arrIndex){

      let value = '';
      let valid = true;

      setActive( currAct =>{  
        
        //only the active player can update the board
        if(currAct){
            
            value = playerId === 1 ? 'X' :'O';

            setBoard(prevBoard => {
                const tempBoard = [...prevBoard];
                
                if(tempBoard[arrIndex] == null){
                  tempBoard[arrIndex] = value;
                }
                else{
                  valid = false;
                }
          
               if (valid) {
                   //if the game is not drawn or the board includes no empty elements
                   if (calculateWinner(tempBoard) != null || !tempBoard.includes(null)){
                      
                      setUser((name)=>{
                            
                            if( calculateWinner(tempBoard) ==='X' || calculateWinner(tempBoard) === 'O' ){
                                socket.emit('turn', {can_turn: "able", status: 1, game: name});
                                setWinner(prevWinner=> name);
                            }
                            else{
                                console.log("Here on draw!");
                                socket.emit('turn', {can_turn: "able", status: 1, game: ""});
                                setWinner(prevWinner=> "");
                            }
                            
                            return name;
                        })
                        
                      //need to create a state to display the results
                      setResults(res => true);
                   }
                   else
                      socket.emit('turn', {can_turn:"able", status: 0});
          
                   socket.emit('move', {arrIndex: arrIndex, boardVal: value});    
                }
               
                return tempBoard;
            
             });
          
            return !valid;
       }
       else
          return currAct;
       
    });
  }
  
  function onLogin(){

    if (inputRef != null){

      const userInput = inputRef.current.value; //get the username from the UI
      
      setUser(user => userInput);
      
      setView((prevView)=> true); //once user clicks login then only show board
      
      socket.emit('login', {username: userInput, logged: "loggedIn"});  //just send the username
      
    }
      
  }
  
  //define once and then always listening
  //always put listeners in useEffect
  useEffect(() =>{
    
    //setup the data object in python file
    socket.on('move', (data) =>{

      setBoard(prevBoard => {
          const tempBoard = [...prevBoard];
          tempBoard[data.arrIndex] = data.boardVal;
          if (calculateWinner(tempBoard) != null || !tempBoard.includes(null)){
              setResults(res => true); 
          }
          return tempBoard;
      })
    });
  
    //going to need multiple socket.ons to listen for various events happening
    
    //updating the playerCount 
    socket.on('login', (data)=>{

        setActive(active => data.user_dict[socket.id][2])
        setPlayId(id => data.user_dict[socket.id][1])
        setPlayers(users => [...data.users]);
        
    });

    socket.on('turn', (data) =>{
        setActive(prevActive=> data.able)
        
        if(data.status === 1){
          setWinner(win => data.game);
        }
        
    });
    
    socket.on('disconnect', (data) =>{
        // alert("You are being logged out since your opponent has left!");
        window.location.reload();
        // setPlayers(prevPlayers => data.users_list);
    });
  
    socket.on('replay', (data)=>{

        setWinner(prevWinner=>null);
        setBoard(board => data.board);
        setResults(res => false);
        setPlayId(id => {
            if(id === 1)
                setActive(prev => true);
          
            return id;
          });
          
    });
    
  }, []);
  
  function onReplay(){
    //reset the board 
    setBoard(board => Array(9).fill(null));
    setWinner(prevWinner=>null);
    
    //reset the active players
    if(playerId === 1){
      setActive(active => true);
    }
    //reset the results
    setResults(res => false);
    //reset all of the items again
    socket.emit('replay', {board: Array(9).fill(null), res: false , active: false} );
    
  }


  function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    
    //if they can see the board that means that they are logged in and only then show the button to play again
    let button="";
    if (view && (playerId === 1 || playerId === 2)) {
       button = <button class="again" onClick={() => onReplay()}><span>Play Again!</span></button>;
    } else {
      button = "";
    }
    
    
    let active1, active2 = "";
    if(!results){
      
      if((activePlayer && playerId === 1) || (!activePlayer && playerId === 2)){
        active1="show";
        active2="no-show";
      }else if((activePlayer && playerId === 2) || (!activePlayer && playerId === 1) ){
        active1="no-show";
        active2="show";
      }
    }
    
  //use this line of code for debugging purposes        
  // <div> Player number { currPlayers } { playerId }, Is Active: { activePlayer + ""} </div>  
  return (
    <div>
      <div class="title-div">
        <h1 class="title"> Tic Tac Toe</h1>
      </div>
      
      {view ? (
        <>
      
        <div class="players"> 
          <div><h2 class="users">Welcome, { userName } !</h2></div>
          <div> <h2 class="users"> <span class={ active1}>{currPlayers[0]}</span> vs. <span class={active2}>{ currPlayers[1]} </span></h2> </div>
        </div>

        
        <div class="center-board">
        
           <Result result={results} button={button} winner={ winner } />
           
           <Board updateBoard={ updateBoard} board={board} />
           
           <User players={currPlayers} />
           
        </div>    
        
        </>
       ) : 
          <>
          <div class="login-box">
            <div class="inner">
              <h3 class="enter-name"> Please Enter a Username!</h3>
              <div class="user-name">
                <input class="input" ref={inputRef} type="text" />
              </div>
              <div class="submit">
                <button class="submit-bttn" onClick={() => onLogin()}><span>Login</span></button> 
              </div>
            </div>
          </div>    
          
         </>
      }
    
      
    </div>
  );
}


export default App;