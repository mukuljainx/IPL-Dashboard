import  React from 'react';
import PropTypes from 'prop-types';

const CustomTooltip = ({ payload, label, data, options, optionsNames, dataType, graphKeys}) => {

  const base = data[0][dataType];

  const gettooltipContent = (payload) => {

    if(payload === undefined) return (<span />);

    return options.map(function (option, i) {
      return (
        <div key={i} className="row">
          <div className="columns small-12">
            {typeof(data[(label - base)][graphKeys[i]]) === "undefined" &&
            <sapn><b>{optionsNames[option]}:</b> {data[(label - base)][graphKeys[i].replace("[value]","")].value} ({data[(label - base)][graphKeys[i].replace("[value]","")].name})</sapn>
            }
            {typeof(data[(label - base)][graphKeys[i]]) !== "undefined" &&
            <sapn><b>{optionsNames[option]}:</b> {data[(label - base)][graphKeys[i]]}</sapn>
            }
          </div>
        </div>
      );
    });


  };


  const tooltipContent = (payload  && payload.length > 0)? gettooltipContent(payload) : "";

  return (
    <section className="custom-graph-tooltip">
      <div className="row">
        <div className="columns small-12">
          {dataType === "season" &&
          <span><b>Year:</b> {label}</span>
          }
          <br />
          <span><b>Season Winner:</b> {
            data[(label - base)] !== undefined
            &&
            data[(label - base)]["winner"]
          } </span> <br />
        </div>
      </div>
      {tooltipContent}
    </section>
  );
};

CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  // label: PropTypes.string,
  data: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  dataType: PropTypes.string.isRequired,
  graphKeys: PropTypes.array.isRequired,
};


export default CustomTooltip;
