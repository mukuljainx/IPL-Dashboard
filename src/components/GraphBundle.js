/*eslint import/namespace: ['error', { allowComputed: true }]*/
import  React from 'react';
import PropTypes from 'prop-types';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


import GraphOption from './GraphOption';
import CustomTooltip from './CustomTooltip';
import CustomDot from './CustomDot';
import Alert from './Alert';

import * as helper from '../helper/dataCreator';

const graphColors = ["#3FAEFF"];


const smallDevicehideClass = "hide-for-medium-only hide-for-small-only";


class GraphBundle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      graphOptions: [0, 1],
      graphMode: [0],
      graphModeClass: "",
      graphOptionsClass: smallDevicehideClass,
    };

    this.customDotOnClick = this.customDotOnClick.bind(this);
    this.getGraphLine = this.getGraphLine.bind(this);
    this.onGraphOptionClick = this.onGraphOptionClick.bind(this);
    this.onGraphModeClick = this.onGraphModeClick.bind(this);
    this.switchOptions = this.switchOptions.bind(this);

  }

  componentWillUnmount(){
    console.log('lol');
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

  customDotOnClick() {
    // const season = data.season;
    // this.props.history.push("/season/" + season);
  }

  onGraphOptionClick(option) {

    this.setState((prevState) => {
      let graphOptions = prevState.graphOptions;
      const index = graphOptions.indexOf(option);
      if (index === -1) {

        if (this.state.graphOptions.length >= 5) {
          this.alertBox.showNotification();
          return;
        }

        this.props.graphColorsCurrent["x" + option] = this.props.graphColorsMulti.pop();
        graphOptions.push(option);
        return {
          graphOptions
        };

      } else {
        //put the color back
        this.props.graphColorsMulti.push(this.props.graphColorsCurrent["x" + option]);
        //then remove it
        delete this.props.graphColorsCurrent["x" + option];

        graphOptions.splice(index, 1);
        return {
          graphOptions,
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
    const objectsList = this.props.objectsList;
    const objects = this.props.objects;
    const graphModeNames = this.props.graphModeNames;

    const optionsNames = objectsList;

    let playerNames = [];
    this.state.graphOptions.forEach(function (options) {
      playerNames.push(objectsList[options]);
    });

    const playerData = helper[this.props.dataFunctionKey](objects, playerNames, this.state.graphMode);
    const data = playerData.graphData;
    const graphKeys = playerData.graphKeys;


    const graphLines = this.getGraphLine(graphKeys, this.props.graphColorsCurrent);

    return (
      <section className="home-wrapper">

        <Alert onRef={ref => (this.alertBox = ref)} alert={this.props.graphAlert} />

        <div className="row">
          <div className="columns small-11 medium-12 large-8">
            <div className="graph-box">

              <ResponsiveContainer height={355}>
                <LineChart data={data}>
                  <XAxis dataKey="label"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="5 0" stroke="#393840"/>
                  <Tooltip content={<CustomTooltip data={data} options={this.state.graphOptions} dataType="season"
                                                   optionsNames={optionsNames} graphKeys={graphKeys}/>}/>
                  {graphLines}
                </LineChart>

              </ResponsiveContainer>
            </div>
          </div>

          <div className="columns small-12 hide-for-large criteria-button">
            { this.state.graphModeClass === smallDevicehideClass &&
            <button onClick={this.switchOptions}>Choose {this.props.switchName}</button> }
            { this.state.graphOptionsClass === smallDevicehideClass &&
            <button onClick={this.switchOptions}>Choose Criteria</button> }
          </div>

          <div className={"columns small-12 large-4 " + this.state.graphModeClass}>
            <GraphOption onClickHandler={this.onGraphOptionClick} colors={this.props.graphColorsCurrent} mode="multi"
                         options={this.state.graphOptions} optionsNames={optionsNames} colorCoded={true} height={350}
                         searchEnabled={true} searchPlaceholder={this.props.searchPlaceholder} optionsNamesObject={objects}/>
          </div>

          <div className={"columns small-12 " + this.state.graphOptionsClass}>
            <GraphOption optionClassName="small-12 medium-6 large-3" onClickHandler={this.onGraphModeClick}
                         colors={graphColors} mode="single" options={this.state.graphMode}
                         optionsNames={graphModeNames}/>
          </div>

        </div>
      </section>
    );
  }
}

GraphBundle.propTypes = {
  objectsList : PropTypes.array,
  objects : PropTypes.object,
  graphModeNames : PropTypes.array,
  switchName : PropTypes.string,
  graphAlert : PropTypes.string,
  dataFunctionKey : PropTypes.string,
  searchPlaceholder : PropTypes.string,
  graphColorsMulti: PropTypes.array,
  graphColorsCurrent:PropTypes.object

};

export default GraphBundle;
