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

import React from "react";
import { withRouter } from "react-router-dom";
import { LOGIN_VIEW_TYPE } from "@constants";

const SignUp = withRouter(({ history }) => <SignInUpWrapper currentView={LOGIN_VIEW_TYPE.REGISTRATION} history={history} />);
const SignIn = withRouter(({ history }) => <SignInUpWrapper currentView={LOGIN_VIEW_TYPE.LOGIN} history={history} />);
const ResetPassword = withRouter(({ history, match }) => <SignInUpWrapper currentView={LOGIN_VIEW_TYPE.RESET_PASSWORD} history={history} match={match} />);
const Landing = withRouter(({ history }) => <LandingWrapper history={history} />);

export const routes = [
  {
    path: "/",
    exact: true,
    main: Landing,
  },
  {
    path: "/marketplace",
    exact: true,
    header: HeaderBar,
    main: Marketplace,
    profile: "BUYER",
  },
  {
    path: "/landing",
    exact: true,
    main: Landing,
  },
  {
    path: "/reset-password/:resetToken",
    main: ResetPassword,
  },
  {
    path: "/login",
    exact: true,
    main: SignIn,
  },
  {
    path: "/registration",
    exact: true,
    main: SignUp,
  },
  {
    path: "/test",
    exact: true,
    header: HeaderBar,
    main: TestPage,
  },
  {
    path: "/register",
    exact: true,
    header: PublicHeaderBar,
    main: Register,
  },
  {
    path: "/register/:activationCode",
    exact: true,
    header: PublicHeaderBar,
    main: Register,
  },
  {
    path: "/register/:activationCode/:step?",
    updateByPath: true,
    header: PublicHeaderBar,
    main: Register,
  },
  {
    path: "/marketplace/filter/:filterName/:filterValue?",
    header: HeaderBar,
    main: Marketplace,
    profile: "BUYER",
  },
  {
    path: "/contentlisting/:customId?/:step?",
    header: HeaderBar,
    main: SellForm,
    updateByPath: true,
    profile: "SELLER",
  },
  {
    path: "/commercialoverview",
    header: HeaderBar,
    exact: true,
    main: CommercialActivity,
    profile: "SELLER",
  },
  {
    path: "/commercialoverview/filter/:filterName/:filterValue?",
    header: HeaderBar,
    main: CommercialActivity,
    updateByPath: true,
    profile: "SELLER",
  },
  {
    path: "/listing/:customId/:tab?/:bundles?",
    header: HeaderBar,
    main: Marketplace,
  },
  {
    path: "/watchlist",
    header: HeaderBar,
    main: Watchlist,
    profile: "BUYER",
  },
  {
    path: "/closeddeals",
    header: HeaderBar,
    main: ClosedDeals,
    profile: "BUYER",
  },
  {
    path: "/settings/:filter?",
    header: HeaderBar,
    main: Settings,
    updateByPath: true,
  },
  {
    path: "/preferences/:mode?",
    header: HeaderBar,
    main: Preferences,
    updateByPath: true,
  },
  {
    path: "/terms",
    header: HeaderBar,
    main: Terms,
    updateByPath: true,
  },
  {
    path: "/messages/:customId?",
    header: HeaderBar,
    main: Messages,
    updateByPath: true,
  },
  {
    path: "/managelistings",
    header: HeaderBar,
    main: ManageListings,
    profile: "SELLER",
  },
  {
    path: "/bids/:tab?",
    header: HeaderBar,
    main: PendingDeals,
    updateByPath: true,
    profile: "BUYER",
  },
];
