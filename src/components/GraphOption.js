import  React from 'react';
import PropTypes from 'prop-types';

class GraphOption extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      optionsNames: props.optionsNames.slice(0),
    };

    this.getGraphOptions = this.getGraphOptions.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.ModifyOptionNames = this.ModifyOptionNames.bind(this);

  }


  getGraphOptions(options, colors, onClickHandler, optionClassName, optionsNames, colorCoded, mode, optionsNamesObject) {
    return optionsNames.map(function (optionsName, count) {
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

  ModifyOptionNames(options) {
    //to put selected names at top, so user can deselect them easily, also they can be used as legends, also

    const originalOptionNames = this.props.optionsNames;
    let optionsNames = this.state.optionsNames.slice(0);


    let names = [];
    options.map(function (option) {
      const name = originalOptionNames[option];
      const index = optionsNames.indexOf(name);
      if (index !== -1) {
        optionsNames.splice(index, 1);
        names.push(name);
      }
    });

    optionsNames = [...names, ...optionsNames];
    return optionsNames;

  }


  render() {
    let {options, colors, onClickHandler, mode, colorCoded, height, optionClassName, searchEnabled, optionsNamesObject} = this.props;

    const ModifiedOptionNames = colorCoded ? this.ModifyOptionNames(options) : this.state.optionsNames;

    const graphOptions = this.getGraphOptions(options.slice(0), colors, onClickHandler, optionClassName, ModifiedOptionNames, colorCoded, mode, optionsNamesObject);

    let style = {};
    if (height) {
      style = {
        maxHeight: height,
        overflow: "auto",
        paddingTop: "51px"
      };
    }

    return (
      <section className="user-option-wrapper">
        <div className="row " style={style}>
          {searchEnabled &&
          <div className={"columns graph-option-searchbox small-12"}>
            <input value={this.state.searchValue} onChange={
              this.searchOnChange
            } type="text" placeholder={this.props.searchPlaceholder}/>
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
  optionsNamesObject: PropTypes.object,
  searchPlaceholder : PropTypes.string,
};

GraphOption.defaultProps = {
  optionClassName: "small-12 medium-6 large-12",
  optionsNamesObject: {}
};


export default GraphOption;

