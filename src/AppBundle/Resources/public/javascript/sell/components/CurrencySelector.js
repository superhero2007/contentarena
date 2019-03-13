import React from "react";
import cn from "classnames";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";

const CURRENCIES = ["USD", "EUR"];

class CurrencySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { onClick, selected } = this.props;

		return (
			<div className="select-currency">
				<div className="select-text">
					<Translate i18nKey="Currency" />
				</div>
				<div className="currency-selector">
					<div className="current">
						{selected}
						<i className="fa fa-angle-down" />
					</div>
					<div className="dropdown">
						{CURRENCIES.filter(currency => currency !== selected).map(currency => (
							<div className={cn("currency-item")} onClick={() => onClick(currency)}>
								{currency}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

CurrencySelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CurrencySelector;
