import React from 'react';

export function Box(props){
    
    return (
        
        <div onClick= {() => props.updateBoard(props.index,'X')} class="box"> { props.board[props.index] }</div>
        
        );
    
}
