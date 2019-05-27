import React from "react";
import { withRouter } from "react-router-dom";

import Watchlist from "../manage/containers/Watchlist";
import ClosedDeals from "../manage/containers/ClosedDeals";
import PendingDeals from "../manage/containers/PendingDeals";
import CommercialActivity from "../manage/containers/CommercialActivity";
import Messages from "../manage/containers/Messages";
import Settings from "../manage/containers/Settings";
import ManageListings from "../manage/containers/ManageListings";
import HeaderBar from "./components/HeaderBar";
import Marketplace from "../buy/containers/Marketplace";
import SellForm from "../sell/components/SellForm";
import TestPage from "./containers/TestPage";
import Register from "./containers/Register";
import PublicHeaderBar from "./components/PulbicHeaderBar";
import Preferences from "../manage/containers/Preferences";
import Terms from "../manage/containers/Terms";
import SignInUpWrapper from "../landing/containers/SignInUpWrapper";
import LandingWrapper from "../landing/containers/LandingWrapper";

import { LOGIN_VIEW_TYPE, ROUTE_PATHS } from "@constants";
import CreateProperty from "../cms/containers/CreateProperty";
import Properties from "../cms/containers/Properties";
import Property from "../cms/containers/Property";

const SignUp = withRouter(({ history }) => (
	<SignInUpWrapper
		currentView={LOGIN_VIEW_TYPE.REGISTRATION}
		history={history}
	/>
));
const SignIn = withRouter(({ history }) => <SignInUpWrapper currentView={LOGIN_VIEW_TYPE.LOGIN} history={history} />);
const ResetPassword = withRouter(({ history, match }) => (
	<SignInUpWrapper
		currentView={LOGIN_VIEW_TYPE.RESET_PASSWORD}
		history={history}
		match={match}
	/>
));
const Landing = withRouter(({ history }) => <LandingWrapper history={history} />);
const ListingPreview = withRouter(({ history, match }) => (
	<SignInUpWrapper
		history={history}
		currentView={LOGIN_VIEW_TYPE.LISTING_PREVIEW}
		match={match}
	/>
));

export const routes = [
	{
		path: "/",
		exact: true,
		main: Landing,
	},
	{
		path: ROUTE_PATHS.MARKETPLACE,
		exact: true,
		header: HeaderBar,
		main: Marketplace,
		profile: "BUYER",
		title: "Marketplace",
	},
	{
		path: ROUTE_PATHS.LANDING,
		exact: true,
		main: Landing,
	},
	{
		path: `${ROUTE_PATHS.RESET_PASSWORD}/:resetToken`,
		main: ResetPassword,
		title: "Reset Password",
	},
	{
		path: ROUTE_PATHS.LOGIN,
		exact: true,
		main: SignIn,
		title: "Login",
	},
	{
		path: ROUTE_PATHS.LISTING_PREVIEW,
		exact: true,
		main: ListingPreview,
		title: "Listing Preview",
	},
	{
		path: ROUTE_PATHS.REGISTRATION,
		exact: true,
		main: SignUp,
		title: "Registration",
	},
	{
		path: `${ROUTE_PATHS.REGISTER}/:activationCode`,
		exact: true,
		header: PublicHeaderBar,
		main: Register,
		title: "Welcome",

	},
	{
		path: `${ROUTE_PATHS.MARKETPLACE}/filter/:filterName/:filterValue?`,
		header: HeaderBar,
		main: Marketplace,
		profile: "BUYER",
		title: "Marketplace",
	},
	{
		path: `${ROUTE_PATHS.CONTENT_LISTING}/:customId?/:step?`,
		header: HeaderBar,
		main: SellForm,
		updateByPath: true,
		profile: "SELLER",
		title: "Create Listing",
	},
	{
		path: ROUTE_PATHS.COMMERCIAL_OVERVIEW,
		header: HeaderBar,
		exact: true,
		main: CommercialActivity,
		profile: "SELLER",
		title: "Commercial Overview",
	},
	{
		path: `${ROUTE_PATHS.COMMERCIAL_OVERVIEW}/filter/:filterName/:filterValue?`,
		header: HeaderBar,
		main: CommercialActivity,
		updateByPath: true,
		profile: "SELLER",
		title: "Commercial Overview",
	},
	{
		path: `${ROUTE_PATHS.PROPERTIES}`,
		header: HeaderBar,
		main: Properties,
		exact: true,
		updateByPath: true,
		profile: "SELLER",
		title: "Properties",
	},
	{
		path: `${ROUTE_PATHS.PROPERTIES}/:propertyId/:tab?`,
		header: HeaderBar,
		main: Property,
		updateByPath: false,
		profile: "SELLER",
		title: "Properties",
	},
	{
		path: `${ROUTE_PATHS.LISTING}/:customId/:tab?/:bundles?`,
		header: HeaderBar,
		main: Marketplace,
		title: "Listing Details",
	},
	{
		path: ROUTE_PATHS.WATCHLIST,
		header: HeaderBar,
		main: Watchlist,
		profile: "BUYER",
		title: "Watchlist",
	},
	{
		path: ROUTE_PATHS.CLOSED_DEALS,
		header: HeaderBar,
		main: ClosedDeals,
		profile: "BUYER",
		title: "Closed Deals",
	},
	{
		path: `${ROUTE_PATHS.SETTINGS}/:filter?`,
		header: HeaderBar,
		main: Settings,
		updateByPath: true,
		title: "Settings",
	},
	{
		path: `${ROUTE_PATHS.PREFERENCES}/:mode?`,
		header: HeaderBar,
		main: Preferences,
		updateByPath: true,
		title: "Preferences",
	},
	{
		path: ROUTE_PATHS.TERMS,
		header: HeaderBar,
		main: Terms,
		updateByPath: true,
		title: "Terms",
	},
	{
		path: `${ROUTE_PATHS.MESSAGES}/:customId?`,
		header: HeaderBar,
		main: Messages,
		updateByPath: true,
		title: "Messages",
	},
	{
		path: ROUTE_PATHS.MANAGE_LISTINGS,
		header: HeaderBar,
		main: ManageListings,
		profile: "SELLER",
		title: "Manage Listings",
	},
	{
		path: `${ROUTE_PATHS.CREATE_PROPERTY}/:action?/:key?`,
		header: HeaderBar,
		main: CreateProperty,
		profile: "SELLER",
		title: "Create Property",
		updateByPath: true,
	},
	{
		path: `${ROUTE_PATHS.BIDS}/:tab?`,
		header: HeaderBar,
		main: PendingDeals,
		updateByPath: true,
		profile: "BUYER",
		title: "Bids",
	},
	{
		path: "/test",
		exact: true,
		header: HeaderBar,
		main: TestPage,
	},
];
