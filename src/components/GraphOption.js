import  React from 'react';
import PropTypes from 'prop-types';

const GraphOption = ({colors, onClickHandler}) => {

  const getGraphOptions = (options, colors) => {
    return options.map(function (option, i) {
      return (
        <div className="row align-middle" key={i}>
          <div className="columns medium-8 graph-option" onClick={() => {
            onClickHandler(i);
          }}>
            <span style={{background: "black"}} className="graph-option-disc"/><span>{option}</span>
          </div>
        </div>
      );
    });
  };

  /*const onClickHandler = (i) => {
    this.props.onClickHandler(i);
  };*/

  const options = ["Average 6s", "Average 4s", "Average Team Score", "Most Man of the Match", "Highest Team Score", "Highest Batsman Score", "Highest Catches", "Highest Wicket Taken"];
  const graphOptions = getGraphOptions(options, colors);
  return (
    <section className="user-option-wrapper">
      {graphOptions}
    </section>
  );
};

GraphOption.propTypes = {
  colors : PropTypes.array.isRequired,
  onClickHandler : PropTypes.func.isRequired,
};


export default GraphOption;
