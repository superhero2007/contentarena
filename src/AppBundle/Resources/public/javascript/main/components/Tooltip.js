import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = (props) => {
    return (
        <i className="fa fa-info-circle ca-tooltip" data-for={props.id} data-tip={props.text}>
            <ReactTooltip id={props.id} place="top" type="dark" effect="solid"/>
        </i>
    );
};

export default Tooltip;