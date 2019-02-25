import React from "react";

class HistoryButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

    handleClick = () => {
      const { onClick, path } = this.props;

      window.history.pushState("test", "Title", envhosturl + path);
      onClick();
    };

    onBackButtonEvent = (e) => {
      e.preventDefault();
    };

    componentDidMount = () => {
      window.onpopstate = this.onBackButtonEvent;
    };

    render() {
      return (
        <button {...this.props} onClick={this.handleClick}>
          {this.props.children}
        </button>
      );
    }
}

export default HistoryButton;
