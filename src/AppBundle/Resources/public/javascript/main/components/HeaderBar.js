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
                    <img src={assetsBaseDir + "app/images/logo.png"} alt=""/>
                </div>

                {profile === "BUYER" && (
                    <HeaderBarTab
                        match={match.url === "/marketplace"}
                        route={"/marketplace"}
                    >
                        <b>{this.context.t("Marketplace")}</b>
                    </HeaderBarTab>
                )}

                {profile === "BUYER" && (
                    <HeaderBarTab match={match.url === "/watchlist"} route={"/watchlist"}>
                        <b>{this.context.t("Watchlist")}</b>
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
                        <b>{this.context.t("Bids")}</b>
                    </HeaderBarTab>
                )}

                {profile === "BUYER" && (
                    <HeaderBarTab
                        match={match.url === "/closeddeals"}
                        route={"/closeddeals"}
                    >
                        <b>{this.context.t("Closed deals")}</b>
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <HeaderBarTab
                        match={match.url === "/managelistings"}
                        route={"/managelistings"}
                    >
                        <b>{this.context.t("Manage listings")}</b>
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <HeaderBarTab
                        match={match.url === "/commercialactivity"}
                        route={"/commercialactivity"}
                    >
                        <b>{this.context.t("Commercial activity")}</b>
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <CustomLink
                        match={match.path === "/contentlisting/:customId?/:step?"}
                        route={"/contentlisting/new"}
                    >
                        <b>{this.context.t("Create Listing")}</b>
                    </CustomLink>
                )}

                <div className="spacer" />

                {profile === "BUYER" && (
                    <HeaderBarTab className="tab" route="/managelistings">
                        {this.context.t("Enter selling mode")}
                    </HeaderBarTab>
                )}

                {profile === "SELLER" && (
                    <HeaderBarTab className="tab" route="/marketplace">
                        {this.context.t("Enter buying mode")}
                    </HeaderBarTab>
                )}

                <HeaderBarTab className="tab" route="/messages">
                    <i className="fa fa-envelope" />
                    {this.context.t("Messages")}
                </HeaderBarTab>

                <HeaderNotifications />

                <div className="settings">
                    <i className="fa fa-2x fa-gear" />

                    <div className="popup">
                        <div className="wrap">
                            <HeaderBarTab
                                route="/settings"
                                className="tab" >
                                {this.context.t("Settings")}
                            </HeaderBarTab>
                            <a href="/logout" className="tab">
                                {this.context.t("Logout")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getLogoUrl = (tab) => {
        let logoUrl = '';
        if (tab === 'MANAGE_LISTINGS') {
            logoUrl = 'managelistings'
        }
        if (tab === 'MARKETPLACE') {
            logoUrl = 'marketplace'
        }
        return logoUrl;
    }
}

HeaderBar.contextTypes = {
    t: PropTypes.func.isRequired
};


export default HeaderBar;

