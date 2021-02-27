import React from 'react';

export function Box(props){
    
    return (
        
        <div onClick= {() => props.updateBoard(props.index)} class="box"> { props.board[props.index] }</div>
        
        );
    
}
