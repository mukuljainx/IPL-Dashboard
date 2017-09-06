import  React from 'react';
import PropTypes from 'prop-types';

class TopPlayer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.getTableRows = this.getTableRows.bind(this);
  }

  getTableRows() {
    return this.props.players.map(function (player, i) {
      return (
        <tr key={i}>
          <td>{player.name}</td>
          <td>{player.totalScore}</td>
          <td>{player.maxScore}</td>
          <td>{(player.totalScore / player.matchPlayed).toFixed(2)}</td>
          <td>{(player.totalScore / player.ballPlayed).toFixed(2)}</td>
          <td>{player.nonStrikerRun}</td>
          <td>{player.wickets}</td>
          <td>{(player.totalRunGiven / (player.ballThrown/6)).toFixed(2)}</td>
          <td>{(player.ballThrown / player.totalRunGiven).toFixed(2)}</td>
        </tr>
      );
    });
  }


  render() {
    const tableRows = this.getTableRows();
    return (
      <div className="row">
        <div className="columns small-12">
          <table className="player-table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Total Run</th>
              <th>Max Run</th>
              <th>Average Run</th>
              <th>Strike Rate</th>
              <th>Run When Non Striker</th>
              <th>Wickets</th>
              <th>Economy Rate</th>
              <th>Average Ball/Wicket</th>
            </tr>
            </thead>
            <tbody>
            {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TopPlayer.propTypes = {
  players: PropTypes.array.isRequired
};


export default TopPlayer;
