import React from "react";
import PropTypes from "prop-types";
import Moment from "moment/moment";
import Loader from "@components/Loader/Loader";
import { DATE_FORMAT, TIME_FORMAT, TIME_ZONE } from "../../common/constants";
import ConfirmationTooltip from "../../common/components/Tooltips/ConfirmationTooltip";

class FixtureListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showConfirmationTooltip: false,
		};
	}

	onUpdateFixture = (fixture) => {
		const {
			onEditFixture,
		} = this.props;

		onEditFixture(fixture);
	};

	onRemoveFixture = (confirmed) => {
		const {
			onRemoveFixture,
		} = this.props;

		this.setState({
			showConfirmationTooltip: false,
		});

		if (confirmed) {
			this.setState({
				showLoading: true,
			});
			onRemoveFixture();
		}
	};

	render() {
		const {
			name = "Fixture name",
			round = "Round",
			date,
			time,
			timezone = "UTC",
		} = this.props;

		const {
			showConfirmationTooltip,
			showLoading,
		} = this.state;

		return (
			<section className="fixture-item-wrapper">
				<div className="fixture-item-round">
					{round}
					{!round && "-"}
				</div>
				<div className="fixture-item-name">
					{name}
				</div>
				<div className="fixture-item-date">
					{date && Moment(date).format(DATE_FORMAT)}
					{!date && "N/A"}
				</div>
				<div className="fixture-item-time">
					{time}
					{!time && "N/A"}
				</div>
				<div className="fixture-item-timezone">
					{date && timezone}
					{!date && "N/A"}
				</div>
				<div className="fixture-item-actions">
					{!showLoading && (
						<i
							className="icon-edit clickable"
							onClick={this.onUpdateFixture}
						/>
					)}
					{!showLoading && (
						<i
							className="icon-remove clickable"
							onClick={() => {
								this.setState({ showConfirmationTooltip: true });
							}}
						/>
					)}
					{showLoading && <Loader xSmall loading />}
				</div>
				<ConfirmationTooltip
					isOpen={showConfirmationTooltip}
					onConfirm={this.onRemoveFixture}
				/>
			</section>
		);
	}
}

FixtureListItem.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default FixtureListItem;
