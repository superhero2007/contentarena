import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({id, text, icon}) => {
    return (
        <i className={icon ? icon : "ca-tooltip fa fa-info-circle"} data-for={id} data-tip={text}>
            <ReactTooltip id={id} place="top" type="dark" effect="solid"/>
        </i>
    );
};

export default Tooltip;