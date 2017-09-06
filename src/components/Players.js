import  React from 'react';

import GraphBundle from './GraphBundle';
import Loader from './Loader';

import * as api from '../helper/api';

class Players extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerList: [],
      players: {},
      ready: false,
    };

  }

  componentWillMount() {
    this.graphModeNames = ["Total Score", "Max Score", "Strike Rate", "Total 6s", "Total 4s", "Match Played", "Run When Non Striker", "Wickets", "Economy Rate", "Average Ball/Wicket"];
  }

  async componentDidMount() {
    const players = await api.apiCall("/data/players.json");
    const playerList = await api.apiCall("/data/playersList.json");

    setTimeout(()=>{
      this.setState({
        players,
        playerList,
        ready: true
      });
    },3000);



  }

  render() {

    return (
      <section style={{position : "relative"}}>
        {this.state.ready && <GraphBundle objectsList={this.state.playerList} objects={this.state.players}
                                          graphModeNames={this.graphModeNames} switchName="Teams"
                                          graphAlert="Please remove a player to add another"
                                          dataFunctionKey="getPlayerData"/>}
        {!this.state.ready && <Loader />}
      </section>
    );
  }
}

export default Players;
