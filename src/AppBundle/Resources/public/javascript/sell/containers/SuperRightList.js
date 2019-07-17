import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import RightDefaults from "../components/RightDefaults";
import { updateContentValue } from "../actions/contentActions";
import { SuperRightDefinitions } from "../components/SuperRightDefinitions";
import RightDefaultsBySuperRight from "../components/RightDefaultsBySuperRight";

class SuperRightList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			packages: this.parsePackages(props.packages),
			rightsPackage: new Map(),
			offers: {
				EXCLUSIVE: "exclusive",
				NON_EXCLUSIVE: "non-exclusive",
			},
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			rightsPackage: new Map(nextProps.rightsPackage.map(rightItem => [rightItem.id, rightItem])),
		});
	}

	addRight = (superRight) => {
		const { rightsPackage } = this.state;

		if (!rightsPackage.has(superRight.id)) {
			rightsPackage.set(superRight.id, {
				...superRight,
				exclusive: "",
			});
			this.props.superRightsUpdated(rightsPackage);
		}
	};

	removeRight = (superRight) => {
		const { rightsPackage } = this.state;

		if (rightsPackage.has(superRight.id)) {
			rightsPackage.delete(superRight.id);
			this.props.superRightsUpdated(rightsPackage);
		}
	};

	onExclusive = (superRight, exclusive) => {
		const { rightsPackage } = this.state;
		const { superRightsUpdated } = this.props;
		let rightPackageItem = rightsPackage.get(superRight.id);

		if (rightPackageItem.exclusive === exclusive) return;

		rightPackageItem = {
			...rightPackageItem,
			exclusive,
		};
		rightsPackage.set(superRight.id, rightPackageItem);
		superRightsUpdated(rightsPackage);
	};

	parsePackages(packages) {
		return JSON.parse(packages)
			.map((pItem) => {
				pItem.selectedRights = Object.assign({}, RightDefaults);
				if (RightDefaultsBySuperRight[pItem.shortLabel] !== undefined) {
					pItem.selectedRights = Object.assign({},
						pItem.selectedRights,
						RightDefaultsBySuperRight[pItem.shortLabel]);
				}

				return pItem;
			});
	}

	isCheckBoxChecked = (id) => {
		const { rightsPackage } = this.state;
		return rightsPackage.has(id);
	};

	getRadioBoxValue = (id) => {
		const { rightsPackage, offers } = this.state;
		const superRight = rightsPackage.get(id);
		return superRight && superRight.exclusive !== "" ? (superRight.exclusive ? offers.EXCLUSIVE : offers.NON_EXCLUSIVE) : "";
	};

	isInputBoxDisabled = (id) => {
		const { rightsPackage } = this.state;
		return !rightsPackage.has(id);
	};

	hasSalesPackagesSold = () => {
		const { salesPackages } = this.props;
		return salesPackages.some(salesPackage => salesPackage.sold);
	};

	render() {
		const hasSoldAnyPackage = this.hasSalesPackagesSold();
		const { validation, rightsPackage } = this.props;
		const isInvalid = (!rightsPackage.length || rightsPackage.filter(element => element.exclusive === "").length) && validation;

		return (
			<div className="right-selector package-selector">
				<header>
					<Translate i18nKey="CL_STEP2_RIGHTS_TITLE" />
				</header>

				<div className="right-description">
					<Translate i18nKey="CL_STEP2_RIGHTS_TEXT" />
				</div>

				{hasSoldAnyPackage && (
					<div className="right-error-message">
						<Translate i18nKey="CL_STEP2_RIGHTS_ERROR_MESSAGE" />
					</div>
				)}

				<div className={`package-selector-container ${isInvalid ? "is-invalid" : ""}`}>
					<ReactTable
						minRows={0}
						resizable={false}
						showPageSizeOptions={false}
						noDataText={null}
						showPagination={false}
						className="ca-table right-selection-table"
						data={this.state.packages}
						columns={[
							{
								Header: <Translate i18nKey="RIGHT_SELECTION_AUDIO_VISUAL" />,
								headerClassName: "table-right-selection-header",
								width: 200,
								Cell: (props) => {
									const { name, shortLabel, id } = props.original;
									const idAttr = `checkbox-${shortLabel}`;
									return (
										<React.Fragment>
											<input
												type="checkbox"
												checked={this.isCheckBoxChecked(id)}
												className="ca-checkbox"
												onChange={(e) => {
													e.target.checked
														? this.addRight(props.original)
														: this.removeRight(props.original);
												}}
												id={idAttr}
											/>
											<label htmlFor={idAttr}>{name}</label>
										</React.Fragment>
									);
								},
							}, {
								Header: <Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVELY" />,
								headerClassName: "table-right-selection-header",
								width: 250,
								Cell: (props) => {
									const { shortLabel, id } = props.original;
									const { offers } = this.state;
									const exclusiveIdAttr = `exc-id-${shortLabel}`;
									const nonExclusiveIdAttr = `non-exc-id-${shortLabel}`;
									const offerValue = this.getRadioBoxValue(id);
									const isDisabled = hasSoldAnyPackage || this.isInputBoxDisabled(id);

									return (
										<React.Fragment>
											<input
												type="radio"
												checked={offerValue === offers.EXCLUSIVE}
												onChange={() => {
													this.onExclusive(props.original, true);
												}}
												id={exclusiveIdAttr}
												disabled={isDisabled}
												className="ca-radio in-yellow"
											/>
											<label
												htmlFor={exclusiveIdAttr}
											>
												<Translate i18nKey="RIGHT_SELECTION_OFFER_EXCLUSIVE" />
											</label>
											<input
												type="radio"
												checked={offerValue === offers.NON_EXCLUSIVE}
												onChange={() => {
													this.onExclusive(props.original, false);
												}}
												id={nonExclusiveIdAttr}
												disabled={isDisabled}
												className="ca-radio in-yellow"
											/>
											<label
												htmlFor={nonExclusiveIdAttr}
											>
												<Translate i18nKey="RIGHT_SELECTION_OFFER_NON_EXCLUSIVE" />
											</label>
										</React.Fragment>
									);
								},
							}, {
								Header: <Translate i18nKey="SALES_PACKAGE_TABLE_DEFINITION" />,
								headerClassName: "table-right-selection-header",
								Cell: (props) => {
									const { id, shortLabel } = props.original;
									const defByLabel = SuperRightDefinitions[shortLabel] || [];
									const inputData = defByLabel[1];

									return (
										<p>
											<Translate i18nKey={`CL_STEP2_RIGHT_DEFINITIONS_${shortLabel}`} />
											{inputData && (
												<input
													type="number"
													onChange={(e) => {
														this.props.updateContentValue(inputData.key, Number(e.target.value));
													}}
													value={this.props[inputData.key]}
													disabled={this.isInputBoxDisabled(id)}
												/>
											)}
											{defByLabel[2] && <Translate i18nKey={`CL_STEP2_RIGHT_DEFINITIONS_${shortLabel}_2`} />}
										</p>
									);
								},
							},
						]}
					/>
				</div>
			</div>
		);
	}
}

SuperRightList.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	...state.content,
	validation: state.validation,
});

const mapDispatchToProps = dispatch => ({
	superRightsUpdated: rightsPackage => dispatch({
		type: "SUPER_RIGHTS_UPDATED",
		rightsPackage,
	}),
	updateContentValue: (k, v) => dispatch(updateContentValue(k, v)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SuperRightList);
