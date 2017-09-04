import  React from 'react';
import {LineChart, Line ,XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import CustomLegend from './CustomLegend';
import GraphOption from './GraphOption';
import CustomTooltip from './CustomTooltip';
import CustomDot from './CustomDot';

import * as helper from '../helper/dataCreator';


import seasons from "../data/seasons.json";



const graphColors = ["#82ca9d", "#3FAEFF", "#8884d8", "#FF7C14","#FFFF40", "#FF0000","#FF00FF", "#FFFFFF"];
const optionsNames = ["Average 6s", "Average 4s", "Average Team Score", "Most Man of the Match", "Highest Team Score", "Highest Batsman Score", "Highest Wicket Taken (1 Match)", "Highest Catches (1 Match)"];


class Random extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options : [0,1]
    };

    this.customDotOnClick = this.customDotOnClick.bind(this);
    this.getGraphLine = this.getGraphLine.bind(this);
    this.onGraphOptionClick = this.onGraphOptionClick.bind(this);
  }

  getGraphLine(keys,colors,options){
    const customDotOnClick = this.customDotOnClick;
    return keys.map(function (key,i) {
      const color = colors[options[i]];
      return (
        <Line key={i} type="monotone" activeDot={<CustomDot stroke={color} onClickHandler={customDotOnClick} />} dataKey={key} stroke={color}  />
      );
    });
  }

  customDotOnClick(data){
    const season = data.season;
    this.props.history.push("/season/" + season);
  }

  onGraphOptionClick(option){
    this.setState((prevState) => {
      let options = prevState.options;
      const index = options.indexOf(option);
      if(index === -1){
        options.push(option);
        console.log(options);
        return{
          options
        };
      }else{
        options.splice(index,1);
        console.log(options);
        return{
          options
        };
      }
    });

  }



  render() {
    const options = this.state.options;
    const seasonData = helper.seasonData(seasons,options);
    let data = seasonData.data;
    let graphKeys = seasonData.graphKeys;


    const graphLines = this.getGraphLine(graphKeys,graphColors,options);
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
                  <XAxis dataKey="season"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="5 0" stroke="#393840"/>
                  {/*<Tooltip wrapperStyle={{background: "black", "border": "none"}}/>*/}
                  <Tooltip content={<CustomTooltip data={data} options={options} dataType="season" optionsNames={optionsNames} graphKeys={graphKeys} />} />
                  {graphLines}
                </LineChart>

              </ResponsiveContainer>
            </div>
          </div>


          <div className="columns small-12 large-4">
            <GraphOption onClickHandler={this.onGraphOptionClick} colors={graphColors} options={this.state.options} optionsNames={optionsNames} />
          </div>
        </div>
      </section>
    );
  }
}

export default Random;
