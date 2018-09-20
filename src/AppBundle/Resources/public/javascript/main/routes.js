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
        main: Marketplace
    },
    {
        path: "/marketplace",
        exact: true,
        header: HeaderBar,
        main: Marketplace,
        profile : "BUYER"
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
        main: Marketplace,
        profile : "BUYER"
    },
    {
        path: "/contentlisting/:customId?/:step?",
        header: HeaderBar,
        main: SellForm,
        updateByPath : true,
        profile : "SELLER"
    },
    {
        path: "/commercialactivity",
        header: HeaderBar,
        exact: true,
        main: CommercialActivity,
        profile : "SELLER"
    },
    {
        path: "/commercialactivity/filter/:filterName/:filterValue?",
        header: HeaderBar,
        main: CommercialActivity,
        updateByPath : true,
        profile : "SELLER"
    },
    {
        path: "/listing/:customId/:tab?/:bundle?",
        header: HeaderBar,
        main: Marketplace
    },
    {
        path: "/watchlist",
        header: HeaderBar,
        main: Watchlist,
        profile : "BUYER"
    },
    {
        path: "/closeddeals",
        header: HeaderBar,
        main: ClosedDeals,
        profile : "BUYER"
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
        main: Messages,
        updateByPath : true
    },
    {
        path: "/managelistings",
        header: HeaderBar,
        main: ManageListings,
        profile : "SELLER"
    },
    {
        path: "/bids/:tab?",
        header: HeaderBar,
        main: PendingDeals,
        updateByPath : true,
        profile : "BUYER"
    }
];