import React from 'react';
import {blueCheckIcon, yellowCheckIcon} from "./Icons";

const RightsList = ({rightsPackage}) => {
    return (
        <div className="rights-list">
            {rightsPackage.map(( sr,i )=>{
                return <div key={i}  className={"rights-list-item"}>
                    {!sr.exclusive &&
                    <img style={{width: 23, height: 22, margin: '0 5px'}} src={blueCheckIcon}/>}

                    {sr.exclusive &&
                    <img style={{width: 23, height: 22, margin: '0 5px'}} src={yellowCheckIcon}/>}

                    <div style={{display: 'flex', flexDirection: "row"  }}>
                        { sr.shortLabel !== "PR" && sr.name }
                        { sr.shortLabel === "PR" && content.PROGRAM_NAME &&
                        "Edited Program"
                        }
                    </div>
                </div>
            })}
        </div>
    );
};

export default RightsList;
