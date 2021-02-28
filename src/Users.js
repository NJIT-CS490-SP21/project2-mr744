import React from 'react';

export function User(props){
    
    
    return (
        <div>Spectators
            <div class="">
    
                  { props.players.map((elem,index)=> {  
                      
                      if(index > 1)
                        return <div index={index}> {elem} </div>
                      
                  }) }
           
            </div>
        </div>
        
        )
    
}