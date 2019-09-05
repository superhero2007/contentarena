import React from "react";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import CmsCollapsedPopup from "./CmsCollapsedPopup";
import { RIGHTS, SELLS, RIGHT_TYPE } from "@constants";

const CmsRightsLegend = ({ type }, context) => {
	const rights = RIGHTS.map(item => ({
		icon: <div className="gray-background">{item.code}</div>,
		text: <Translate i18nKey={item.translationKey} />,
	}));
	const items = SELLS.map(item => ({
		icon: item.icon,
		text: <Translate i18nKey={item.translationKey} />,
		type: item.type,
	}));

	let selectedItems;
	switch (type) {
	case RIGHT_TYPE.all:
		selectedItems = [...rights, ...items];
		break;
	case RIGHT_TYPE.sell:
		selectedItems = items;
		break;
	case RIGHT_TYPE.exclusive:
		selectedItems = items.filter(item => item.type === RIGHT_TYPE.exclusive);
		break;
	default:
		selectedItems = [...rights, ...items];
	}

	return (
		<div className="legend-box">
			<CmsCollapsedPopup
				title={<Translate i18nKey="CMS_LEGEND_TITLE" />}
				icon={<i className="fa fa-tag" />}
				toggle={false}
			>
				<div className={`legend-box-body ${type}`}>
					{selectedItems.map((item, index) => (
						<div className="legend-box-item" key={index}>
							<div className="icon">{item.icon}</div>
							<div className="text">{item.text}</div>
						</div>
					))}
				</div>
			</CmsCollapsedPopup>
		</div>
	);
};

CmsRightsLegend.contextTypes = {
	t: PropTypes.func.isRequired,
};

CmsRightsLegend.propTypes = {
	type: PropTypes.string,
};

CmsRightsLegend.defaultProps = {
	type: RIGHT_TYPE.all,
};

export default CmsRightsLegend;
