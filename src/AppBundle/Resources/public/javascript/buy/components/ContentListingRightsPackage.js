import React from 'react';
import {blueCheckIcon, yellowCheckIcon, greyMinusIcon} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import unionBy from 'lodash/unionBy';
import {connect} from 'react-redux';
import cn from "classnames";

const ContentListingRightsPackage = ({defaultRightsPackage, rightsPackage}, context) => {

    let packages = unionBy(rightsPackage, defaultRightsPackage,  "id"); // overwrite defaultRightsPackage by user chosen rightsPackage
    packages = packages.sort((a,b) => a.id - b.id); //sort by id

    return (
        <div className="listing-rights col">
            {packages.slice(0,6).map((rp, i) => {
                let icon = '';

                if (rp.exclusive == null) {
                    icon = greyMinusIcon
                } else if (rp.exclusive){
                    icon = yellowCheckIcon
                } else {
                    icon = blueCheckIcon
                }

                return (
                    <div key={i} className="listing-item d-flex align-items-center">

                        <img src={icon}/>

                        <div className={cn("d-flex", {'disabled':rp.exclusive == null})}>
                            {rp.shortLabel === "PR" ? context.t("LISTING_DETAILS_EDITED_PROGRAM") : rp.name}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

ContentListingRightsPackage.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.common
};

export default connect(
    mapStateToProps
)(ContentListingRightsPackage)
