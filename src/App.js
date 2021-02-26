import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board }  from './Board.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io();

function App() {
  
  const [board, setBoard] = useState(
          
          ['','','','','','','','',''] 
  );
  
  //initial array is empty since we don't know how many players will join
  const [currPlayers, setPlayers] = useState([]);
  
  //get user input 
  const inputRef = useRef(null);
  
  //show board
  const [view, setView ] = useState(false);
  
  //player id
  const [playerId, setPlayId] = useState(0);
  
  
  //active player
  // 1 and 2 respectively for the first two players then greater than 2 otherwise
  const [activePlayer, setActive] = useState(false);
  
  
  function updateBoard(arrIndex, value){

      setBoard(prevBoard => {
        const tempBoard = [...prevBoard];
        
        tempBoard[arrIndex] = value;
        
        return tempBoard;
        
      });
      
      socket.emit('move', {arrIndex: arrIndex, boardVal: value});
  }
  
  function onLogin(){

    if (inputRef != null){
      
      //get the username from the UI
      const userInput = inputRef.current.value;
      
      
      //update the state for players
      setPlayers( prevPlayers =>{ 
        
        const tempPlayers = [...prevPlayers];
        tempPlayers.push(userInput);
        return tempPlayers;
        
      });
      
  
      console.log("The player id is: "+ playerId);
      //the very first person to login should have id of zero
      if(playerId === 0){
         //set this to the active player so this becomes true
         setActive(prevActive => !prevActive);
         
        //when the user first logs in then update their player ID and set their status to active player!
         setPlayId( (prevId) => {
           
           console.log("The prev id: " + prevId);
           return prevId+1});
         
         console.log(activePlayer);
         console.log(playerId);
         
      }else{
        
        setPlayId( (prevId) => prevId+1);
      }
  
      //doesn't update right away so we got to do this manually
      //pass updated list of users along with the id and who the active player is
      console.log(`Sending info: ${activePlayer} ${playerId+1}  ${userInput}`);
      
      //once user clicks login then only show board
      setView((prevView)=> true);
      
      socket.emit('login', {users: userInput , playerId: (playerId+1), activePlayer: activePlayer});
      
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
          return tempBoard;
      })
      
    });
    
    
    //going to need multiple socket.ons to listen for various events happening
    
    //updating the playerCount 
    socket.on('login', (data)=>{
        // const tempPlayerArr = [...data];
      
        console.log(`Recieving info: ${data.activePlayer} ${data.playerId}  ${data.users}`);

        //sync all of the data 
        // only update this if you are playid is zero
        //why is it not updated by this point?
        
        setPlayId(prevId => {
          console.log("How is the prevId updated???: " + prevId);
          
          if(prevId === 0){

             return data.playerId;
          }
          
          return prevId;
        })
        
        

        
        // if(currPlayers === []){
        //   console.log("It appears in the id..." + playerId)
        //   setPlayId(prevId => (data.playerId+1));
        // }
        
        setPlayers(users=> [...users,data.users]);


        //if the other player is active then set the current one to false
        if(data.activePlayer){
          console.log("something");
          
        }
    });
    
  }, []);

    //for logging on purposes
    //this just complicates it even more 
    // useEffect(() => {
    //   const userIn = inputRef.current.value;
    //   // action on update of movies
    //   console.log("yes the id did get updated! to " + playerId);
    //   console.log(currPlayers);
    //   //I only want to emit this once
    //   socket.emit('login', {users: userIn ,playerId: playerId, activePlayer: activePlayer});
      
    // }, [currPlay]);



  //{currPlayers.indexOf(inputRef.current.value) + 1} 

  return (
    <div>

      
      
      {view ? (
        <>
        
        
        <div> Player number { currPlayers } { playerId }, Is Active{ activePlayer + ""} </div>
        
        
        <Board updateBoard={ updateBoard} board={board} />
        
        </>
       ) : 
          <>
          <input ref={inputRef} type="text" />
          <button onClick={() => onLogin()}>Login</button> 
         </>
      }
       
      
    </div>
  );
}

export default App;