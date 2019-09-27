import React from "react";
import Translate from "@components/Translator/Translate";
import { BaseFilter } from "@components/Filters/index";
import { sortByName } from "../../../cms/helpers/PropertyDetailsHelper";

class CmsListingFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			options,
			value,
			onChange,
		} = this.props;

		const filtered = options.filter(option => option.name);
		filtered.sort(sortByName);

		return (
			<BaseFilter
				name={<Translate i18nKey="SEASON_LISTING_NAME" />}
				options={filtered}
				value={value}
				className="big-dropdown-container"
				placeholder={<Translate i18nKey="LISTING_FILTER_PLACEHOLDER" />}
				multiText={<Translate i18nKey="LISTING_FILTER_MULTIPLE" />}
				onChange={onChange}
			/>
		);
	}
}

export default CmsListingFilter;
