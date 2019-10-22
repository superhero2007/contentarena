import React from "react";
import cn from "classnames";
import Translate from "@components/Translator/Translate";

class CountrySelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
		};
	}

	render() {
		const {
			availableCountries,
			selectedCountries,
			onSelect,
			onSelectAll,
			onUnselectAll,
			skipSelected,
			title,
		} = this.props;

		const { query } = this.state;

		const filtered = (query !== "") ? availableCountries.filter(country => country.name.match(new RegExp(query, "gi"))) : availableCountries;

		return (
			<div className="selector-container">
				<h5>
					{title}
				</h5>
				<div key="search" className="selector-search">
					<input
						placeholder="Search..."
						onChange={event => this.setState({ query: event.target.value })}
					/>
					<i className="icon-search" />
				</div>
				<div className="country-selector">
					{filtered.length > 1 && (
						<div key="all" className="input-checkbox">
							<span className="input-checkbox-text">
								<span>
									{selectedCountries.length === filtered.length && (
										<Translate i18nKey="TERRITORY_SELECTOR_REMOVE_ALL" />
									)}
									{selectedCountries.length !== filtered.length && (
										<Translate i18nKey="TERRITORY_SELECTOR_ADD_ALL" />
									)}
								</span>
							</span>

							{selectedCountries.length !== filtered.length && (
								<button className="info-outline-button" onClick={() => onSelectAll(filtered)}>
									<Translate i18nKey="TERRITORY_SELECTOR_ADD" />
								</button>
							)}

							{selectedCountries.length === filtered.length && (
								<button className="info-outline-button" onClick={() => onUnselectAll([])}>
									<Translate i18nKey="TERRITORY_SELECTOR_REMOVE" />
								</button>
							)}
						</div>
					)}

					{filtered.length === 0 && (
						<div key="all" className="input-checkbox">
							<span className="input-checkbox-text">
								<Translate i18nKey="TERRITORY_SELECTOR_NO_RESULTS" />
							</span>
						</div>
					)}


					{filtered.map((country) => {
						const selectedCountry = selectedCountries.find(e => e.id === country.id);

						if (selectedCountry && skipSelected) return null;

						return (
							<div key={country.id} className={cn("input-checkbox", { "input-checkbox--is-selected": selectedCountry })}>
								<span className="input-checkbox-text">
									<span>{country.name}</span>
								</span>
								{!selectedCountry && (
									<button className="info-outline-button" onClick={() => onSelect(country)}>
										<Translate i18nKey="TERRITORY_SELECTOR_ADD" />
									</button>
								)}
								{selectedCountry && (
									<button className="info-outline-button" onClick={() => onSelect(country)}>
										<Translate i18nKey="TERRITORY_SELECTOR_REMOVE" />
									</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

CountrySelector.defaultProps = {
	skipSelected: false,
};

export default CountrySelector;
