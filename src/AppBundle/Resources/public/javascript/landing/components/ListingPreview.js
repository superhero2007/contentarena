import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import Translate from "@components/Translator/Translate";
import Loader from "../../common/components/Loader";
import { ROUTE_PATHS } from "@constants";
import ContentListingRightsPackage from "../../buy/components/ContentListingRightsPackage";
import { getListingImage } from "../../common/utils/listing";

class ListingPreview extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			error: "",
			listing: null,
			isLoading: true,
		};
	}

	componentDidMount() {
		const { search } = this.props.history.location;
		const params = queryString.parse(search);

		if (!params || !params.listingId.trim()) {
			this.setState({
				error: "LISTING_PREVIEW_INVALID_LISTING_ID",
				isLoading: false,
			});
			return;
		}

		ContentArena.Api.getContentDetailForPreview(params.listingId).then(({ data }) => {
			if (data.success) {
				const { selectedRightsBySuperRight, rightsPackage } = data.listing;

				if (!isEmpty(selectedRightsBySuperRight)) {
					data.listing.rightsPackage = rightsPackage.map((right) => {
						right.exclusive = selectedRightsBySuperRight[right.id].exclusive;
						return right;
					});
				}

				this.setState({
					listing: data.listing,
					isLoading: false,
				});
			}
		})
			.catch(({ response }) => {
				this.setState({
					error: response.data.message,
					isLoading: false,
				});
			});
	}

	handleRegisterClick = () => this.props.history.push(ROUTE_PATHS.REGISTRATION);

	handleLoginClick = () => this.props.history.push(ROUTE_PATHS.LOGIN);

	getSeasons = () => {
		const { seasons } = this.state.listing;
		const filteredSeasons = seasons
			.filter(season => season.endDate || season.startDate) // filter invalid seasons
			.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
		return (
			<div className="seasons-wrapper">
				{filteredSeasons.map((season) => {
					const { endDate, startDate } = season;
					let { year } = season;
					if (!year) {
						const startY = moment(startDate).format("YY");
						const endY = moment(endDate).format("YY");
						year = startY === endY ? `${endY}` : `${startY}/${endY}`;
					}
					return (
						<span key={season.id} className="season-item">
							{`${year} (${moment(startDate).format("MMM YYYY")} - ${moment(endDate).format("MMM YYYY")})`}
						</span>
					);
				})}
			</div>
		);
	};

	render() {
		const { isLoading, listing, error } = this.state;
		return (
			<section className="sign-in-listing-preview-wrapper">
				<div className="big-title">
					<Translate i18nKey="SETTINGS_WELCOME" />
				</div>
				<div className="title">
					<Translate i18nKey="LISTING_PREVIEW_SUB_TITLE" />
				</div>
				{isLoading && <Loader loading={isLoading} />}
				{!isLoading && error
					&& (
						<section className="listing-details error">
							<span>
								<i className="fa fa-exclamation-triangle" />
								<Translate i18nKey={error} />
							</span>
							<button className="link-button" onClick={this.handleLoginClick}><Translate i18nKey="LISTING_PREVIEW_LOG_IN" /></button>
						</section>
					)
				}
				{listing && !isLoading && !error
					&& (
						<section className="listing-details">
							<div className="listing-img">
								<div className="image-wrapper">
									{listing.featured && (
										<div className="featured-badge">
											<span><Translate i18nKey="FEATURED_LISTING_BADGE_TEXT" /></span>
										</div>
									)}
									{getListingImage(listing)}
								</div>
							</div>
							<div className="listing-data">
								<div className="ca-title">{listing.name.toUpperCase()}</div>
								<div className="title"><Translate i18nKey="LISTING_PREVIEW_RIGHTS_TITLE" /></div>
								<div className="rights-wrapper">
									<ContentListingRightsPackage rightsPackage={listing.rightsPackage} />
								</div>
								{!!listing.seasons.length && (
									<Fragment>
										<div className="title"><Translate i18nKey="LISTING_PREVIEW_SEASONS_TITLE" /></div>
										{this.getSeasons()}
									</Fragment>
								)}
								{listing.description && (
									<Fragment>
										<div className="title"><Translate i18nKey="LISTING_PREVIEW_DESCRIPTION_TITLE" /></div>
										<textarea readOnly value={listing.description} />
									</Fragment>
								)}
								<footer className="buttons-wrapper">
									<button className="yellow-button" onClick={this.handleRegisterClick}><Translate i18nKey="LISTING_PREVIEW_REGISTER" /></button>
									<span className="login-wrapper">
										<span className="log-in-text"><Translate i18nKey="LISTING_PREVIEW_HAVE_ACCOUNT" /></span>
										<button className="link-button" onClick={this.handleLoginClick}><Translate i18nKey="LISTING_PREVIEW_LOG_IN" /></button>
									</span>
								</footer>
							</div>
						</section>
					)
				}
			</section>
		);
	}
}

ListingPreview.contextTypes = {
	t: PropTypes.func.isRequired,
};

ListingPreview.propsType = {
	onViewUpdate: PropTypes.func.isRequired,
};

export default ListingPreview;
