import React from "react";

export function LeaderBoard(props) {
  let items = [];
  let count = 1;
  for (const [key, value] of Object.entries(props.leader)) {
    if (props.user === key)
      items.push(
        <tr className="select-user" index={count}>
          {" "}
          <td> {count}</td> <td> {key}</td> <td>{value} </td>{" "}
        </tr>
      );
    else
      items.push(
        <tr index={count}>
          {" "}
          <td> {count}</td> <td> {key}</td> <td>{value} </td>{" "}
        </tr>
      );

    count++;
  }

  function onClickLeader() {
    props.setLead((prev) => !prev);
  }

  return (
    <div>
      {props.showLead ? (
        <>
          <div className="leader-board">
            <button onClick={() => onClickLeader()} className="show-leader">
              {" "}
              <span>Leaderboard</span>{" "}
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
          {" "}
          <div className="no-leader-board">
            <button onClick={() => onClickLeader()} className="no-leader">
              <span>Leaderboard </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
