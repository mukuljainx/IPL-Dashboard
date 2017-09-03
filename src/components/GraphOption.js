import  React from 'react';
import PropTypes from 'prop-types';

const GraphOption = ({options,colors, onClickHandler}) => {

  const getGraphOptions = (options, colors) => {
    return optionsNames.map(function (optionsName, i) {
      const color = options.indexOf(i) !== -1 ? colors[i] : "black";
      return (
        <div className="row align-middle" key={i}>
          <div className="columns medium-8 graph-option" onClick={() => {
            onClickHandler(i);
          }}>
            <span style={{background: color }} className="graph-option-disc"/><span>{optionsName}</span>
          </div>
        </div>
      );
    });
  };

  /*const onClickHandler = (i) => {
    this.props.onClickHandler(i);
  };*/

  const optionsNames = ["Average 6s", "Average 4s", "Average Team Score", "Most Man of the Match", "Highest Team Score", "Highest Batsman Score", "Highest Wicket Taken (1 Match)", "Highest Catches (1 Match)"];
  const graphOptions = getGraphOptions(options, colors);
  return (
    <section className="user-option-wrapper">
      {graphOptions}
    </section>
  );
};

GraphOption.propTypes = {
  options : PropTypes.array.isRequired,
  colors : PropTypes.array.isRequired,
  onClickHandler : PropTypes.func.isRequired,
};


export default GraphOption;
