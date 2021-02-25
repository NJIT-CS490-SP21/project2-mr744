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
  
  

  function updateBoard(arrIndex, value){

      
      setBoard(prevBoard => {
        const tempBoard = [...prevBoard];
        
        tempBoard[arrIndex] = value;
        
        return tempBoard;
        
      });
      
      socket.emit('move', {arrIndex: arrIndex, boardVal: value});
      
  }
  
  
  function onLogin(){
    //get the text from the UI
    const userInput = inputRef.current.value;
    
    //update the state for players
    setPlayers( prevPlayers =>{ 
      
      const tempPlayers = [...prevPlayers];
      tempPlayers.push(userInput);
      return tempPlayers;
      
    });
    
  
    //once user clicks login then only show board
    setView((prevView)=> true);
    
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
    
  }, []);

  return (
    <div>

      <div> { currPlayers }</div>
      
      
      {view ? (
        <>
        
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