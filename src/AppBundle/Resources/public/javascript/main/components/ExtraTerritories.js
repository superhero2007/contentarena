import React from 'react';
import PropTypes from 'prop-types';
import CaTooltip from './CaTooltip';
import uniqueId from 'lodash/uniqueid';

const ExtraTerritories = ({extraTerritories}) => {
    const tooltipId = uniqueId();
    return (
        <div className="ExtraTerritories">
            <CaTooltip
                id={tooltipId}
                title="Territories Included"
                icon="fa fa-globe"
                data={
                    extraTerritories.map((territory, i) => (
                        <div className="country" key={'country_' + i}>
                            {territory.label && territory.label}
                            {territory.name && territory.name}
                        </div>
                    ))
                }>
                <a data-tip data-for={tooltipId}>
                    {"+" + (extraTerritories.length - 3)}
                </a>
            </CaTooltip>
        </div>
    );
};

ExtraTerritories.propTypes = {};
ExtraTerritories.defaultProps = {};

export default ExtraTerritories;

