import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { goTo } from "../../main/actions/utils";
import ContentListing from "../../main/components/ContentListing";
import RightsLegend from "../../main/components/RightsLegend";
import Loader from "../../common/components/Loader";

class PendingDeals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			loadingDeclined: false,
			bids: [],
			declinedBids: [],
			tab: props.match.params.tab || "activebids",

		};
		this.bulletIcon = `${assetsBaseDir}app/images/bullet.png`;
		this.activeBulletIcon = `${assetsBaseDir}app/images/active_bullet.png`;
	}

	componentDidMount() {
		this.update();
	}

	selectListing = (id) => {
		goTo(`listing/${id}`, true);
	};

	update = () => {
		const _this = this;
		this.setState({ loading: true, loadingDeclined: true });
		ContentArena.ContentApi.getPendingDeals().done((bids) => {
			bids.map((bid) => {
				bid.content = ContentArena.Utils.contentParserFromServer(bid.content);
			});
			_this.setState({ bids, loading: false });
		});

		ContentArena.ContentApi.getRejectedDeals().done((declinedBids) => {
			declinedBids.map((bid) => {
				declinedBids.content = ContentArena.Utils.contentParserFromServer(bid.content);
			});
			_this.setState({ declinedBids, loadingDeclined: false });
		});
	};

	deleteBid = (id) => {
		ContentArena.ContentApi.removeBid({ id }).done(() => {
			this.update();
		});
	};

	remove = (customId) => {
		this.setState({
			bids: this.state.bids.filter(l => l.customId !== customId),
		});
	};

	render() {
		const {
			loading, bids, tab, declinedBids, loadingDeclined,
		} = this.state;
		const { history } = this.props;

		return (
			<div className="section-container">
				<div style={{
					display: "flex",
					padding: "0 0 20px",
					color: "#4F4F4F",
					fontSize: 18,
					fontWeight: 600,
				}}
				>
					<div style={{ margin: "0 20px" }}>Bids</div>
					<div
						style={{
							margin: "0 20px", cursor: "pointer", display: "flex", alignItems: "center",
						}}
						onClick={() => {
							history.push("/bids/activebids");
						}}
					>
						{tab === "activebids" && <img style={{ margin: "0px 10px 0px" }} src={this.activeBulletIcon} alt="" />}
						{tab !== "activebids" && <img style={{ margin: "0px 10px 0px" }} src={this.bulletIcon} alt="" />}
						{this.context.t("PENDING_BIDS_FILTER_ACTIVE")}
					</div>
					<div
						style={{
							margin: "0 20px", cursor: "pointer", display: "flex", alignItems: "center",
						}}
						onClick={() => {
							history.push("/bids/declinedbids");
						}}
					>
						{tab === "declinedbids" && <img style={{ margin: "0px 10px 0px" }} src={this.activeBulletIcon} alt="" />}
						{tab !== "declinedbids" && <img style={{ margin: "0px 10px 0px" }} src={this.bulletIcon} alt="" />}
						{this.context.t("PENDING_BIDS_FILTER_DECLINED")}
					</div>
					<div style={{ marginLeft: "auto" }}>
						<RightsLegend />
					</div>
				</div>

				{tab === "activebids" && (
					<Loader loading={loading}>
						{bids.length > 0 ? (
							bids.map((bid, i) => (
								<ContentListing
									onSelect={this.selectListing}
									onDelete={this.deleteBid}
									key={`${i}-${bid.content.customId}`}
									bid={bid}
									{...bid.content}
								/>
							))
						) : (
							<div className="manager-content-message">
								{this.context.t("PENDING_BIDS_MADE_EMPTY_MESSAGE")}
							</div>
						)}
					</Loader>
				)}
				{tab === "declinedbids" && (
					<Loader loading={loadingDeclined}>
						{declinedBids.length > 0 ? (
							declinedBids.map((bid, i) => (
								<ContentListing
									onSelect={this.selectListing}
									onDelete={this.deleteBid}
									key={`${i}-${bid.content.customId}`}
									bid={bid}
									checkExpired
									declined
									{...bid.content}
								/>
							))
						) : (
							<div className="manager-content-message">
								{this.context.t("PENDING_BIDS_MADE_DECLINED_EMPTY_MESSAGE")}
							</div>
						)}
					</Loader>
				)}

			</div>
		);
	}
}

PendingDeals.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(PendingDeals);
