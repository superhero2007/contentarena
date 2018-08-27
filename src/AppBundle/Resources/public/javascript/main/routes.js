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

export const routes = [
    {
        path: "/",
        exact: true,
        header: HeaderBar,
        main: Marketplace
    },
    {
        path: "/marketplace",
        exact: true,
        header: HeaderBar,
        main: Marketplace
    },
    {
        path: "/test",
        exact: true,
        header: HeaderBar,
        main: TestPage
    },
    {
        path: "/marketplace/filter/:filterName/:filterValue?",
        header: HeaderBar,
        main: Marketplace
    },
    {
        path: "/contentlisting/:customId?/:step?",
        header: HeaderBar,
        main: SellForm,
        updateByPath : true
    },
    {
        path: "/commercialactivity",
        header: HeaderBar,
        exact: true,
        main: CommercialActivity
    },
    {
        path: "/commercialactivity/filter/:filterName/:filterValue?",
        header: HeaderBar,
        main: CommercialActivity,
        updateByPath : true
    },
    {
        path: "/listing/:customId/:tab?/:bundle?",
        header: HeaderBar,
        main: Marketplace
    },
    {
        path: "/watchlist",
        header: HeaderBar,
        main: Watchlist
    },
    {
        path: "/closeddeals",
        header: HeaderBar,
        main: ClosedDeals
    },
    {
        path: "/settings/:filter?",
        header: HeaderBar,
        main: Settings,
        updateByPath : true
    },
    {
        path: "/messages/:customId?",
        header: HeaderBar,
        main: Messages
    },
    {
        path: "/managelistings",
        header: HeaderBar,
        main: ManageListings
    },
    {
        path: "/bids/:tab?",
        header: HeaderBar,
        main: PendingDeals,
        updateByPath : true
    }
];