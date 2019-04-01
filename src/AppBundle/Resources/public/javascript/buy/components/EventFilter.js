import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import uniqBy from "lodash/uniqBy";
import { updateEvent, updateSport, showAllFilters } from "../actions/filterActions";
import { searchIcon } from "../../main/components/Icons";
import localStorageEnums from "../../main/constants/localStorageEnums";

class EventFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sports: [],
			checkedSports: this.getActiveSport(),
		};

		this.searchIcon = searchIcon;
	}

	componentWillUnmount() {
		this.isCancelled = true;
	}

	componentDidMount() {
		if (ContentArena.Data.ActiveSports.length === 0) {
			ContentArena.Api.getActiveSports()
				.done((sports) => {
					ContentArena.Data.ActiveSports = sports;
					!this.isCancelled && this.setState({ sports });
				});
		} else {
			!this.isCancelled && this.setState({ sports: ContentArena.Data.ActiveSports });
		}

		this.syncPropsWithLocalStorage();
	}

	syncPropsWithLocalStorage() {
		const sports = localStorage.getItem(localStorageEnums.SPORTS) && JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));
		if (sports && sports.label !== this.props.sport.label) {
			this.props.selectSport(sports);
		}
	}

	getFilters = () => {
		const { sports } = this.state;

		return sports
			.filter(s => s.name)
			.map(i => ({
				value: i.name,
				label: i.name,
			}))
			.sort((a, b) => a.label.localeCompare(b.label))
			.sort((a, b) => (a.label === "Soccer" ? -1 : b.label === "Soccer" ? 1 : 0));
	};

	showTab = (tab) => {
		this.setState({ tab });
	};

	setSport = (sports) => {
		localStorage.setItem(localStorageEnums.SPORTS, JSON.stringify(sports));
		this.props.selectSport(sports);

		this.setState({
			checkedSports: sports,
		});
	};

	onSelectSport = (e, selectedSport) => {
		const { checked } = e.target;
		const { checkedSports } = this.state;

		if (checked) {
			selectedSport.value
				? this.setSport(uniqBy([...checkedSports, selectedSport], "value"))
				: this.setSport([]);
		} else {
			this.setSport([...checkedSports.filter(e => e.value !== selectedSport.value)]);
		}

		this.handleFilter();
	};

	updateEvent = () => {
		this.props.updateEvent(this.refs.search_field.value);
	};

	handleFilter = () => {
		this.props.onFilter();
	};

	handleKeyPress = (e) => {
		if (e.key === "Enter") {
			this.handleFilter();
		}
	};

	getActiveSport = () => {
		const sportFromStorage = localStorage.getItem(localStorageEnums.SPORTS)
			&& JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));
		const sportValue = sportFromStorage || this.props.sport;
		return sportValue;
	};

	isSportChecked = (sp) => {
		const { checkedSports } = this.state;
		if (checkedSports.length === 0 && sp.value === null) {
			return true;
		}
		return checkedSports.some(s => s.value === sp.value);
	};

	render() {
		const { event, allFilters } = this.props;
		return (
			<div>
				<div className="box">
					<div
						className="search-btn"
						onClick={this.handleFilter}
					>
						<img src={this.searchIcon} alt="" />
					</div>
					<input
						className="search-input ca-form-control"
						value={event}
						onKeyPress={this.handleKeyPress}
						onChange={this.updateEvent}
						ref="search_field"
						type="text"
						id="inputSearch"
						name="event"
						placeholder={this.context.t("Search", {}, "Marketplace - Placeholder for Search input")}
					/>
				</div>
				<div className="box">
					<div className="title">
						{this.context.t("MARKETPLACE_LABEL_FILTER_SPORT")}
					</div>
					{this.getFilters()
						.slice(0, allFilters ? this.getFilters().length : 5)
						.map(sp => (
							<div style={{ margin: "7px 0 " }} key={sp.label}>
								<label className="d-flex">
									<input
										type="checkbox"
										onChange={e => this.onSelectSport(e, sp)}
										className="ca-checkbox checkbox-item"
										defaultChecked={this.isSportChecked(sp)}
									/>
									<span>{sp.label}</span>
								</label>
							</div>
						))}
					{this.getFilters().length > 5 && (
						<>
							<hr />
							<div className="text-center">
								<a onClick={() => this.props.showAllFilters(!allFilters)}>
									{allFilters ? (
										this.context.t("SEE_LESS")
									) : (
										this.context.t("SEE_ALL")
									)}
								</a>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
}

EventFilter.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.filter;

const mapDispatchToProps = dispatch => ({
	onClick: id => dispatch(test(id)),
	selectSport: sport => dispatch(updateSport(sport)),
	updateEvent: event => dispatch(updateEvent(event)),
	showAllFilters: bool => dispatch(showAllFilters(bool)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EventFilter);
