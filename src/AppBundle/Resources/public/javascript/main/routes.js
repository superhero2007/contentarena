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


import { LOGIN_VIEW_TYPE } from "@constants";
import ManageProperties from "../cms/containers/ManageProperties";
import CreateProperty from "../cms/containers/CreateProperty";

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

export const ROUTE_PATHS = {
	MARKETPLACE: "/marketplace",
	COMMERCIAL_OVERVIEW: "/commercialoverview",
	COMMERCIAL_OVERVIEW_WITH_ACTIVITY: "/commercialoverview/filter/withactivity",
	COMMERCIAL_OVERVIEW_OPEN_BIDS: "/commercialoverview/filter/openbids",
	COMMERCIAL_OVERVIEW_CLOSED_DEALS: "/commercialoverview/filter/closeddeals",
	MANAGE_LISTINGS: "/managelistings",
	MANAGE_PROPERTIES: "/manageproperties",
	CREATE_PROPERTY: "/createproperty",
	CREATE_PROPERTY_STEP_1: "/createproperty/1",
	CREATE_PROPERTY_STEP_2: "/createproperty/2",
};


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
		path: "/landing",
		exact: true,
		main: Landing,
	},
	{
		path: "/reset-password/:resetToken",
		main: ResetPassword,
		title: "Reset Password",
	},
	{
		path: "/login",
		exact: true,
		main: SignIn,
		title: "Login",
	},
	{
		path: "/registration",
		exact: true,
		main: SignUp,
		title: "Registration",
	},
	{
		path: "/test",
		exact: true,
		header: HeaderBar,
		main: TestPage,
	},
	{
		path: "/register/:activationCode",
		exact: true,
		header: PublicHeaderBar,
		main: Register,
		title: "Welcome",

	},
	{
		path: "/marketplace/filter/:filterName/:filterValue?",
		header: HeaderBar,
		main: Marketplace,
		profile: "BUYER",
		title: "Marketplace",
	},
	{
		path: "/contentlisting/:customId?/:step?",
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
		path: "/listing/:customId/:tab?/:bundles?",
		header: HeaderBar,
		main: Marketplace,
		title: "Listing Details",
	},
	{
		path: "/watchlist",
		header: HeaderBar,
		main: Watchlist,
		profile: "BUYER",
		title: "Watchlist",
	},
	{
		path: "/closeddeals",
		header: HeaderBar,
		main: ClosedDeals,
		profile: "BUYER",
		title: "Closed Deals",
	},
	{
		path: "/settings/:filter?",
		header: HeaderBar,
		main: Settings,
		updateByPath: true,
		title: "Settings",
	},
	{
		path: "/preferences/:mode?",
		header: HeaderBar,
		main: Preferences,
		updateByPath: true,
		title: "Preferences",
	},
	{
		path: "/terms",
		header: HeaderBar,
		main: Terms,
		updateByPath: true,
		title: "Terms",
	},
	{
		path: "/messages/:customId?",
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
		path: ROUTE_PATHS.MANAGE_PROPERTIES,
		header: HeaderBar,
		main: ManageProperties,
		profile: "SELLER",
		title: "Manage Properties",
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
		path: "/bids/:tab?",
		header: HeaderBar,
		main: PendingDeals,
		updateByPath: true,
		profile: "BUYER",
		title: "Bids",
	},
];
