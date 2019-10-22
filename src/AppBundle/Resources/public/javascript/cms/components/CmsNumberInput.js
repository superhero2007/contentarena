import React from "react";

class CmsNumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultValue: props.defaultValue || 0,
			value: props.value || null,
			min: props.min || 0,
		};
	}

	increaseValue = () => {
		const { value } = this.state;
		this.setState({ value: Number(value) + 1 }, () => {
			this.props.onChange(this.state.value);
		});
	};

	decreaseValue = () => {
		const { value, min } = this.state;
		this.setState({ value: (value <= min) ? min : Number(value) - 1 }, () => {
			this.props.onChange(this.state.value);
		});
	};

	setValue = (value) => {
		if (this.props.disableOnChange) return;
		this.setState({ value: Number(value) }, () => {
			this.props.onChange(this.state.value);
		});
	};

	render() {
		return (
			<div className="input-stepper">
				<input
					className="input-stepper-content"
					type="number"
					defaultValue={this.state.defaultValue}
					value={this.state.value}
					onFocus={e => e.target.select()}
					onChange={e => this.setValue(e.target.value)}
					onKeyDown={this.props.onKeyDown}
					onBlur={this.props.onBlur}
					min={this.state.min}
				/>
				<div className="input-stepper-control">
					<div
						className="input-stepper-control-item"
						onClick={this.increaseValue}
					>
						+
					</div>
					<div
						className="input-stepper-control-item"
						onClick={this.decreaseValue}
					>
						-
					</div>
				</div>
			</div>
		);
	}
}

CmsNumberInput.defaultProps = {
	disableOnChange: false,
};

export default CmsNumberInput;
