import React from 'react';
import {blueCheckIcon, yellowCheckIcon} from "../../main/components/Icons";
import {PropTypes} from "prop-types";

const ContentListingRightsPackage = ({rightsPackage, programName}, context) => {
    return (
        <div className="listing-rights col">
            {rightsPackage.map((sr, i) => {
                return (
                    <div key={i} className="listing-item">
                        {!sr.exclusive &&
                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={blueCheckIcon}/>}

                        {sr.exclusive &&
                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={yellowCheckIcon}/>}

                        <div style={{display: 'flex', flexDirection: "row"}}>
                            {sr.shortLabel !== "PR" && sr.name}
                            {sr.shortLabel === "PR" && programName &&
                            context.t("Program: ") + programName
                            }
                            {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
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
