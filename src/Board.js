import React from 'react';
import { updateBoard } from './App.js';




// export function addPiece(){
//   //update the board data structure
  
  
//   //update the UI 
//   const itemRef = useRef(null);
  
  
  
  
// }


export function Board(props){
    
    
      // const all_divs = [];
      // for(let i=0 ; i<9; i++){
      //   //   let str = `box ${i}`;
      //     all_divs.push(<div onClick={ addPiece } class={`box box${i}`} ></div>)
      // }
   
      
      // for(let i=0; i<3; i++){
      //   for(let j=0; j<3; j++)
      //     all_divs.push(<div onClick={ () => props.addPiece('X') } class={`box box${i}`} > {props.item}</div>);
      // }
    
    
    
            //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
        //   <div class="box"></div>
    
    return (
       <div class="board">

              <div onClick= {updateBoard(0,'X')} class="box"></div>
              <div onClick= {updateBoard(1,'X')} class="box"></div>
              <div onClick= {updateBoard(2,'X')} class="box"></div>
              <div onClick= {updateBoard(3,'X')} class="box"></div>
              <div onClick= {updateBoard(4,'X')} class="box"></div>
              <div onClick= {updateBoard(5,'X')} class="box"></div>
              <div onClick= {updateBoard(6,'X')} class="box"></div>
              <div onClick= {updateBoard(7,'X')} class="box"></div>
              <div onClick= {updateBoard(8,'X')} class="box"></div>
       
        </div>
        
        );
}






