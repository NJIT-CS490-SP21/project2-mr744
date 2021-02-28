import React from 'react';

export function Box(props){
    
    return (
        
        <div onClick= {() => props.updateBoard(props.index)} class="box"> <h1>{ props.board[props.index] }</h1></div>
        
        );
    
}
