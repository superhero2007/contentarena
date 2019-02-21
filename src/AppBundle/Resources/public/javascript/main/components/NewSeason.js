import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class NewSeason extends React.Component {
  constructor(props) {
    super(props);

    const startYear = 2030;
    const years = [];

    for (let i = 0; i < 81; i++) { years.push(startYear - i); }

    this.state = {
      years,
    };
  }

    getEndOptions = () => {
      const values = [];
      const { index, seasons } = this.props;
      if (seasons[index].from) {
        values.push(Number(seasons[index].from));
        values.push(Number(seasons[index].from) + 1);

        return values.map((value, i) => <option key={`option-${i}`} selected={Number(seasons[index].from) === value} value={value}>{value}</option>);
      }

      return (<option key="placeholder">Year</option>);
    };

    setDate = (key, value) => {
      const { index } = this.props;
      this.props.updateFromMultiple(index, key, value);
    };

    render() {
      const { index, seasons } = this.props;

      return (
        <div>
          <div className="base-input">
            <label>Season</label>
            <label className="season-selector-label">From</label>
            <select
              value={seasons[index].from}
              onChange={(e) => { this.setDate("from", e.target.value); }}
            >
              <option />
              <option disabled>
                {this.context.t("Year")}
              </option>
              {this.state.years.map((year, i) => (<option key={i} value={year}>{year}</option>))}
            </select>
            <label className="season-selector-label">
              {this.context.t("To")}
            </label>
            <select
              value={seasons[index].to}
              onChange={(e) => {
                const { value } = e.target;

                if (value === "null") {
                  this.setDate("to", null);
                } else {
                  this.setDate("to", value);
                }
              }}

              disabled={!seasons[index].from}
            >
              {this.getEndOptions()}
              <option value={null} selected={(!seasons[index].to) ? "selected" : ""}>
                {this.context.t("Not applicable")}
              </option>
            </select>
            { this.props.showClose
                    && (
                    <button className="standard-button" onClick={this.props.onRemove}>
                      <i className="fa fa-close" />
                    </button>
                    )}
          </div>
        </div>
      );
    }
}

NewSeason.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.content;

const mapDispatchToProps = dispatch => ({
  updateFromMultiple: (index, key, value) => dispatch({
    type: "UPDATE_FROM_MULTIPLE",
    selectorType: "seasons",
    index,
    key,
    value,
  }),

});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewSeason);
