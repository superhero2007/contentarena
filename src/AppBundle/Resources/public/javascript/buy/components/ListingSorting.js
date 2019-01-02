import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { LISTING_SORT_OPTIONS } from "@constants";

class ListingSorting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getTranslatedLabels = () => ({
        [LISTING_SORT_OPTIONS.UPCOMING_EVENT]: this.context.t('MARKETPLACE_UPCOMING'),
        [LISTING_SORT_OPTIONS.EXPIRY_DATE]: this.context.t('MARKETPLACE_EXPIRY'),
        [LISTING_SORT_OPTIONS.EVENT_DATE]: this.context.t('MARKETPLACE_EVENT_DATE'),
        [LISTING_SORT_OPTIONS.PUBLISH_DATE]: this.context.t('MARKETPLACE_PUBLISH')
    });

    render() {
        const sortOptions = Object.keys(LISTING_SORT_OPTIONS).map((key) => LISTING_SORT_OPTIONS[key]);
        const labels = this.getTranslatedLabels();

        return <div className="sort-by-wrapper">
            <span className="sort-by-title">Sort By</span>

            {sortOptions.map(sortItem => {
                return <Fragment>
                    <input className="ca-radio"
                           id={sortItem}
                           type="radio"
                           onChange={ e => { this.props.onSelect(sortItem)}}
                           checked={ sortItem === this.props.sortBy }
                    />
                    <label htmlFor={sortItem}>{labels[sortItem]}</label>
                </Fragment>;
            })}
        </div>;
    }
};

ListingSorting.contextTypes = {
    t: PropTypes.func.isRequired
};

ListingSorting.propTypes  = {
    sortBy: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};
ListingSorting.defaultProps = {};

export default ListingSorting;