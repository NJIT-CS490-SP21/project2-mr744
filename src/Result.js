import React from 'react';

export function Result(props) {
  console.log(props.winner);
  let text = '';
  if (props.winner !== '') text = 'The winner is: ';
  else {
    text = 'The Game ended in a draw';
  }
  // console.log(result);

  return (
    <div className="results">
      <h2> Game Result </h2>
      {props.result ? (
        <>
          <div>
            {' '}
            <h2>
              {' '}
              {text}
              {' '}
              {props.winner}
              !
            </h2>
            {' '}
          </div>
          {props.button}
        </>
      ) : (
        <>
          <h3>Game in progress...</h3>
        </>
      )}
    </div>
  );
}
