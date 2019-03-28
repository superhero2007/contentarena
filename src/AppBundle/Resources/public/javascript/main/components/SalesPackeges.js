import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import ExtraTerritories from "./ExtraTerritories";
import { bidIcon, packageIcon } from "./Icons";
import { getCurrencySymbol } from "../actions/utils";

class SalesPackages extends PureComponent {
	getFee = (salesPackage) => {
		const feeNumber = parseFloat(salesPackage.fee);
		return `${feeNumber.toLocaleString()} ${getCurrencySymbol(salesPackage.currency.code)}`;
	};

	render() {
		const { salesPackages, limitedSize, hideFee } = this.props;
		const salesPackagesArray = Array.isArray(salesPackages) ? salesPackages : [salesPackages];
		return (
			<React.Fragment>
				{salesPackagesArray.slice(0, 3).map((salesPackage, i) => {
					const extraTerritories = (salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING") ? salesPackage.excludedTerritories : salesPackage.territories;

					if (salesPackage.sold) return;
					return (
						<div
							className={(limitedSize) ? "sales-package limited-sales-package" : "sales-package"}
							key={`sp-${i}`}
						>

							{salesPackage.bundleMethod === "SELL_AS_BUNDLE" && (
								<div className="icon">
									<img src={packageIcon} alt="" />
								</div>
							)}

							<div className="name">
								{salesPackage.name}
							</div>

							{extraTerritories && extraTerritories.length > 3 && (
								<div style={{ marginRight: 5 }}>
									<ExtraTerritories
										showAll={salesPackage.regionNamed}
										extraTerritories={extraTerritories}
									/>
								</div>
							)}

							{!hideFee && (salesPackage.salesMethod !== "BIDDING" || (salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0)) && (
								<div className="fee">
									{this.getFee(salesPackage)}
								</div>
							)}

							{salesPackage.salesMethod === "BIDDING" && (
								<div className="icon">
									<img src={bidIcon} alt="" />
								</div>
							)}

						</div>
					);
				})}
				{salesPackages.length > 3 && (
					<div className="sales-package show-all" onClick={this.onShowAllClick}>
						<b>
							{" "}
							+


							{salesPackages.length - 3}
							{" "}

						</b>
					</div>
				)}
			</React.Fragment>
		);
	}

	onShowAllClick = () => {
		const { onShowAllClick } = this.props;

		if (onShowAllClick) {
			onShowAllClick();
		}
	}
}

SalesPackages.propTypes = {
	salesPackages: PropTypes.array.isRequired,
};


export default SalesPackages;
