import React from "react";
import { PropTypes } from "prop-types";
import unionBy from "lodash/unionBy";
import { connect } from "react-redux";
import cn from "classnames";
import { SuperRightBoardLabels } from "../../sell/components/SuperRightDefinitions";
import { blueCheckIcon, yellowCheckIcon, greyMinusIcon } from "../../main/components/Icons";

const ContentListingRightsPackage = ({ defaultRightsPackage, rightsPackage, boardLabels }, context) => {
	let packages = unionBy(rightsPackage, defaultRightsPackage, "id"); // overwrite defaultRightsPackage by user chosen rightsPackage
	packages = packages.concat().sort((a, b) => a.id - b.id); // sort by id

	if (boardLabels) { // sort labels based on SuperRightBoardLabels order
		const order = Object.keys(SuperRightBoardLabels);
		packages = packages.concat().sort((a, b) => order.indexOf(a.shortLabel) - order.indexOf(b.shortLabel));
	}

	return (
		<div className="listing-rights col">
			{packages.slice(0, 6).map((rp, i) => {
				let icon = "";

				if (rp.exclusive == null) {
					icon = greyMinusIcon;
				} else if (rp.exclusive) {
					icon = yellowCheckIcon;
				} else {
					icon = blueCheckIcon;
				}

				return (
					<div key={i} className="listing-item d-flex align-items-center">

						<img src={icon} />

						<div className={cn("d-flex", { disabled: rp.exclusive == null })}>
							{boardLabels ? SuperRightBoardLabels[rp.shortLabel] : rp.name}
						</div>
					</div>
				);
			})}
		</div>
	);
};

ContentListingRightsPackage.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.common;

export default connect(
	mapStateToProps,
)(ContentListingRightsPackage);
