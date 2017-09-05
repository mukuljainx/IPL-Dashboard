import  React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


import GraphOption from './GraphOption';
import CustomTooltip from './CustomTooltip';
import CustomDot from './CustomDot';

import * as helper from '../helper/dataCreator';


import playersList from "../data/playersList.json";
import players from "../data/players.json";


const graphColors = ["#3FAEFF"];

let graphColorsMulti = ["#008080", "#808080	", "#ffd8b1", "purple", "blue", "#FFFFFF", "#FF00FF", "#FF0000", "#FFFF40", "#FF7C14", "#8884d8"];
let graphColorsCurrent = {x0: "#82ca9d", x1: "#3FAEFF"};

const optionsNames = playersList;
const graphModeNames = ["Total Score", "Max Score", "Strike Rate", "Total 6s", "Total 4s", "Match Played", "Run When Non Striker", "Wickets", "Economy Rate", "Average Ball/Wicket"];

const smallDevicehideClass = "hide-for-medium-only hide-for-small-only";


class Players extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      graphOptions: [0, 1],
      graphMode: [0],
      graphModeClass: "",
      graphOptionsClass: smallDevicehideClass
    };

    this.customDotOnClick = this.customDotOnClick.bind(this);
    this.getGraphLine = this.getGraphLine.bind(this);
    this.onGraphOptionClick = this.onGraphOptionClick.bind(this);
    this.onGraphModeClick = this.onGraphModeClick.bind(this);
    this.switchOptions = this.switchOptions.bind(this);

  }

  getGraphLine(keys, colors) {
    //we will use push, pop method for colors
    // graphColorsMulti.push(graphColorsCurrent.pop());
    const customDotOnClick = this.customDotOnClick;
    const graphOptions = this.state.graphOptions;
    return keys.map(function (key, i) {
      const color = colors["x" + graphOptions[i]];
      return (
        <Line key={i} type="monotone" activeDot={<CustomDot stroke={color} onClickHandler={customDotOnClick}/>}
              dataKey={key} stroke={color}/>
      );
    });
  }

  customDotOnClick(data) {
    const season = data.season;
    this.props.history.push("/season/" + season);
  }

  onGraphOptionClick(option) {
    this.setState((prevState) => {
      let graphOptions = prevState.graphOptions;
      const index = graphOptions.indexOf(option);
      if (index === -1) {
        graphColorsCurrent["x" + option] = graphColorsMulti.pop();
        graphOptions.push(option);
        return {
          graphOptions
        };
      } else {
        //put the color back
        graphColorsMulti.push(graphColorsCurrent["x" + option]);
        //then remove it
        delete graphColorsCurrent["x" + option];

        graphOptions.splice(index, 1);
        return {
          graphOptions
        };
      }
    });
  }

  onGraphModeClick(option) {
    this.setState({
      graphMode: [option]
    });
  }

  switchOptions() {
    this.setState((prevState) => {
      return {
        graphModeClass: prevState.graphModeClass === smallDevicehideClass ? "" : smallDevicehideClass,
        graphOptionsClass: prevState.graphOptionsClass === smallDevicehideClass ? "" : smallDevicehideClass,
      };
    });
  }


  render() {

    let playerNames = [];
    this.state.graphOptions.forEach(function (options) {
      playerNames.push(playersList[options]);
    });
    const playerData = helper.getPlayerData(players, playerNames, this.state.graphMode);
    const data = playerData.graphData;
    const graphKeys = playerData.graphKeys;


    const graphLines = this.getGraphLine(graphKeys, graphColorsCurrent);

    return (
      <section className="home-wrapper">
        <div className="row">
          <div className="columns medium-12">
            <div className="overview">
              <h3>IPL Overview</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 medium-12 large-8">
            <div className="graph-box">

              <ResponsiveContainer height={350}>
                <LineChart data={data}>
                  <XAxis dataKey="label"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="5 0" stroke="#393840"/>
                  {/*<Tooltip wrapperStyle={{background: "black", "border": "none"}}/>*/}
                  <Tooltip content={<CustomTooltip data={data} options={this.state.graphOptions} dataType="season"
                                                   optionsNames={optionsNames} graphKeys={graphKeys}/>}/>
                  {graphLines}
                </LineChart>

              </ResponsiveContainer>
            </div>
          </div>

          <div className="columns small-12 hide-for-large criteria-button">
            { this.state.graphModeClass === smallDevicehideClass &&
            <button onClick={this.switchOptions}>Choose Player</button> }
            { this.state.graphOptionsClass === smallDevicehideClass &&
            <button onClick={this.switchOptions}>Choose Criteria</button> }
          </div>

          <div className={"columns small-12 large-4 " + this.state.graphModeClass}>
            <GraphOption onClickHandler={this.onGraphOptionClick} colors={graphColorsCurrent} mode="multi"
                         options={this.state.graphOptions} optionsNames={optionsNames} colorCoded={true} height={350}/>
          </div>

          <div className={"columns small-12 " + this.state.graphOptionsClass}>
            <GraphOption optionClassName="small-12 medium-6 large-3" onClickHandler={this.onGraphModeClick}
                         colors={graphColors} mode="single" options={this.state.graphMode}
                         optionsNames={graphModeNames} seachEnabled={true} />
          </div>

        </div>
      </section>
    );
  }
}

export default Players;
