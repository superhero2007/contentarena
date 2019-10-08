import React from "react";
import Translate from "@components/Translator/Translate";
import TerritorySelector from "@components/Territories/TerritorySelector";
import { CurrencyFilter } from "@components/Filters";
import { BUNDLE_OFFER_TERRITORIES } from "../../common/constants";
import CmsNumberInput from "../components/CmsNumberInput";
import { getBundleName } from "../helpers/PropertyListingHelper";

class BundleCreator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			saving: false,
			territoriesMode: BUNDLE_OFFER_TERRITORIES.INDIVIDUALLY,
			currency: "EUR",
			minimumBid: 1,
		};
	}

	onSelectTerritories = territories => this.setState({ territories });

	createBundle = () => {
		const {
			territories, territoriesMode, minimumBid, currency,
		} = this.state;

		const bundles = [];

		if (territoriesMode === BUNDLE_OFFER_TERRITORIES.INDIVIDUALLY) {
			territories.forEach(territory => bundles.push({
				territories: [territory],
				minimumBid,
				currency,
				name: getBundleName([territory]),
			}));
		} else {
			bundles.push({
				territories,
				minimumBid,
				currency,
				name: getBundleName(territories),
			});
		}

		this.props.onCreateBundles(bundles);
	};

	render() {
		const {
			territories, territoriesMode, minimumBid, currency,
		} = this.state;

		const { availableCountries } = this.props;

		return (
			<>
				<TerritorySelector
					availableCountries={availableCountries}
					selectedCountries={territories}
					onSelect={this.onSelectTerritories}
				/>
				<div className="d-flex form-group accordion-container-content-item">
					<div className="w-50">
						<label>
							<Translate i18nKey="BUNDLE_OFFER_TERRITORIES_AS_TITLE" />
						</label>

						<div className="input-radio-group">
							<label className="input-radio">
								<input
									type="radio"
									checked={territoriesMode === BUNDLE_OFFER_TERRITORIES.INDIVIDUALLY}
									onChange={() => this.setState({ territoriesMode: BUNDLE_OFFER_TERRITORIES.INDIVIDUALLY })}
									id="non-exclusive"
								/>
								<span className="input-radio-selector" />
								<span className="input-radio-text">
									<Translate i18nKey="BUNDLE_OFFER_TERRITORIES_AS_BUNDLE_INDIVIDUALLY" />
								</span>
							</label>
							<label className="input-radio">
								<input
									type="radio"
									checked={territoriesMode === BUNDLE_OFFER_TERRITORIES.BUNDLE}
									onChange={() => this.setState({ territoriesMode: BUNDLE_OFFER_TERRITORIES.BUNDLE })}
									id="exclusive"
								/>
								<span className="input-radio-selector" />
								<span className="input-radio-text">
									<Translate i18nKey="BUNDLE_OFFER_TERRITORIES_AS_BUNDLE" />
								</span>
							</label>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-between form-group accordion-container-content-item">
					<div className="w-25">
						<label>
							<Translate i18nKey="SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID" />
						</label>
						<CmsNumberInput
							value={minimumBid}
							min={1}
							onChange={bid => this.setState({ minimumBid: bid })}
						/>
					</div>
					<div className="w-25">
						<CurrencyFilter
							value={currency}
							onChange={currency => this.setState({ currency })}
						/>
					</div>
					<div className="w-50" />
				</div>

				<div className="accordion-container-buttons">
					<button className="button secondary-outline-button" onClick={this.props.onCancel}>
						CANCEL
					</button>
					<button className="button secondary-button" onClick={this.createBundle}>
						CREATE BUNDLE
					</button>
				</div>
			</>
		);
	}
}

export default BundleCreator;
