import React from 'react';
import PropTypes from 'prop-types';

function Box({
  key, index, updateBoard, board,
}) {
  return (
    <div onClick={() => updateBoard(index)} className="box" aria-hidden="true">
      {' '}
      <h1>{board[index]}</h1>
    </div>
  );
}

Box.defaultProps = {
  key: PropTypes.number,
  index: PropTypes.number,
  board: PropTypes.instanceOf(Array),
  updateBoard: PropTypes.instanceOf(Array),
};

Box.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  updateBoard: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  key: PropTypes.number,
  index: PropTypes.number,
};

export default Box;
