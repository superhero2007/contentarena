import React from "react";
import { PropTypes } from "prop-types";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import Moment from "moment/moment";
import ListingLink from "@components/Links/ListingLink";
import Translate from "@components/Translator/Translate";
import { LISTING_STATUS, DATE_FORMAT } from "@constants";
import TableTooltip from "@components/Tooltips/TableTooltip";
import { UserName } from "@utils/listing";
import TableSeasonList from "@components/Table/TableSeasonList";
import TableTerritoryList from "@components/Table/TableTerritoryList";
import { TIME_FORMAT } from "../../common/constants";
import { getRightTableColumns } from "../helpers/PropertyHelper";
import PropertyActionListing from "../../manage/components/PropertyActionListing";
import { getTerritoriesFromListing } from "../helpers/PropertyDetailsHelper";

class CmsListingOverviewTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			listings: [],
		};
	}

	componentDidMount() {
		const { listings } = this.props;
		this.setState({ listings });
	}

	componentWillReceiveProps(newProps) {
		const { listings } = newProps;
		this.setState({ listings });
	}

	getHeader = (text, tooltip = "") => (
		<span data-tip={tooltip && tooltip}>
			{text && text}
		</span>
	);

	getCell = (props) => {
		const { value, original } = props;
		const { customId } = original;

		return (
			<ListingLink customId={customId} name={value}>
				{value}
			</ListingLink>
		);
	};

	getInfoColumns = () => [{
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_ID" />,
		id: props => `custom-id-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		accessor: "customId",
		width: 80,
		Cell: props => (
			<span>
				{props.value}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_NAME" />,
		id: props => `listing-name-${props.customId}-${props.index}`,
		headerClassName: "rt-th-name",
		className: "rt-td-name",
		accessor: "name",
		Cell: props => this.getCell(props),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_SEASONS" />,
		id: props => `seasons-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		accessor: "seasons",
		width: 70,
		Cell: props => <TableSeasonList index={props.index} seasons={props.value} limit={3} />,
	}];

	getActionColumns = () => [{
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_EXPIRY" />,
		id: props => `expiry-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		accessor: "expiresAt",
		width: 100,
		Cell: props => (
			<span>
				{Moment(props.value).format(DATE_FORMAT)}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_LISTING_OVERVIEW_TABLE_TERRITORIES" />,
		id: props => `ter-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 130,
		Cell: props => <TableTerritoryList index={props.index} territories={getTerritoriesFromListing(props.original)} />,
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_USER" />,
		id: props => `user-${props.customId}-${props.index}`,
		headerClassName: "rt-th-center",
		className: "rt-td-center",
		width: 48,
		accessor: "owner",
		Cell: props => (
			<TableTooltip
				icon={<i className="fa fa-user" />}
				zIndex={9999 - props.index}
			>
				<>
					<div className="tools-action">
						<span className="tools-action-title">
							<Translate i18nKey="MANAGE_LISTINGS_LISTING_OWNER" />
						</span>
						<span>
							{props.original.owner && <UserName {...props.original.owner} />}
							{!props.original.owner && "-"}
						</span>
						{props.original.createdAt && (
							<span>
								{`${Moment(props.original.createdAt).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}`}
							</span>
						)}
					</div>
					<div className="tools-action">
						{props.original.lastAction && (
							<span className="tools-action-title">
								{`${props.original.lastAction} by `}
							</span>
						)}
						{props.original.lastActionUser && (
							<span>
								<UserName {...props.original.lastActionUser} />
							</span>
						)}

						{props.original.lastActionDate && (
							<span>
								{`${Moment(props.original.lastActionDate).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}`}
							</span>
						)}
					</div>
				</>

			</TableTooltip>
		),
	}, {
		Header: () => this.getHeader("", ""),
		id: props => `ter-${props.original.customId}-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		width: 50,
		Cell: (props) => {
			const {
				original: {
					customId, status, hasPendingBids,
				},
			} = props;
			const { listings } = this.state;
			const { propertyId } = this.props;
			return (
				<div className="tools">
					{
						status === LISTING_STATUS.DRAFT
						&& (
							<PropertyActionListing
								className="listing pointer"
								style={{
									position: "absolute",
									zIndex: 1000 - props.index,
								}}
								defaultAction="EDIT"
								showEdit
								showCommercialOverview
								propertyId={propertyId}
								showRemove
								showDuplicate
								showView={false}
								onRemove={() => {
									listings.splice(props.index, 1);
									this.setState({ listings });
									ContentArena.ContentApi.removeListing(customId);
								}}
								onDuplicate={this.duplicate}
								{...props.original}
							/>
						)
					}
					{
						(status === LISTING_STATUS.INACTIVE || status === LISTING_STATUS.AUTO_INACTIVE || status === LISTING_STATUS.REJECTED)
						&& (
							<PropertyActionListing
								className="listing pointer"
								style={{
									position: "absolute",
									zIndex: 1000 - props.index,
								}}
								defaultAction="SUBMIT"
								showCommercialOverview
								propertyId={propertyId}
								showEdit
								showArchive
								showDuplicate
								showSubmit
								showView
								onRepublish={() => {
									listings.splice(props.index, 1);
									this.setState({ listings });
									this.republish(listing.customId);
								}}
								onArchive={() => {
									listings.splice(props.index, 1);
									this.setState({ listings });
									ContentArena.ContentApi.archiveListing(customId);
								}}
								onDuplicate={this.duplicate}
								{...props.original}
							/>
						)
					}
					{
						(status === LISTING_STATUS.PENDING || status === LISTING_STATUS.APPROVED || status === LISTING_STATUS.EDITED)
						&& (
							<PropertyActionListing
								className="listing pointer"
								style={{
									position: "absolute",
									zIndex: 1000 - props.index,
								}}
								showEdit={!hasPendingBids}
								showCommercialOverview
								propertyId={propertyId}
								showDeactivate={!hasPendingBids}
								showDuplicate
								showArchive={!hasPendingBids}
								showView
								defaultAction="VIEW"
								onDeactivate={() => {
									listings.splice(props.index, 1);
									this.setState({ listings });
									this.deactivate(customId);
								}}
								onArchive={() => {
									listings.splice(props.index, 1);
									this.setState({ listings });
									ContentArena.ContentApi.archiveListing(customId);
								}}
								onDuplicate={this.duplicate}
								canShare
								{...props.original}
							/>
						)
					}
					{(status === LISTING_STATUS.SOLD_OUT
						|| status === LISTING_STATUS.EXPIRED
						|| status === LISTING_STATUS.SOLD_COPY) && (
						<PropertyActionListing
							className="listing pointer"
							style={{
								position: "absolute",
								zIndex: 1000 - props.index,
							}}
							showCommercialOverview
							propertyId={propertyId}
							showDuplicate
							showArchive
							showView
							onArchive={() => {
								listings.splice(props.index, 1);
								this.setState({ listings });
								ContentArena.ContentApi.archiveListing(customId);
							}}
							onDuplicate={this.duplicate}
							{...props.original}
						/>
					)
					}
					{status === LISTING_STATUS.ARCHIVED && (
						<PropertyActionListing
							className="listing pointer"
							style={{
								position: "absolute",
								zIndex: 1000 - props.index,
							}}
							showDuplicate
							onDuplicate={this.duplicate}
							{...props.original}
						/>
					)}
				</div>
			);
		},
	}];

	duplicate = (customId) => {
		const { listings } = this.state;
		this.setState({ loading: true });
		ContentArena.ContentApi.duplicateListing(customId)
			.done((response) => {
				if (response.success) {
					listings.unshift(response.listing);
					this.setState({
						listings,
						loading: false,
					});
				}
			});
	};

	republish = (customId) => {
		const { listings } = this.state;
		this.setState({ loading: true });
		ContentArena.ContentApi.republishListing(customId)
			.done((response) => {
				if (response.success) {
					listings.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
					this.setState({
						listings,
						loading: false,
					});
				}
			});
	};

	deactivate = (customId) => {
		const { listings } = this.state;
		this.setState({ loading: true });
		ContentArena.ContentApi.deactivateListing(customId)
			.done((response) => {
				if (response.success) {
					listings.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
					this.setState({
						listings,
						loading: false,
					});
				}
			});
	};

	render() {
		const { listings } = this.state;
		const columns = [...this.getInfoColumns(), ...getRightTableColumns("rights"), ...this.getActionColumns()];
		return (
			<section className="property-listing-overview-wrapper">
				<ReactTable
					className="ca-table property-listings-table"
					defaultPageSize={30}
					showPageSizeOptions={false}
					showPagination={false}
					onPageChange={this.onPageChange}
					minRows={0}
					multiSort={false}
					resizable={false}
					data={listings}
					columns={columns}
				/>
				<ReactTooltip place="top" type="dark" effect="solid" />
			</section>
		);
	}
}

CmsListingOverviewTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsListingOverviewTable;
