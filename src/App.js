import logo from './logo.svg';
import './App.css';
import './Board.css';
import { ListItem }  from './ListItem.js';
import { Board }  from './Board.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io();

function App() {
  
  const [board, setBoard] = useState(
          
          ['','','','','','','','',''] 
  );
  

  function updateBoard(arrIndex, value){
  
      setBoard(prevBoard => prevBoard.map( (elem,index) => {
        
            if (index == arrIndex)
                return value;
            else
                return elem;
        
      }) );
      
      socket.emit('move', {arrIndex: arrIndex, boardVal: value});
      

  }
  
  //define once and then always listening
  //always put listeners in useEffect
  useEffect(() =>{
    
    //setup the data object in python file
    socket.on('move', (data) =>{
      
      setBoard(prevBoard => prevBoard.map( (elem,index) => {
    
        if (index == data.arrIndex)
            return data.boardVal;
        else
            return elem;
    
      }) );
      
    });
    
  }, []);

  return (
    <div>
      <Board updateBoard={ updateBoard} board={board} />
    </div>
  );
}

export default App;







