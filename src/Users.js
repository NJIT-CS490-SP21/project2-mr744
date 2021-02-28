import React from 'react';

export function User(props){
    
    
    return (
        <div>Spectators
            <div class="">
    
                  { props.players.map((elem,index)=> {  
                      
                      return <div index={index}> {elem} </div>
                      
                  }) }
           
            </div>
        </div>
        
        )
    
}