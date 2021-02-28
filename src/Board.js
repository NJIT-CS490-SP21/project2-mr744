import React from 'react';
import { Box } from './Box.js';

export function Board(props){

    
    return (
     
       <div class="board">

              { props.board.map((elem,index)=> {  
                  
                  return <Box key={index} index={ index } updateBoard={props.updateBoard} board={props.board} />
                  
              }) }
       
        </div>
        
        );
}






