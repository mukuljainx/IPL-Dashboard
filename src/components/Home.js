import  React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import CustomLegend from './CustomLegend';
import GraphOption from './GraphOption';

import * as helper from '../helper/dataCreator';


import seasons from "../data/seasons.json";



let graphColors = ["#82ca9d", "#3FAEFF", "#8884d8", "#FF7C14","#FFFF40", "#FF0000","#FF00FF", "#FFFFFF"];


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options : [0,1]
    };

    this.getGraphLine = this.getGraphLine.bind(this);
    this.updategraph = this.updategraph.bind(this);
    this.onGraphOptionClick = this.onGraphOptionClick.bind(this);
  }

  getGraphLine(keys,colors){
    return keys.map(function (key,i) {
      return (
        <Line key={i} type="monotone" dataKey={key} stroke={colors[i]} />
      );
    });
  }

  updategraph(options){
    this.setState({
      options
    });
  }

  onGraphOptionClick(option){
    console.log(option)
  }



  render() {
    const options = this.state.options;
    let data = helper.seasonData(seasons,options);
    let graphKeys = ["average6s","average4s"];

    const graphLines = this.getGraphLine(graphKeys,graphColors);
    return (
      <section className="home-wrapper">
        <div className="row">
          <div className="columns medium-12">
            <div className="overview">
              <h3>Season Overview</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns medium-8">
            <div className="graph-box">
              <CustomLegend props={{names: ["Team 1", "Team 2"], colors: ["#82ca9d", "#8884d8"]}}/>

              <ResponsiveContainer height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="season"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="5 0" stroke="#393840"/>
                  <Tooltip wrapperStyle={{background: "black", "border": "none"}}/>
                  {/*<Legend verticalAlign="top" iconSize={20} height={40}  content={<CustomLegend props={{names :["Team 1", "Team 2"],colors :["#82ca9d","#8884d8"]}} />} />*/}
                  {graphLines}
                </LineChart>

              </ResponsiveContainer>
            </div>
          </div>


          <div className="columns medium-4">
            <GraphOption onClickHandler={this.onGraphOptionClick} colors={graphColors} />
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
