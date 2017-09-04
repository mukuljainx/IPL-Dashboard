import  React from 'react';
import {LineChart, Line ,XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import GraphOption from './GraphOption';
import CustomTooltip from './CustomTooltip';
import CustomDot from './CustomDot';

import * as helper from '../helper/dataCreator';





const graphColors = ["#82ca9d", "#3FAEFF", "#8884d8", "#FF7C14","#FFFF40", "#FF0000","#FF00FF", "#FFFFFF"];
const optionsNames = ["Average 6s", "Average 4s", "Average Team Score", "Most Man of the Match", "Highest Team Score", "Highest Batsman Score", "Highest Wicket Taken (1 Match)", "Highest Catches (1 Match)"];


class Players extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options : [0,1]
    };
  }



  render() {
    return (
      <section className="home-wrapper">

      </section>
    );
  }
}

export default Players;
