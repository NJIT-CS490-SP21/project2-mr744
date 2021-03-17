import React from 'react';
import PropTypes from 'prop-types';

function User({ players }) {
  return (
    <div className="spectators">
      <h2 data-testid="spectators"> Spectators </h2>
      <div className="viewers">
        <ul>
          {players.map((elem, index) => {
            if (index > 1) {
              return (
                <div key={index} index={index}>
                  <div>
                    <li>
                      <h3>
                        {' '}
                        {elem}
                      </h3>
                    </li>
                    {' '}
                  </div>
                </div>
              );
            }
            return '';
          })}
        </ul>
      </div>
    </div>
  );
}

User.defaultProps = {
  players: PropTypes.instanceOf(Array),
};
User.propTypes = {
  players: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
};

export default User;
