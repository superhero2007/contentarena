import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import { setSeasons } from "../actions/propertyFiltersActions";

class CmsSeasonsFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		const {
			singleOption, setSeasons, property, propertyFilters: { seasons },
		} = this.props;
		if (singleOption) {
			if (property.seasons.length && !seasons.length) {
				setSeasons([property.seasons[0]]);
			} else {
				property.seasons.forEach((season) => {
					if (season.id === seasons[0].id) setSeasons([season]);
				});
			}
		} else {
			this.selectAllSeasons();
		}
	}

	handleChangeSeason = (season) => {
		const { singleOption, setSeasons, propertyFilters: { seasons = [] } } = this.props;
		const availableSeasons = cloneDeep(seasons);
		const index = this.getSeasonIndex(season);

		if (singleOption) {
			setSeasons([season]);
			return;
		}

		if (index === -1) {
			availableSeasons.push(season);
		} else if (availableSeasons.length > 1) availableSeasons.splice(index, 1);

		setSeasons(availableSeasons);
	};

	selectAllSeasons = () => {
		const { property: { seasons }, setSeasons } = this.props;
		setSeasons(JSON.parse(JSON.stringify(seasons)));
	};

	getSeasonIndex = season => this.props.propertyFilters.seasons.findIndex(r => r.id === season.id);

	render() {
		const { property: { seasons } } = this.props;

		return (
			<>
				<div className="region-filter-title">
					{
						<Translate i18nKey="CMD_RIGHTS_OVERVIEW_SEASONS" />
					}
				</div>
				<div className="regions">

					{seasons.length === 0 && (
						<button
							key="no-season"
							className="region"
							disabled
						>
							Not available
						</button>
					)}

					{seasons.map(season => (
						<button
							key={`season-${season.id}`}
							className={cn({
								region: true,
								"region-selected": this.getSeasonIndex(season) !== -1,
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
