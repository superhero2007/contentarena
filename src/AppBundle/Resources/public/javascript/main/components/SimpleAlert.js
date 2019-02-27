import React from "react";
import Select from "react-select";

class SimpleAlert extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
		};
	}

	componentWillReceiveProps(nextProps) {

	}

	componentDidMount() {
	}


	render() {
		const { children } = this.props;
		return (
			<div className="simple-alert">
				{children}
			</div>
		);
	}
}

export default SimpleAlert;
