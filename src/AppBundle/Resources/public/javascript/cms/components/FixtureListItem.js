import React from "react";
import PropTypes from "prop-types";
import Moment from "moment/moment";
import Loader from "@components/Loader/Loader";
import Translate from "@components/Translator/Translate";
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

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ showEdit: nextProps.showEdit });
	}

	componentWillUnmount() {
		this.setState({ showLoading: false });
	}

	showEditFixture = () => this.setState({ showEdit: true });

	onRemoveFixture = (confirmed) => {
		this.setState({ showConfirmationTooltip: false });

		if (confirmed) {
			this.setState({ showLoading: true });
			this.props.onRemoveFixture();
		}
	};

	onSelectFixture = (e) => {
		if (e.target.checked) {
			this.props.onSelectFixture();
		} else {
			this.props.onUnselectFixture();
		}
	};

	render() {
		const { fixture, selected } = this.props;
		const {
			name = "Fixture name",
			round = "Round",
			date,
			time,
			timezone = "UTC",
		} = fixture;

		const {
			showConfirmationTooltip,
			showLoading,
			showEdit,
		} = this.state;

		return (
			<>
				{!showEdit && (
					<section className="fixture-item-wrapper">
						<label className="input-checkbox" style={{ marginRight: 15 }}>
							<input
								id="season-checkbox"
								type="checkbox"
								defaultChecked={selected}
								onClick={this.onSelectFixture}
							/>
							<span className="input-checkbox-selector" />
						</label>
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
									onClick={this.showEditFixture}
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
				)}

				{showEdit && (
					<FixtureForm
						onCancel={() => this.setState({ showEdit: false })}
						editMode
						onUpdate={this.props.onUpdateFixture}
						fixture={this.props.fixture}
					/>
				)}
			</>
		);
	}
}

FixtureListItem.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default FixtureListItem;
