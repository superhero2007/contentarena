import React from 'react';
import {blueCheckIcon, yellowCheckIcon, greyMinusIcon} from "../../main/components/Icons";
import {PropTypes} from "prop-types";

const ContentListingRightsPackage = ({rightsPackage}, context) => {
    return (
        <div className="listing-rights col">
            {rightsPackage.map((rp, i) => {
                let icon = '';

                if (rp.exclusive == null) {
                    icon = greyMinusIcon
                } else if (rp.exclusive){
                    icon = yellowCheckIcon
                } else {
                    icon = blueCheckIcon
                }

                return (
                    <div key={i} className="listing-item">

                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={icon}/>

                        <div style={{display: 'flex', flexDirection: "row"}}>
                            {rp.shortLabel === "PR" ? context.t("Edited Program") : rp.name}
                            {rp.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
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

export default ContentListingRightsPackage;
