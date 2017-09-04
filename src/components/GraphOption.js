import  React from 'react';
import PropTypes from 'prop-types';

const GraphOption = ({options, optionsNames, colors, onClickHandler}) => {

  const getGraphOptions = (options, colors) => {
    return optionsNames.map(function (optionsName, i) {
      const color = options.indexOf(i) !== -1 ? colors[i] : "black";
      return (
        <div key={i} className="columns small-12 medium-6 large-12">
          <div className="graph-option" onClick={() => {
            onClickHandler(i);
          }}>
            <span style={{background: color}} className="graph-option-disc"/><span>{optionsName}</span>
          </div>
        </div>
      );
    });
  };

  /*const onClickHandler = (i) => {
   this.props.onClickHandler(i);
   };*/

  const graphOptions = getGraphOptions(options, colors);
  return (
    <section className="user-option-wrapper">
      <div className="row align-middle">
        {graphOptions}
      </div>
    </section>
  );
};

GraphOption.propTypes = {
  options: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  optionsNames: PropTypes.array.isRequired,
};


export default GraphOption;
