import  React from 'react';
import PropTypes from 'prop-types';

const GraphOption = ({options, optionsNames, colors, onClickHandler,mode, colorCoded,height,optionClassName}) => {

  const getGraphOptions = (options, colors) => {

    return optionsNames.map(function (optionsName, i) {
      let color = "";
      if(mode === "single") color = options.indexOf(i) !== -1 ? colors[0] : "black";
      else {
        if(colorCoded) {
          const index = options.indexOf(i);
          if(index !== -1){
            color = colors["x" + i];
            options.splice(index,1);
          } else color = "black";
        }else color = options.indexOf(i) !== -1 ? colors[i] : "black";

      }

      return (
        <div key={i} className={"columns " + optionClassName}>
          <div className="graph-option" onClick={() => {
            onClickHandler(i);
          }}>
            <span style={{background: color}} className="graph-option-disc"/><span>{optionsName}</span>
          </div>
        </div>
      );
    });
  };

  let style = {};
  if(height){
    style = {
      height : height,
      overflow : "auto",
    };
  }

  const graphOptions = getGraphOptions(options.slice(0), colors);
  return (
    <section className="user-option-wrapper">
      <div className="row align-middle" style={style} >
        {graphOptions}
      </div>
    </section>
  );
};

GraphOption.propTypes = {
  options: PropTypes.array.isRequired,
  // colors: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  optionsNames: PropTypes.array.isRequired,
  mode : PropTypes.string,
  colorCoded : PropTypes.bool,
  height : PropTypes.number,
  optionClassName : PropTypes.string,
};

GraphOption.defaultProps = {
  optionClassName : "small-12 medium-6 large-12",
};


export default GraphOption;
