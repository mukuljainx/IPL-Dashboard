import  React from 'react';
import PropTypes from 'prop-types';

const CustomDot = ({cx, cy, stroke, payload, value, onClickHandler}) => {


  return (
    <svg onClick={() => {
      onClickHandler(payload);
    }}>
      <circle x={cx - 10} y={cy - 10} r="6" fill={stroke} width="700" height="310"
              className="recharts-dot recharts-dot-custom recharts-line-dot" cx={cx} cy={cy}/>
    </svg>
  );
};


export default CustomDot;