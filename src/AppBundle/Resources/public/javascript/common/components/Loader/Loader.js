import React from 'react';
import {PropTypes} from "prop-types";
import cn from 'classnames'

const Loader = ({loading, children, text, error, small}, context) => {
    if (error) {
        return <div>{error}</div>;
    } else if (loading) {
        return (
            <div className={'ca-loader'}>
                <div className={cn('spinner', {'small': small})}/>
                {!small && <b>{text ? text : context.t('LOADER_DEFAULT_TEXT')} ...</b>}
            </div>
        );
    } else if (children) {
        return children;
    }

    return null
};

Loader.contextTypes = {
    t: PropTypes.func.isRequired
};

export default Loader;