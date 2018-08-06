import React from 'react';
import {blueCheckIcon, yellowCheckIcon} from "../../main/components/Icons";

const ContentListingRightsPackage = ({rightsPackage, programName}) => {
    return (
        <div id="listing-rights" className="col">
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
                            "Program: " + programName
                            }
                            {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ContentListingRightsPackage;
