import React from 'react';
import PropTypes from 'prop-types';
import {blueCheckIcon, yellowCheckIcon, greyMinusIcon} from "../../main/components/Icons";

const RightsLegend = (props, context) => {
    return (
        <div className="RightsLegend">
            <div className="item">
                <img className="icon" src={yellowCheckIcon} alt=""/>
                <span className="name">
                    {context.t("Exclusive")}
                </span>
            </div>
            <div className="item">
                <img className="icon" src={blueCheckIcon} alt=""/>
                <span className="name">
                    {context.t("Non exclusive")}
                </span>
            </div>
            <div className="item">
                <img className="icon" src={greyMinusIcon} alt=""/>
                <span className="name">
                    {context.t("Non included")}
                </span>
            </div>
        </div>
    );
};

RightsLegend.contextTypes = {
    t: PropTypes.func.isRequired
};


export default RightsLegend;
