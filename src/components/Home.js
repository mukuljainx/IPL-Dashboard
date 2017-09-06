import  React from 'react';

import GraphBundle from './GraphBundle';
import Loader from './Loader';
import Highlights from './Highlights';
import TopPlayer from './TopPlayer';
import Header from './Header';

import * as api from '../helper/api';


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teamList: [],
      teams: {},
      graphReady: false,
      activeTab: 0,
      topBatsman: [],
      batsmanReady: false,
      topBowler: [],
      bowlerReady: false,
    };

  }

  componentWillMount() {
    this.graphModeNames = ["Average Score", "Max Score", "Total 6s & 4s", "Match Won", "Match Won %", "Match Won if Toss Won %", "Match Won if Bat first %", "Match Won if Ball first %"];
    this.graphColorsMulti = ["#008080", "#808080	", "#ffd8b1", "purple", "blue", "#FFFFFF", "#FF00FF", "#FF0000", "#FFFF40", "#FF7C14", "#8884d8"];
    this.graphColorsCurrent = {x0: "#82ca9d", x1: "#3FAEFF"};
  }

  async componentDidMount() {
    const teams = await api.apiCall("/data/teams.json");
    const teamList = await api.apiCall("/data/teamList.json");

    this.setState({
      teams,
      teamList,
      graphReady: true
    });

    this.activateTab = this.activateTab.bind(this);
  }

  async activateTab(id) {
    this.setState({
      activeTab: id,
    });

    if (id === 1 && !this.state.batsmanReady) {
      const batsman = await api.apiCall("/data/topBatsman.json");
      this.setState({
        topBatsman: batsman,
        batsmanReady: true
      });
    }

    if (id === 2 && !this.state.bowlerReady) {
      const bowler = await api.apiCall("/data/topBowler.json");
      this.setState({
        topBowler: bowler,
        bowlerReady: true
      });
    }
  }


  render() {

    return (
      <section>
        <Header heading="Overview"/>
        <div className="row">
          <div className="columns medium-12 tabs-wrapper">
            <ul className="tabs" id="example-tabs">
              <li onClick={() => {
                this.activateTab(0);
              }} className={"tabs-title " + (this.state.activeTab === 0 ? "is-active" : "") }><a>Team Comparison</a>
              </li>
              <li onClick={() => {
                this.activateTab(1);
              }} className={"tabs-title " + (this.state.activeTab === 1 ? "is-active" : "") }><a >Top 10 Batsman</a>
              </li>
              <li onClick={() => {
                this.activateTab(2);
              }} className={"tabs-title " + (this.state.activeTab === 2 ? "is-active" : "") }><a >Top 10 Bowler</a>
              </li>
              <li onClick={() => {
                this.activateTab(3);
              }} className={"tabs-title " + (this.state.activeTab === 3 ? "is-active" : "") }><a >Highlights</a></li>
            </ul>
          </div>
        </div>

        { this.state.activeTab === 0 && ( this.state.graphReady ?
          <GraphBundle objectsList={this.state.teamList} objects={this.state.teams} graphModeNames={this.graphModeNames}
                       graphColorsMulti={this.graphColorsMulti}
                       graphColorsCurrent={this.graphColorsCurrent}
                       switchName="Teams"
                       graphAlert="Please remove a Team to add another" dataFunctionKey="getTeamData"
                       searchPlaceholder="Search Teams"/> : <Loader />)}

        { this.state.activeTab === 1 && ( this.state.batsmanReady ?
            <TopPlayer players={this.state.topBatsman}/> : <Loader/>
        )}

        { this.state.activeTab === 2 && ( this.state.bowlerReady ?
            <TopPlayer players={this.state.topBowler}/> : <Loader/>
        )}

        {this.state.activeTab === 3 &&
        <Highlights />
        }

      </section>
    );
  }
}

export default Home;
