import React from 'react';
import PropTypes from 'prop-types';

function LeaderBoard({
  leader, setLead, showLead, user,
}) {
  const items = [];
  let count = 1;
  Object.keys(leader).map((key) => {
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
            {leader[key]}
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
            {leader[key]}
            {' '}
          </td>
          {' '}
        </tr>,
      );
    }

    count += 1;
    return '';
  });

  function onClickLeader() {
    setLead((prev) => !prev);
  }

  return (
    <div>
      {showLead ? (
        <>
          <div className="leader-board">
            <button
              data-testid="leader-shown"
              type="button"
              onClick={() => onClickLeader()}
              className="show-leader"
            >
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
            <button
              data-testid="leader-shown"
              type="button"
              onClick={() => onClickLeader()}
              className="no-leader"
            >
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
  setLead: PropTypes.func,
  showLead: PropTypes.bool,
  user: PropTypes.string,
};
LeaderBoard.propTypes = {
  leader: PropTypes.objectOf(PropTypes.object),
  setLead: PropTypes.func,
  showLead: PropTypes.bool,
  user: PropTypes.string,
};

export default LeaderBoard;
