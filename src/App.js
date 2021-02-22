import logo from './logo.svg';
import './App.css';
import './Board.css';
import { ListItem }  from './ListItem.js';
import { Board }  from './Board.js';
import { useState, useRef } from 'react';


// export { updateBoard } ;

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
  }

  return (
    <div>
      <Board updateBoard={ updateBoard} board={board} />
    </div>
  );
}

export default App;







