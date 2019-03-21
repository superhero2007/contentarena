import React from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import Moment from "moment/moment";
import CaTooltip from "../../main/components/CaTooltip";
import { DATE_FORMAT } from "@constants";

const Installments = ({ installments }, context) => {
	const tooltipId = uniqueId();
	const ordinalSuffixOf = (i) => {
		const j = i % 10;
		const k = i % 100;
		if (j === 1 && k !== 11) {
			return `${i}st`;
		}
		if (j === 2 && k !== 12) {
			return `${i}nd`;
		}
		if (j === 3 && k !== 13) {
			return `${i}rd`;
		}
		return `${i}th`;
	};
	return (
		<div className="Installments">
			<CaTooltip
				id={tooltipId}
				title="Payments details"
				icon="fa fa-money"
				data={
					installments && installments.map((installment, index) => (
						<div className="payment" key={`payment${index}`}>
							<div>
								<b>
									{ordinalSuffixOf(index + 1)}
									{" "}
                                    installment


								</b>
							</div>
							<div>
								{installment.value}
                                %


							</div>
							<div className="info">
								{installment.type === "DAY" && installment.days + context.t("INSTALLMENT_CLOSURE_DAYS")}
								{installment.type === "DATE" && ` ${Moment(installment.date).format(DATE_FORMAT)}`}
							</div>
						</div>
					))
				}
			>
				<a data-tip data-for={tooltipId}>
					<i className="fa fa-money" />
					{" "}
					{context.t("PAYMENT")}
				</a>
			</CaTooltip>
		</div>
	);
};
Installments.contextTypes = {
	t: PropTypes.func.isRequired,
};
Installments.propTypes = {};
Installments.defaultProps = {};

export default Installments;
