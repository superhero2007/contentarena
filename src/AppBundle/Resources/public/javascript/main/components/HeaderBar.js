import React from 'react';
import {goTo} from "../actions/utils";
import {Link} from "react-router-dom";
import {PropTypes} from 'prop-types';
import HeaderNotifications from './HeaderNotifications';

const HeaderBarTab = ({match, children, route}) => {
    return (
        <div className={(match) ? "tab active-tab" : "tab"}>
            <Link to={route} >{children}</Link>
        </div>
    )
};

const CustomLink = ({match, children, route}) => {
    return (
        <div className={(match) ? "tab active-tab" : "tab"}>
            <a href={route}>{children}</a>
        </div>
    )
};

class HeaderBar extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
        }


    }

    render(){
        const {tab, profile, match} = this.props;
        const logoUrl = this.getLogoUrl(tab);

        return(
            <div className="manager-header">
                <div className="logo" onClick={()=>goTo(logoUrl)}>
                    <img src={assetsBaseDir + "app/images/logo.svg"} alt=""/>
                </div>

                {profile === "BUYER" && (
                    <HeaderBarTab
                        match={match.url === "/marketplace"}
                        route={"/marketplace"}
                    >
                        <b>{this.context.t("HEADER_LINK_MARKETPLACE")}</b>
                    </HeaderBarTab>
                )}

                {profile === "BUYER" && (
                    <HeaderBarTab match={match.url === "/watchlist"} route={"/watchlist"}>
                        <b>{this.context.t("HEADER_LINK_WATCHLIST")}</b>
                    </HeaderBarTab>
                )}

                {profile === "BUYER" && (
                    <HeaderBarTab
                        match={
                            match.url === "/bids/activebids" ||
                            match.url === "/bids/declinedbids"
                        }
                        route={"/bids/activebids"}
                    >
                        <b>{this.context.t("HEADER_LINK_BIDS")}</b>
                    </HeaderBarTab>
                )}

                {profile === "BUYER" && (
                    <HeaderBarTab
                        match={match.url === "/closeddeals"}
                        route={"/closeddeals"}
                    >
                        <b>{this.context.t("HEADER_LINK_CLOSED_DEALS")}</b>
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <HeaderBarTab
                        match={match.url === "/managelistings"}
                        route={"/managelistings"}
                    >
                        <b>{this.context.t("HEADER_LINK_MANAGE_LISTINGS")}</b>
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <HeaderBarTab
                        match={
                            match.url === "/commercialactivity" ||
                            match.url === "/commercialactivity/filter/withactivity" ||
                            match.url === "/commercialactivity/filter/openbids" ||
                            match.url === "/commercialactivity/filter/closeddeals"
                        }
                        route={"/commercialactivity"}
                    >
                        <b>{this.context.t("HEADER_LINK_COMMERCIAL_ACTIVITY")}</b>
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <CustomLink
                        match={match.path === "/contentlisting/:customId?/:step?"}
                        route={"/contentlisting/new"}
                    >
                        <b>{this.context.t("HEADER_LINK_CREATE_LISTING")}</b>
                    </CustomLink>
                )}

                <div className="spacer" />

                {profile === "BUYER" && (
                    <HeaderBarTab className="tab" route="/managelistings">
                        {this.context.t("HEADER_LINK_SELLING_MODE")}
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <HeaderBarTab className="tab" route="/marketplace">
                        {this.context.t("HEADER_LINK_BUYING_MODE")}
                    </HeaderBarTab>
                )}

                <HeaderBarTab className="tab" route="/messages">
                    <i className="fa fa-envelope" />
                    {this.context.t("HEADER_LINK_MESSAGES")}
                </HeaderBarTab>

                <HeaderNotifications />

                <div className="settings">
                    <i className="fa fa-2x fa-gear" />

                    <div className="popup">
                        <div className="wrap">
                            <HeaderBarTab
                                route="/settings"
                                className="tab" >
                                {this.context.t("HEADER_LINK_SETTINGS")}
                            </HeaderBarTab>
                            <a href="/logout" className="tab">
                                {this.context.t("HEADER_LINK_LOGOUT")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getLogoUrl = () => {
        const { profile } = this.props;

        if (profile === "SELLER") {
            return "managelistings";
        } else {
            return "marketplace";
        }
    }
}

HeaderBar.contextTypes = {
    t: PropTypes.func.isRequired
};


export default HeaderBar;

