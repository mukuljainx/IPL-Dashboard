import  React from 'react';
import PropTypes from 'prop-types';
import {Line} from 'recharts';



class CustomGraphLines extends React.Component {

  constructor(props) {
    super(props);
    this.getGraphLine = this.getGraphLine.bind(this);
  }

  getGraphLine(keys,colors){

    return keys.map(function (key,i) {

      return (
        <Line key={i} type="monotone" dataKey={key} stroke={colors[i]} />
      );
    });
  }


  render() {
    const graphLines = this.getGraphLine(this.props.keys,this.props.colors);

    return (
        // {graphLines}
      <Line type="monotone" dataKey="total6s" stroke="red" />
    );
  }
}

CustomGraphLines.propTypes = {
  keys : PropTypes.array.isRequired,
  colors : PropTypes.array.isRequired
};

export default CustomGraphLines;
