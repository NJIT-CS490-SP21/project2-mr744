import React from 'react';


export function Result(props){
    
    console.log(props.winner);
    let text="";
    if(props.winner != "")
      text="The winner is: ";
    else{
      text="The Game ended in a draw";
    }
    // console.log(result);

    return (
     
       <div class="">
               <h1> Game Result </h1>
              { props.result ? (
                <>
                  <div> <h2> {text} {props.winner}!</h2>  </div>
                  { props.button }
                </>
                
              ) : (
                 <>
                </>
              )}
        </div>
        
        );
}
