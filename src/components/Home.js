import  React from 'react';

import GraphBundle from './GraphBundle'
import Loader from './Loader';

import * as api from '../helper/api';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teamList: [],
      teams: {},
      ready: false
    };

  }

  componentWillMount() {
    this.graphModeNames = ["Average Score", "Max Score", "Total 6s & 4s", "Match Won", "Match Won %", "Match Won if Toss Won %", "Match Won if Bat first %", "Match Won if Ball first %"];
  }

  async componentDidMount() {
    const teams = await api.apiCall("/data/teams.json");
    const teamList = await api.apiCall("/data/teamList.json");

    this.setState({
      teams,
      teamList,
      ready: true
    });


  }


  render() {
    return (
      <section>
        { this.state.ready &&
        <GraphBundle objectsList={this.state.teamList} objects={this.state.teams} graphModeNames={this.graphModeNames} switchName="Player"
                     graphAlert="Please remove a Team to add another" dataFunctionKey="getTeamData" searchPlaceholder="Search Teams"/>}
        {!this.state.ready && <Loader />}
      </section>
    );
  }
}

export default Home;
