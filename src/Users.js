import React from 'react';

export function User(props) {
  return (
    <div className="spectators">
      <h2> Spectators </h2>
      <div className="viewers">
        <ul>
          {props.players.map((elem, index) => {
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
