import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board }  from './Board.js';
import { User } from './Users.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io();

function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  
  //initial array is empty since we don't know how many players will join
  const [currPlayers, setPlayers] = useState([]);
  //get user input 
  const inputRef = useRef(null);
  //show board
  const [view, setView ] = useState(false);
  //show the game results 
  const [results, setResults] = useState(false);
  //player id
  const [playerId, setPlayId] = useState(0);
  
  //active player
  // 1 and 2 respectively for the first two players then greater than 2 otherwise
  const [activePlayer, setActive] = useState(false);
  
  function updateBoard(arrIndex){
      //maybe we can update the playerid here based on who's name appears first in the array
      //check who's turn it is
      console.log("Active player ? : " + activePlayer); 
      
      let value = '';

      setActive( currAct =>{  
        console.log(currAct);
        //only the active player can update the board
        if(currAct){
          let playId = 0;
          
          if(playerId === 1){
              value = 'X';
              playId = 2;
              // socket.emit('turn', {playId: playId, active: currAct});
          }
          else
          {
              playId = 1;
              console.log(playerId);
              value = 'O';
              // socket.emit('turn', {playId: playId, active: currAct});
          }
          
          setBoard(prevBoard => {
            const tempBoard = [...prevBoard];
            
            tempBoard[arrIndex] = value;
            
             // If there is a winner disable all states to false
             console.log(tempBoard);
             console.log("Emitting board " + calculateWinner(tempBoard));
             
             //to pause people from entering once the game is finished
             if (calculateWinner(tempBoard) != null || !tempBoard.includes(null)){
                socket.emit('turn', {playId: playId, active: false, can_turn: "able"});
               
                //need to create a state to display the results
                setResults(res => true);
             }
             else
                socket.emit('turn', {playId: playId, active: currAct, can_turn:"able"});
             
            return tempBoard;
            
          });
          
          //only emits for the player that is active
          socket.emit('move', {arrIndex: arrIndex, boardVal: value});
          
          //if the player was positive now they are not
          return !currAct;
          
       }
       //if a user that isn't able to click, they will get returned false
       return currAct;
       
    });
  }
  
  function onLogin(){

    if (inputRef != null){
      
      
      //get the username from the UI
      const userInput = inputRef.current.value;
      
      console.log(`Sending info: ${activePlayer} ${playerId+1}  ${userInput}`);
      console.log(socket.id);
      
      //once user clicks login then only show board
      setView((prevView)=> true);
      
      //just send the username
      socket.emit('login', {username: userInput, logged: "loggedIn"});
      
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
          
          console.log(tempBoard);
          console.log("The winner is " + calculateWinner(tempBoard));
          if (calculateWinner(tempBoard) != null || !tempBoard.includes(null)){
              setResults(res => true);
          }
          return tempBoard;
      })

      
    });
  
    //going to need multiple socket.ons to listen for various events happening
    
    //updating the playerCount 
    socket.on('login', (data)=>{
        // const tempPlayerArr = [...data];
      
        console.log(`Recieving info: ${data.user_dict}`);
        console.log(`Recieving info: ${data.users}`);

        setActive(active => data.user_dict[socket.id][2])
        setPlayId(id => data.user_dict[socket.id][1])
        setPlayers(users => [...data.users]);
        
    });
    
    socket.on('list', (data)=>{
        setPlayers(players => data.users);
        
        
        console.log(data.users);
    });
    
    socket.on('turn', (data) =>{

        setPlayId( prevId => {
              if(prevId === data.playId)
                setActive(prevActive => data.active);
              return prevId;
        });
         
    });
  
    socket.on('replay', (data)=>{
      
        setPlayId(id => {
          console.log("The id for it: " + id);
          if(id> 2){
            
            setBoard(board => data.board);
    
            //reset the results
            setResults(res => false);
          }
          return id;
        })
      
    });
    
    
    
  }, []);
  
  function onReplay(){

    //reset the board 
    setBoard(board => Array(9).fill(null));
    
    //reset the active players
    if(playerId === 1){
      setActive(active => true);
    }
    
    //reset the results
    setResults(res => false);
    
    //reset all of the items again
    console.log("Emitting the message!: ");    
    socket.emit('replay', {board: Array(9).fill(null), active: false, res: false } );
    
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
       button = <button onClick={() => onReplay()}>Play Again!</button>;
    } else {
      button = "";
    }
    

  
  return (
    <div>

      
      
      {view ? (
        <>
        
        
        <div> Player number { currPlayers } { playerId }, Is Active: { activePlayer + ""} </div>
        <User players={currPlayers} />
        
        
        <Board updateBoard={ updateBoard} board={board} />
        
        </>
       ) : 
          <>
          <input ref={inputRef} type="text" />
          <button onClick={() => onLogin()}>Login</button> 
         </>
      }
      
      { results ? (
        <>
          <div>  The winner is:  </div>
          { button }
        </>
        
      ) : (
         <>
        </>
      )}
      

    </div>
  );
}


export default App;