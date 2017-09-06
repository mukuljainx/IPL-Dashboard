import  React from 'react';

import GraphBundle from './GraphBundle';
import Loader from './Loader';
import Header from './Header';

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
    this.graphColorsMulti = ["#008080", "#808080	", "#ffd8b1", "purple", "blue", "#FFFFFF", "#FF00FF", "#FF0000", "#FFFF40", "#FF7C14", "#8884d8"];
    this.graphColorsCurrent = {x0: "#82ca9d", x1: "#3FAEFF"};
  }

  async componentDidMount() {
    const players = await api.apiCall("/data/players.json");
    const playerList = await api.apiCall("/data/playersList.json");

    // setTimeout(()=>{
    this.setState({
      players,
      playerList,
      ready: true
    });
    // },3000);


  }

  render() {

    return (
      <section style={{position: "relative"}}>
        <Header heading="Player Overview"/>

        {this.state.ready && <GraphBundle objectsList={this.state.playerList} objects={this.state.players}
                                          graphModeNames={this.graphModeNames} switchName="Players"
                                          graphColorsMulti={this.graphColorsMulti}
                                          graphColorsCurrent={this.graphColorsCurrent}
                                          graphAlert="Please remove a player to add another"
                                          dataFunctionKey="getPlayerData" searchPlaceholder="Search Players"/>}
        {!this.state.ready && <Loader />}
      </section>
    );
  }
}

export default Players;
