import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import { setSeasons } from "../actions/propertyFiltersActions";
import cloneDeep from "lodash/cloneDeep";

class CmsSeasonsFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		this.selectAllSeasons();
	}

	handleChangeSeason = (season) => {

		let seasons = cloneDeep(this.props.propertyFilters.seasons);

		const index = this.getSeasonIndex(season);

		if (index === -1){
			seasons.push(season);
		} else {
			if (seasons.length > 1) seasons.splice(index, 1);
		}

		this.props.setSeasons(seasons);

	};

	selectAllSeasons = () => {
		const { property: { seasons }, setSeasons } = this.props;
		setSeasons(JSON.parse(JSON.stringify(seasons)));
	};

	getSeasonIndex = (season) => this.props.propertyFilters.seasons.findIndex(r => r.id === season.id);

	render() {

		const { property: { seasons } } = this.props;

		return (
			<>
				<div className="region-filter-title">
					{
						this.context.t("CMD_RIGHTS_OVERVIEW_SEASONS")
					}
				</div>
				<div className="regions">
					{seasons.map(season => (
						<button
							key={`season-${season.id}`}
							className={cn({
								region: true,
								"region-selected": this.getSeasonIndex(season) !== -1
							})}
							onClick={() => {
								this.handleChangeSeason(season);
							}}
						>
							{season.name}
						</button>
					))
					}
				</div>
			</>
		);
	}
}

CmsSeasonsFilter.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	propertyFilters: state.propertyFilters,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	setSeasons: seasons => dispatch(setSeasons(seasons)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsSeasonsFilter);
