import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import cn from "classnames";
import CmsRightsFilter from "../components/CmsRightsFilter";
import CmsSeasonsFilter from "../components/CmsSeasonsFilter";
import CmsTerritoriesFilter from "../components/CmsTerritoriesFilter";
import ReactTable from "react-table";
import { getTerritories } from "../reducers/propertyFilters";
import { yellowCheckIcon } from "../../main/components/Icons";
import { RIGHT_STATUS } from "../../common/constants";


class RightsOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			selectedTerritories: new Map()
		};
	}

	componentWillReceiveProps(nextProps) {
		const { propertyFilters: { selectedTerritories, rights, regions } } = nextProps;
		if (this.props.propertyFilters.rights.length !== rights.length ||
			this.props.propertyFilters.regions.length !== regions.length ) this.setState({selectedTerritories});
	}

	getColumns = () => {

		const { propertyFilters: { seasons, rights, } } = this.props;

		let columns = [];

		columns.push({
			Header: this.context.t("CMS_RIGHTS_OVERVIEW_TABLE_HEADER_TERRITORY"),
			accessor: "name",
		});

		seasons.forEach(season => {
			rights.forEach((right, key, list) => {
				columns.push({
					headerClassName: "season-header-column",
					Header: props => {
						return (
							<div className="d-flex justify-content-center">
								{
									key === 0 &&
									<div className="season-header" style={{width: 40 * list.length}}>
										{season.year}
									</div>
								}
								<span>
									{right.code}
								</span>
							</div>

						)
					},
					Cell: props => (
						<div className="d-flex justify-content-center">
							<img src={yellowCheckIcon}/>
						</div>
					),
					maxWidth: 40
				})
			});
		});

		columns.push({
			Header: this.context.t("CMS_RIGHTS_OVERVIEW_TABLE_HEADER_LISTING"),
			Cell: props => (
				<div className="d-flex justify-content-center">
					1
				</div>

			)
		});

		columns.push({
			Header: this.context.t("CMS_RIGHTS_OVERVIEW_TABLE_HEADER_DEALS"),
			Cell: props => (
				<div className="d-flex justify-content-center">
					1
				</div>
			)
		});

		return columns;
	};

	setRightStatus = (rightStatus, checked) => {
		if (checked) this.setState({rightStatus});
	};

	render() {
		const {
			loading,
			selectedTerritories,
			rightStatus,
		} = this.state;

		const { property, common: { totalCountries } } = this.props;

		let territories = Array.from(selectedTerritories.values());

		return (
			<div className="region-filter">
				<CmsSeasonsFilter property={property}/>
				<CmsRightsFilter property={property}/>
				<CmsTerritoriesFilter property={property} />

				<div className="d-flex">
					<div className="split-filter">
						<div className="region-filter-title">
							{ this.context.t("CMS_STATUS_TITLE")}
						</div>
						<div className="regions">
							<input
								type="checkbox"
								checked={rightStatus === RIGHT_STATUS.AVAILABLE_RIGHTS}
								className="ca-checkbox blue"
								onChange={(e) => { this.setRightStatus(RIGHT_STATUS.AVAILABLE_RIGHTS, e.target.checked)}}
								id={RIGHT_STATUS.AVAILABLE_RIGHTS}
							/>
							<label
								className={cn({ selected: rightStatus === RIGHT_STATUS.AVAILABLE_RIGHTS })}
								htmlFor={RIGHT_STATUS.AVAILABLE_RIGHTS}
							>
								{this.context.t("CMS_STATUS_AVAILABLE_RIGHTS")}
							</label>
						</div>
					</div>
					<div className="split-filter">
						<div className="region-filter-title">
							{ this.context.t("CMS_RIGHT_LEGENDS_TITLE")}
						</div>
						<div className="regions">

							qwe
						</div>
					</div>
				</div>


				{
					territories.length > 0 &&
					<ReactTable
						showPageSizeOptions={false}
						showPagination={false}
						resizable={false}
						collapseOnPageChange={false}
						collapseOnDataChange={false}
						minRows={0}
						defaultPageSize={totalCountries}
						data={territories}
						select={this.props.select}
						className="ca-table"
						columns={this.getColumns()}
						sorted={[{
							id: 'name',
							desc: false
						}]}
					/>
				}
			</div>
		);
	}
}

RightsOverview.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		common: state.common,
		propertyFilters: state.propertyFilters,
	}
};

const mapDispatchToProps = dispatch => ({
	// updateProfile: profile => dispatch(updateProfile(profile)),
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(RightsOverview);
