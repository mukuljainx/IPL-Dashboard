import  React from 'react';

const getLegends = (props) =>{
  const names = props.names;
  const colors = props.colors;

  return names.map((name,i) => {
    return (
      <div key={i}>
        <span className="legend-dot" style={{background : colors[i]}} />
        <span className="legend-name">{name}</span>
      </div>
    );
  });
};

const CustomLegend = (props) => {
const legends = getLegends(props.props);
  return (
    <div className="custom-legend">
      {legends}
    </div>
  );
};



export default CustomLegend;
