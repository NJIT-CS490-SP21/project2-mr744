import React from 'react';
import PropTypes from 'prop-types';

function LeaderBoard({
  leader, setLead, showLead, user,
}) {
  const items = [];
  let count = 1;
  for (const [key, value] of Object.entries(leader)) {
    if (user === key) {
      items.push(
        <tr className="select-user" index={count}>
          {' '}
          <td>
            {' '}
            {count}
          </td>
          {' '}
          <td>
            {' '}
            {key}
          </td>
          {' '}
          <td>
            {value}
            {' '}
          </td>
          {' '}
        </tr>,
      );
    } else {
      items.push(
        <tr index={count}>
          {' '}
          <td>
            {' '}
            {count}
          </td>
          {' '}
          <td>
            {' '}
            {key}
          </td>
          {' '}
          <td>
            {value}
            {' '}
          </td>
          {' '}
        </tr>,
      );
    }

    count += 1;
  }

  function onClickLeader() {
    setLead((prev) => !prev);
  }

  return (
    <div>
      {showLead ? (
        <>
          <div className="leader-board">
            <button type="button" onClick={() => onClickLeader()} className="show-leader">
              {' '}
              <span>Leaderboard</span>
              {' '}
            </button>

            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {' '}
          <div className="no-leader-board">
            <button type="button" onClick={() => onClickLeader()} className="no-leader">
              <span>Leaderboard </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

LeaderBoard.defaultProps = {
  leader: PropTypes.objectOf(PropTypes.object),
  setLead: PropTypes.bool,
  showLead: PropTypes.bool,
  user: PropTypes.string,
};
LeaderBoard.propTypes = {
  leader: PropTypes.objectOf(PropTypes.object),
  setLead: PropTypes.bool,
  showLead: PropTypes.bool,
  user: PropTypes.string,

};

export default LeaderBoard;
