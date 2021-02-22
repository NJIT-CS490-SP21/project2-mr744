import logo from './logo.svg';
import './App.css';
import './Board.css';
import { ListItem }  from './ListItem.js';
import { Board }  from './Board.js';
import { useState, useRef } from 'react';


// export { updateBoard } ;

function App() {
  
  // const state = useState([]);
  const [myList, changeList ] = useState([]); //destructuring an array
  // pass in one arg to usestate which is our intial state value
  //each time state changes, whole compenent will rerender
  const inputRef = useRef(null);
  
  function onClickButton(){
    // myList.push('New item added');
    // const newList = [...myList, 'New item added'];
    const userText = inputRef.current.value;
    changeList(prevList => [...prevList, userText]);
  }
  
  
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
    <h1>My Favourites</h1>
    <input ref={inputRef} type="text" />
    <button onClick={onClickButton}> Add a list </button>
      <ul>  
        {myList.map(item => <ListItem name={item} />)};
        
      </ul>
    
    
    </div>
  );
}

export default App;







