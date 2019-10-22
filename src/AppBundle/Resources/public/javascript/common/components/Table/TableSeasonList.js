import React, { Component } from "react";
import Translate from "@components/Translator/Translate";
import TableTooltip from "@components/Tooltips/TableTooltip";
import { sortSeasons } from "../../../cms/helpers/PropertyDetailsHelper";

class TableSeasonList extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		const {
			seasons,
			index,
			limit,
		} = this.props;

		seasons.sort(sortSeasons);

		return (
			<>
				{seasons.slice(0, limit).map(season => <span>{season.year}</span>)}

				{seasons.length > limit && (
					<TableTooltip
						text={<span>(+More)</span>}
						zIndex={9999 - index}
					>
						<>
							<div className="tools-list">
								<div className="tools-list-title">
									<i className="icon-season" />
									<Translate i18nKey="TABLE_SEASON_LIST_TITLE" />
								</div>
								<div className="tools-list-content">
									{seasons.map((season, i) => (
										<div className="tools-list-item" key={`season-${i}`}>
											{season.year}
										</div>
									))}
								</div>
							</div>
						</>
					</TableTooltip>
				)}
			</>
		);
	}
}

TableSeasonList.defaultProps = {
	seasons: [],
	limit: 2,
};

export default TableSeasonList;
