import React from "react";
import PropTypes from "prop-types";
import Moment from "moment/moment";
import { getListingImage } from "../../common/utils/listing";
import PropertyListingTable from "./PropertyListingTable";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "@constants";
import { DATE_FORMAT, TIME_FORMAT, TIME_ZONE } from "../../common/constants";
import ConfirmationTooltip from "../../common/components/Tooltips/ConfirmationTooltip";
import FixtureForm from "./FixtureForm";

class FixtureListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showConfirmationTooltip: false,
			showEdit: false,
		};
	}

	onUpdateFixture = (fixture) => {
		const {
			onUpdateFixture,
		} = this.props;

		this.setState({ showEdit: false });
		onUpdateFixture(fixture);
	};

	onRemoveFixture = (confirmed) => {
		const {
			onRemoveFixture,
		} = this.props;

		this.setState({ showConfirmationTooltip: false });
		if (confirmed) onRemoveFixture();
	};

	render() {
		const {
			name = "Fixture name",
			round = "Round",
			date = new Date(),
		} = this.props;

		const {
			showConfirmationTooltip,
			showEdit,
		} = this.state;

		return (
			<>
				{
					showEdit
					&& (
						<FixtureForm
							fixture={{ round, name, date }}
							onUpdate={this.onUpdateFixture}
						/>
					)
				}
				{
					!showEdit
					&& (
						<section className="fixture-item-wrapper">
							<div className="fixture-item-round">
								{round}
							</div>
							<div className="fixture-item-name">
								{name}
							</div>
							<div className="fixture-item-date">
								<i className="fa fa-calendar" />
								{Moment(date).format(DATE_FORMAT)}
							</div>
							<div className="fixture-item-time">
								<i className="fa fa-clock-o" />
								{`${Moment(date).format(TIME_FORMAT)} ${TIME_ZONE}`}
							</div>
							<div className="fixture-item-actions">
								<i
									className="fa fa-edit"
									onClick={() => {
										this.setState({ showEdit: true });
									}}
								/>
								<i
									className="fa fa-trash"
									onClick={() => {
										this.setState({ showConfirmationTooltip: true });
									}}
								/>
							</div>
							<ConfirmationTooltip
								isOpen={showConfirmationTooltip}
								onConfirm={this.onRemoveFixture}
							/>
						</section>
					)
				}

			</>
		);
	}
}

FixtureListItem.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default FixtureListItem;
