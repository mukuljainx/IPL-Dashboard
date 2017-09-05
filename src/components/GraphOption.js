import  React from 'react';
import PropTypes from 'prop-types';

class GraphOption extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      optionsNames: props.optionsNames,
    };

    this.getGraphOptions = this.getGraphOptions.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);

  }


  getGraphOptions(options, colors, onClickHandler, optionClassName, optionsNames, colorCoded, mode,optionsNamesObject) {
    return optionsNames.map(function (optionsName,count) {
      let i = optionsNamesObject[optionsName] ? optionsNamesObject[optionsName].id : count;
      let color = "";
      if (mode === "single") color = options.indexOf(i) !== -1 ? colors[0] : "black";
      else {
        if (colorCoded) {
          const index = options.indexOf(i);
          if (index !== -1) {
            color = colors["x" + i];
            options.splice(index, 1);
          } else color = "black";
        } else color = options.indexOf(i) !== -1 ? colors[i] : "black";

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
  }

  searchOnChange(event) {
    // debugger;
    const value = event.target.value.toLowerCase();
    const optionsNames = this.props.optionsNames;

    let filteredName = optionsNames.filter(function (name) {
      return name.toLowerCase().indexOf(value) !== -1;
    });

    this.setState({
      searchValue: value,
      optionsNames: filteredName
    });

  }


  render() {
    let {options, colors, onClickHandler, mode, colorCoded, height, optionClassName, searchEnabled,optionsNamesObject} = this.props;

    const graphOptions = this.getGraphOptions(options.slice(0), colors, onClickHandler, optionClassName, this.state.optionsNames, colorCoded, mode,optionsNamesObject);

    let style = {};
    if (height) {
      style = {
        height: height,
        overflow: "auto",
      };
    }

    return (
      <section className="user-option-wrapper">
        <div className="row align-middle" style={style}>
          {searchEnabled &&
          <div className={"columns " + optionClassName}>
            <input value={this.state.searchValue} onChange={
              this.searchOnChange
            } type="text" placeholder="Search"/>
          </div>
          }
          {graphOptions}
        </div>
      </section>
    );
  }
}

GraphOption.propTypes = {
  options: PropTypes.array.isRequired,
  // colors: PropTypes.array.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  optionsNames: PropTypes.array.isRequired,
  mode: PropTypes.string,
  colorCoded: PropTypes.bool,
  height: PropTypes.number,
  optionClassName: PropTypes.string,
  searchEnabled: PropTypes.bool,
  optionsNamesObject : PropTypes.object,
};

GraphOption.defaultProps = {
  optionClassName: "small-12 medium-6 large-12",
  optionsNamesObject : {}
};


export default GraphOption;

