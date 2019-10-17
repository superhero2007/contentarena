import React, { Component } from "react";
import Translate from "@components/Translator/Translate";
import TableTooltip from "@components/Tooltips/TableTooltip";

class TableTerritoryList extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		const {
			territories,
			index,
		} = this.props;

		return (
			<TableTooltip
				text={<span>{territories.length}</span>}
				zIndex={9999 - index}
			>
				<>
					<div className="tools-list">
						<div className="tools-list-title">
							<i className="icon-territories" />
							<Translate i18nKey="TABLE_TERRITORY_LIST_TITLE" />
						</div>
						<div className="tools-list-content">
							{territories.map((territory, i) => (
								<div className="tools-list-item" key={`territory-tooltip-${i}`}>
									{territory.name}
								</div>
							))}
						</div>
					</div>
				</>
			</TableTooltip>
		);
	}
}

TableTerritoryList.defaultProps = {
	territories: [],
};

export default TableTerritoryList;
