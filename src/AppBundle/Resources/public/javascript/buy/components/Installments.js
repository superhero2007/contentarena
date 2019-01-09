import React from 'react';
import PropTypes from 'prop-types';
import CaTooltip from '../../main/components/CaTooltip';
import uniqueId from 'lodash/uniqueid';
import Moment from "moment/moment";
import { DATE_FORMAT } from "@constants";
import {pdfIcon} from "../../main/components/Icons";

const Installments = ({installments},context) => {
    const tooltipId = uniqueId();
    const ordinal_suffix_of = (i) => {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    };
    return (
        <div className="Installments">
            <CaTooltip
                id={tooltipId}
                title="Payments details"
                icon="fa fa-money"
                data={
                    installments && installments.map(( installment, index ) =>(
                        <div className={"payment"} key={"payment"+index}>
                            <div>
                                <b>
                                    { ordinal_suffix_of(index+1)} installment
                                </b>
                            </div>
                            <div>
                                {installment.value}%
                            </div>
                            <div className="info">
                                {installment.type === "DAY" && installment.days + context.t("INSTALLMENT_CLOSURE_DAYS")}
                                {installment.type === "DATE" && " " + Moment(installment.date).format(DATE_FORMAT)}
                            </div>
                        </div>
                    ))
                }>
                <a data-tip data-for={tooltipId}>
                    <i className="fa fa-money"/> {context.t("PAYMENT")}
                </a>
            </CaTooltip>
        </div>
    );
};
Installments.contextTypes = {
    t: PropTypes.func.isRequired
};
Installments.propTypes = {};
Installments.defaultProps = {};

export default Installments;
