import React from 'react';
import PropTypes from 'prop-types';

function Result({ result, button, winner }) {
  let text = '';
  if (winner !== '') text = 'The winner is: ';
  else {
    text = 'The Game ended in a draw';
  }
  // console.log(result);

  return (
    <div className="results">
      <h2> Game Result </h2>
      {result ? (
        <>
          <div>
            {' '}
            <h2>
              {' '}
              {text}
              {' '}
              {winner}
              !
            </h2>
            {' '}
          </div>
          {button}
        </>
      ) : (
        <>
          <h3>Game in progress...</h3>
        </>
      )}
    </div>
  );
}

Result.defaultProps = {
  result: PropTypes.bool,
  button: PropTypes.string,
  winner: PropTypes.string,
};
Result.propTypes = {
  result: PropTypes.bool,
  button: PropTypes.string,
  winner: PropTypes.string,

};

export default Result;
