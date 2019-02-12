import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

const CaTooltip = (props) => {
    return (
        <div>
            {props.children}
            <ReactTooltip id={props.id} effect='solid' className='CaTooltip' delayHide={400}>
                <div className="head">
                    <i className={props.icon} />
                    {props.title}
                </div>
                <div className="body">
                    {props.data}
                </div>
            </ReactTooltip>
        </div>
    );
};

CaTooltip.propTypes = {};
CaTooltip.defaultProps = {};

export default CaTooltip;
