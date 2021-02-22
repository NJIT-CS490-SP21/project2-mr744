import React from 'react';
import { useState, useRef} from 'react';
import { Box } from './Box.js';
// import { updateBoard } from './App.js';


export function Board(props){
    
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
    
      // const all_divs = [];
      // for(let i=0 ; i<9; i++){
      //   //   let str = `box ${i}`;
      //     all_divs.push(<div onClick={ addPiece } class={`box box${i}`} ></div>)
      // }
   
      
      // for(let i=0; i<3; i++){
      //   for(let j=0; j<3; j++)
      //     all_divs.push(<div onClick={ () => props.addPiece('X') } class={`box box${i}`} > {props.item}</div>);
      // }
    
            //   <div onClick= {() => props.updateBoard(0,'X')} class="box"> { props.board[0] } </div>
            //   <div onClick= {() => updateBoard(1,'X')} class="box"> { board[1] }</div>
            //   <div onClick= {() => updateBoard(2,'X')} class="box"> { board[2] }</div>
            //   <div onClick= {() => updateBoard(3,'X')} class="box"> { board[3] } </div>
            //   <div onClick= {() => updateBoard(4,'X')} class="box"> { board[4] } </div>
            //   <div onClick= {() => updateBoard(5,'X')} class="box"> { board[5] }</div>
            //   <div onClick= {() => updateBoard(6,'X')} class="box"> { board[6] }</div>
            //   <div onClick= {() => updateBoard(7,'X')} class="box"> { board[7] }</div>
            //   <div onClick= {() => updateBoard(8,'X')} class="box"> { board[8] }</div>
    
    

    return (
       <div class="board">

              { props.board.map((elem,index)=> {  
                  
                  return <Box index={ index } updateBoard={props.updateBoard} board={props.board} />;
                  
              }) };
       
        </div>
        
        );
}






