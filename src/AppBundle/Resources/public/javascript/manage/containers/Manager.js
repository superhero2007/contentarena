import React from "react";
import { connect } from "react-redux";
import HeaderBar from "../../main/components/HeaderBar";
import Watchlist from "./Watchlist";
import ClosedDeals from "./ClosedDeals";
import PendingDeals from "./PendingDeals";
import ManageListings from "./ManageListings";
import CommercialActivity from "./CommercialActivity";
import Messages from "./Messages";
import Settings from "./Settings";

class Manager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: props.profile,
			tab: props.tab,
			user: props.user,
			mode: props.mode,
		};
	}

	render() {
		const {
			profile, tab, user, mode,
		} = this.state;
		const { company } = this.props;
		return (
			<div className="manager-container">
				<div className="manager-content">
					{tab === "WATCHLIST" && <Watchlist company={company} />}
					{tab === "CLOSED_DEALS" && <ClosedDeals />}
					{tab === "BIDS" && <PendingDeals mode={mode} />}
					{tab === "MANAGE_LISTINGS" && <ManageListings />}
					{tab === "COMMERCIAL_ACTIVITY" && <CommercialActivity />}
					{tab === "MESSAGES" && <Messages user={user} />}
					{tab === "SETTINGS" && <Settings />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => state;

const mapDispatchToProps = dispatch => ({});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Manager);
