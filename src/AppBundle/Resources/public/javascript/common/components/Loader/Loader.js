import React from 'react';
import {PropTypes} from "prop-types";

const CaLoader = ({loading, children, text, error}, context) => {
    if (error) {
        return <div>{error}</div>;
    } else if (loading) {
        return (
            <div className={'ca-loader'}>
                <div className={'spinner'}/>
                <b>{text ? text : context.t('LOADER_DEFAULT_TEXT')} ...</b>
            </div>
        );
    }
    return children;
};

CaLoader.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CaLoader;