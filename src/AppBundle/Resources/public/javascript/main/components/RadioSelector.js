import React from "react";
import cn from "classnames";

class RadioSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

    handleRadioChange = (e) => {
      const { onChange } = this.props;
      onChange(e.target.value);
    };

    render() {
      const { items = [], value, className } = this.props;

      return (
        <div className="d-flex align-items-center radio-selector-container">
          {
                    items.map((item, k) => (
                      <div
                        key={k}
                        className={cn({
                          "d-flex align-items-center": true,
                          "font-weight-bold": value === item.value,
                        }, className)}
                      >
                        <input
                          className="ca-radio"
                          type="radio"
                          disabled={item.disabled}
                          value={item.value}
                          onChange={this.handleRadioChange}
                          checked={value === item.value}
                          style={{ marginRight: 5, width: 20, padding: 0 }}
                        />
                        {item.label}
                      </div>
                    ))
                }
        </div>
      );
    }
}

export default RadioSelector;
