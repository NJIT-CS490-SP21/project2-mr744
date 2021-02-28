import React from 'react';

export function User(props){
    
    
    return (
        <div class="spectators">
            <h2> Spectators </h2>
            <div class="viewers">
                <ul> 
                 
                  { props.players.map((elem,index)=> {  
                      
                      if(index > 1)
                        return <div key={index} index={index}><div><li><h3> {elem}</h3></li> </div></div>
                      
                  }) }
                 
                </ul>
            </div>
        </div>
        
        )
    
}