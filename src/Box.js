import React from 'react';
import PropTypes from 'prop-types';

function Box({ index, updateBoard, board }) {
  const boardPos = `board-click${index}`;
  return (
    <div
      data-testid={boardPos}
      onClick={() => updateBoard(index)}
      className="box"
      aria-hidden="true"
    >
      {' '}
      <h1>{board[index]}</h1>
    </div>
  );
}

Box.defaultProps = {
  index: PropTypes.number,
  board: PropTypes.instanceOf(Array),
  updateBoard: PropTypes.func,
};

Box.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  updateBoard: PropTypes.func,
  index: PropTypes.number,
};

export default Box;
