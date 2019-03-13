import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-modal";
import cn from "classnames";
import Translate from "@components/Translator/Translate";
import { GenericModalStyle } from "../../../main/styles/custom";

Modal.setAppElement("#home-wrapper");

const SelectorItem = ({
	label, selected, onClick, disabled,
}) => (
	<div
		title={label}
		className={cn("selector-item ca-btn yellow-border", { selected }, { disabled })}
		onClick={disabled ? undefined : onClick}
	>
		<span className="selector-item-text">{label}</span>
	</div>
);

class SelectorModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			updated: false,
			filterUpdated: false,
			open: props.selector,
			prevCountries: new Map(),
			customCountry: false,
			selectorItems: props.selectorItems || [],
			popularItems: props.popularItems || [],
			filter: {
				ag: { type: "firstLetter", values: ["a", "b", "c", "d", "e", "f", "g"] },
				hn: { type: "firstLetter", values: ["h", "i", "j", "k", "l", "m", "n"] },
				ot: { type: "firstLetter", values: ["o", "p", "q", "r", "s", "t"] },
				uz: { type: "firstLetter", values: ["u", "v", "w", "x", "y", "z"] },
				popular: { type: "origin", value: "popularItems" },
				international: { type: "international", value: "international" },
			},
			activeFilter: props.activeFilter || "ag",
			selectedItems: new Map(),
			disabled: new Map(),
		};
	}

	componentWillReceiveProps(nextProps) {
		let disabled = new Map();
		const
			selectedItems = new Map();

		if (nextProps.disabled) disabled = nextProps.disabled;
		if (nextProps.selectedItems) {
			nextProps.selectedItems.forEach((v, k) => {
				const key = v.externalId ? v.externalId : `custom${k}`;
				selectedItems.set(key, v);
			});
		}

		this.setState({
			disabled,
			selectedItems,
			selectorItems: nextProps.selectorItems,
		});
	}

	openModal = () => {
		this.props.openSelector();
	};

	closeModal = () => {
		this.setState({ updated: false, filterUpdated: false, customCountry: false });
		this.props.closeSelector();
	};

	getActiveFilter = () => {
		const activeFilter = this.getActiveFilterName();
		return this.state.filter[activeFilter];
	};

	getActiveFilterName = () => ((this.props.activeFilter && !this.state.filterUpdated) ? this.props.activeFilter : this.state.activeFilter);

	isFilterActive = selectedFilter => this.getActiveFilterName() === selectedFilter;

	shouldShowFilters = () => this.state.selectorItems && this.state.selectorItems.length > 30;

	shouldShowInternationalFilter = () => {
		const { selectorItems } = this.state;
		return selectorItems && selectorItems.some(item => item.name.match(/international/gi) !== null);
	};

	setActiveFilter = (filterName) => {
		this.setState({ activeFilter: filterName, filterUpdated: true });
	};

	applySelection = () => {
		let extended = false;
		let { clean } = this.props;
		const { postApplySeasonAction, selectorType } = this.props;
		const { selectedItems, prevCountries } = this.state;

		if (this.state.customCountry) {
			selectedItems.forEach((item) => {
				if (!prevCountries.has(item.externalId)) {
					item.extended = true;
					extended = true;
				}
			});
		}

		if (extended) {
			this.props.addNewSeason(0, []);
			clean = clean.filter(c => c !== "seasons");
		}

		this.setState({ updated: false, filterUpdated: false, customCountry: false });
		this.props.applySelection(
			this.props.selectorType,
			selectedItems,
			this.props.multiple,
			this.props.index,
			clean,
		);

		if (postApplySeasonAction && selectorType === "seasons") postApplySeasonAction(this.props.index);
	};

	addNewSport = (index) => {
		this.setState({ updated: false, filterUpdated: false });
		this.props.addNewSport(index, this.props.clean);
		// if (index === 0) this.props.addNewSeason(index, []);
		this.props.closeSelector();
	};

	addNewTournament = (index) => {
		this.setState({ updated: false, filterUpdated: false });
		this.props.addNewTournament(index, this.props.clean);
		this.props.addNewSeason(index, []);
		this.props.closeSelector();
	};

	addNewSeason = (index) => {
		const {
			listing, addNewSeason, closeSelector, clean, postApplySeasonAction,
		} = this.props;
		const { tournament } = listing;
		const { name } = tournament.length > 0 && tournament[0];
		this.setState({ updated: false, filterUpdated: false });
		addNewSeason(index, clean, name);
		closeSelector();
		if (postApplySeasonAction) postApplySeasonAction(index);
	};

	addNewCategory = (index) => {
		this.setState({ updated: false, filterUpdated: false });
		this.props.addNewCategory(index, this.props.clean);
		this.props.addNewTournament(0, []);
		this.props.addNewSeason(0, []);
		this.props.closeSelector();
	};

	selectItem = (item) => {
		this.setState((prevState) => {
			if (prevState.selectedItems.has(item.externalId)) {
				if (this.props.multiple) {
					prevState.selectedItems.delete(item.externalId);
				}
			} else {
				if (!this.props.multiple) {
					prevState.selectedItems.clear();
				}
				prevState.selectedItems.set(item.externalId, item);
			}

			return {
				selectedItems: prevState.selectedItems,
				updated: true,
			};
		});
	};

	isItemSelected = item => this.state.selectedItems.has(item.externalId);

	isItemDisabled = item => this.state.disabled.has(item.externalId);

	showAllCountries = () => {
		if (!ContentArena.Data.Countries || ContentArena.Data.Countries.length === 0) return;
		this.setState(prevState => ({
			prevCountries: new Map(prevState.selectorItems.map(i => [i.externalId, i])),
			selectorItems: [...ContentArena.Data.Countries, {
				country_code: "INT",
				id: 10000,
				name: "International",
				regions: [],
				territoryId: 0,
			}],
			customCountry: true,
		}));
	};

	filterLetter = (item) => {
		const filter = this.getActiveFilter();
		return filter.values.indexOf(item.name[0].toLowerCase()) !== -1;
	};

	filterInternational = item => item.name.match(/international/gi) !== null;

	getItems = () => {
		const filter = this.getActiveFilter();
		if (filter.type === "origin") {
			if (this.props[filter.value]) return this.props[filter.value];
			if (!this.shouldShowFilters()) return this.state.selectorItems;
			return this.state.selectorItems.filter(this.filterLetter);
		}

		if (filter.type === "international") return this.state.selectorItems.filter(this.filterInternational);
		if (filter.type === "firstLetter") {
			if (!this.shouldShowFilters()) return this.state.selectorItems;
			const filteredItems = this.state.selectorItems.filter(this.filterLetter);
			if (filteredItems.length === 0) return this.state.selectorItems;
			return filteredItems;
		}
	};

	getRightHeaderBtn = () => {
		const {
			showNewSeason, index, showNewSport, showAllCountries, showNewTournament,
		} = this.props;

		return (
			<React.Fragment>
				{showNewSport && (
					<button
						className="ca-btn yellow-border"
						onClick={() => {
							this.addNewSport(index);
						}}
					>
						<Translate i18nKey="CL_STEP1_SELECTOR_ADD_SPORT" />
					</button>
				)}

				{showNewSeason && (
					<button
						className="ca-btn yellow-border"
						onClick={() => {
							this.addNewSeason(index);
						}}
					>
						<Translate i18nKey="CL_STEP1_SELECTOR_ADD_SEASON" />
					</button>
				)}

				{showNewTournament && (
					<button
						className="ca-btn yellow-border"
						onClick={() => {
							this.addNewTournament(index);
						}}
					>
						<Translate i18nKey="CL_STEP1_SELECTOR_ADD_TOURNAMENT" />
					</button>
				)}

				{showAllCountries && (
					<button className="ca-btn yellow-border" onClick={this.showAllCountries}>
						<Translate i18nKey="CL_STEP1_SELECTOR_COUNTRIES_ALL" />
					</button>
				)}
			</React.Fragment>
		);
	};

	getModalTitle = () => {
		const { selectorType } = this.props;
		let title = "";

		switch (selectorType) {
		case "sports":
			title = <Translate i18nKey="CL_STEP1_SELECTOR_TITLE_SPORT" />;
			break;
		case "sportCategory":
			title = <Translate i18nKey="CL_STEP1_SELECTOR_TITLE_SPORT_CATEGORY" />;
			break;
		case "tournament":
			title = <Translate i18nKey="CL_STEP1_SELECTOR_TITLE_TOURNAMENT" />;
			break;
		case "seasons":
			title = <Translate i18nKey="CL_STEP1_SELECTOR_TITLE_SEASONS" />;
			break;
		default:
			title = "provide title for this case";
		}
		return <h3 className="modal-title">{title}</h3>;
	};

	getModalSubTitle = () => {
		const { selectorType } = this.props;
		let subTitle = "";

		switch (selectorType) {
		case "sports":
			subTitle = <Translate i18nKey="CL_STEP1_SELECTOR_SUB_TITLE_SPORT" />;
			break;
		case "sportCategory":
			subTitle = <Translate i18nKey="CL_STEP1_SELECTOR_SUB_TITLE_SPORT_CATEGORY" />;
			break;
		case "tournament":
			subTitle = <Translate i18nKey="CL_STEP1_SELECTOR_SUB_TITLE_TOURNAMENT" />;
			break;
		case "seasons":
			subTitle = <Translate i18nKey="CL_STEP1_SELECTOR_SUB_TITLE_SEASONS" />;
			break;
		default:
			subTitle = "provide sub title for this case";
		}
		return <p className="modal-sub-title">{subTitle}</p>;
	};

	render() {
		const { open } = this.props;

		return (
			<Modal
				isOpen={open}
				className="modal-wrapper wide"
				style={GenericModalStyle}
				onRequestClose={this.closeModal}
			>
				<header className="modal-header selection-header">
					<div className="title-left" style={{ maxWidth: "65%" }}>
						{this.getModalTitle()}
						{this.getModalSubTitle()}
					</div>
					<div className="title-right">
						<i className="fa fa-times close-icon" onClick={this.closeModal} />
					</div>
				</header>
				<section className="modal-body selection-body">
					<div className="navigation-section">
						<div style={{ width: "85%" }}>
							{this.shouldShowFilters() && (
								<React.Fragment>
									<button
										className={cn({ active: this.isFilterActive("ag") })}
										onClick={() => {
											this.setActiveFilter("ag");
										}}
									>
										A-G


									</button>
									<button
										className={cn({ active: this.isFilterActive("hn") })}
										onClick={() => {
											this.setActiveFilter("hn");
										}}
									>
										H-N


									</button>
									<button
										className={cn({ active: this.isFilterActive("ot") })}
										onClick={() => {
											this.setActiveFilter("ot");
										}}
									>
										O-T


									</button>
									<button
										className={cn({ active: this.isFilterActive("uz") })}
										onClick={() => {
											this.setActiveFilter("uz");
										}}
									>
										U-Z


									</button>
								</React.Fragment>
							)}

							{this.shouldShowInternationalFilter() && (
								<button
									className={cn({ active: this.isFilterActive("international") })}
									onClick={() => {
										this.setActiveFilter("international");
									}}
								>
									<Translate i18nKey="International" />
								</button>
							)}
							{this.props.popularItems && this.props.popularItems.length > 0 && (
								<button
									className={cn({ active: this.isFilterActive("popular") })}
									onClick={() => {
										this.setActiveFilter("popular");
									}}
								>
									<Translate i18nKey="Popular" />
								</button>
							)}
						</div>
						<div className="navigation-section-single-btn">
							{this.getRightHeaderBtn()}
						</div>
					</div>
					<div className="selector-content">
						{this.getItems().map((item, i) => (
							<SelectorItem
								key={`${item}-${i}`}
								label={item.name}
								onClick={() => this.selectItem(item)}
								selected={this.isItemSelected(item)}
								disabled={this.isItemDisabled(item)}
							/>
						))}
					</div>
				</section>
				<footer className="modal-footer">
					<button className="cancel-btn" onClick={this.closeModal}>
						<Translate i18nKey="CL_STEP1_SELECTOR_CANCEL" />
					</button>
					<button className="standard-button" onClick={this.applySelection} disabled={!this.state.updated}>
						<Translate i18nKey="CL_STEP1_SELECTOR_APPLY" />
					</button>
				</footer>
			</Modal>
		);
	}
}

const mapStateToProps = state => Object.assign({}, state.selector, {
	listing: state.content,
});

const mapDispatchToProps = dispatch => ({
	openSelector: () => dispatch({
		type: "OPEN_SELECTOR",
	}),
	closeSelector: () => dispatch({
		type: "CLOSE_SELECTOR",
	}),
	applySelection: (selectorType, selectedItems, multiple, index, clean) => dispatch({
		type: "APPLY_SELECTION",
		selectorType,
		selectedItems,
		multiple,
		index,
		clean,
	}),
	addNewSport: (index, clean) => dispatch({
		type: "ADD_NEW",
		index,
		selectorType: "sports",
		clean,
	}),
	addNewCategory: (index, clean) => dispatch({
		type: "ADD_NEW",
		index,
		selectorType: "sportCategory",
		clean,
	}),
	addNewTournament: (index, clean) => dispatch({
		type: "ADD_NEW",
		index,
		selectorType: "tournament",
		clean,
	}),
	addNewSeason: (index, clean, name) => dispatch({
		type: "ADD_NEW",
		index,
		name,
		selectorType: "seasons",
		clean,
	}),
});

SelectorModal.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SelectorModal);
