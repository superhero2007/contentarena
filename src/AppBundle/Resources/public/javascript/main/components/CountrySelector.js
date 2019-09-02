import React from "react";
import Select from "react-select";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";

class CountrySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
		};
	}

	componentWillUnmount() {
		this.isCancelled = true;
	}

	componentDidMount() {
		const _this = this;
		const { silent = false } = this.props;
		if (!silent) {
			ContentArena.Api.getCountries().done((countries) => {
				!_this.isCancelled && _this.setState({ countries });
			});
		}
	}

	getOptions = () => {
		const { filter = [], available, exclusiveSoldTerritories } = this.props;

		let countries = Object.values(ContentArena.Data.Countries).map((i) => {
			i.value = i.name;
			i.label = i.name;
			return i;
		});

		if (available && available.length > 0) {
			countries = available.map((i) => {
				i.value = i.name;
				i.label = i.name;
				return i;
			});
		}

		countries = countries.filter(country => filter.indexOf(country.value) === -1);

		countries = exclusiveSoldTerritories && exclusiveSoldTerritories.length > 0 ? this.getAvailableTerritories(countries) : countries;

		return countries;
	};

	getAvailableTerritories = (territories) => {
		const { exclusiveSoldTerritories } = this.props;

		if (exclusiveSoldTerritories && exclusiveSoldTerritories.length > 0) {
			return territories.filter(t => !exclusiveSoldTerritories.some(ht => ht.label === t.label));
		}
		return territories;
	};

	render() {
		const {
			onChange, className, multi = true, disabled = false, exclusiveSoldTerritories, placeholder, isInvalid,
		} = this.props;
		let { value } = this.props;


		if (exclusiveSoldTerritories) {
			const { countries } = this.state;

			if (exclusiveSoldTerritories.length > 0) {
				if (value && value.length > 0) {
					value = this.getAvailableTerritories(value);

					if (value.length === 0) {
						return (
							<div
								style={{ padding: "15px 0" }}
							>
								<Translate i18nKey="All territories are sold and listing is exclusive" />
							</div>
						);
					}
				}
			}

			if (countries && exclusiveSoldTerritories.length === countries.length) {
				return (
					<div
						style={{ padding: "15px 0" }}
					>
						<Translate i18nKey="Worldwide includes sold territories and listing is exclusive" />
					</div>
				);
			}
		}

		return (

			<Select
				className={isInvalid ? "is-invalid" : className}
				name="form-field-name"
				onChange={onChange}
				placeholder={placeholder || "Select territory"}
				disabled={disabled}
				value={value}
				multi={multi}
				options={this.getOptions()}
			/>
		);
	}
}

CountrySelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CountrySelector;
