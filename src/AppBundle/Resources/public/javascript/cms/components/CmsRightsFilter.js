import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import cloneDeep from "lodash/cloneDeep";
import Translate from "@components/Translator/Translate";
import { setRights } from "../actions/propertyFiltersActions";

class CmsRightsFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	componentDidMount() {
		this.selectAllRights();
	}

	handleChangeRight = (right) => {
		const rights = cloneDeep(this.props.propertyFilters.rights);

		const index = this.getRightIndex(right);

		if (index === -1) {
			rights.push(right);
		} else if (rights.length > 1) rights.splice(index, 1);

		this.props.setRights(rights);
	};

	selectAllRights = () => {
		this.props.setRights(cloneDeep(this.props.property.rights));
	};

	getRightIndex = right => this.props.propertyFilters.rights.findIndex(r => r.code === right.code);

	render() {
		const { property: { rights } } = this.props;

		return (
			<>
				<div className="region-filter-title">
					<Translate i18nKey="CMD_RIGHTS_OVERVIEW_RIGHTS" />
				</div>
				<div className="regions">
					{rights.map(right => (
						<button
							key={`right-${right.code}`}
							className={cn({
								region: true,
								"region-selected": this.getRightIndex(right) !== -1,
							})}
							onClick={() => {
								this.handleChangeRight(right);
							}}
						>
							{right.name}
						</button>
					))
					}
				</div>
			</>
		);
	}
}

CmsRightsFilter.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	propertyFilters: state.propertyFilters,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	setRights: rights => dispatch(setRights(rights)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CmsRightsFilter);
