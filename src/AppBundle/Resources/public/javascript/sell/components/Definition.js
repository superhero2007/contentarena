import React from "react";
import { PropTypes } from "prop-types";

class Definition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
    };
  }

    editContent = () => {
      const _this = this;
      this.setState({ editable: true });
      this._input.focus();
      setTimeout(() => { _this._input.focus(); }, 1000);
    };

    saveContent = () => {
      this.setState({ editable: false });
    };

    render() {
      return (
        <div className="definition">
          <div className="definition-container">
            <label>{this.props.label}</label>
            <input
              disabled={!this.state.editable}
              type="text"
              ref={_input => this._input = _input}
              defaultValue={this.props.defaultValue}
            />
          </div>
          { !this.state.editable && (
          <button onClick={this.editContent}>
            {this.context.t("Edit")}
          </button>
          )}
          { this.state.editable && (
          <button onClick={this.saveContent}>
            {this.context.t("Save")}
          </button>
          )}
        </div>
      );
    }
}

Definition.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Definition;
