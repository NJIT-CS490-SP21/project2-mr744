import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

function Board({ updateBoard, board }) {
  // const [board, updateBoard] = props;

  return (
    <div className="board-outline">
      <div className="board">
        {board.map((elem, index) => (
          <Box
            key={index}
            index={index}
            updateBoard={updateBoard}
            board={board}
          />
        ))}
      </div>
    </div>
  );
}

Board.defaultProps = {
  board: PropTypes.instanceOf(Array),
  updateBoard: PropTypes.func,
};
Board.propTypes = {
  // board: PropTypes.arrayOf(PropTypes.string),
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  updateBoard: PropTypes.func,
  // updateBoard: PropTypes.arrayOf(PropTypes.string),
};
export default Board;
