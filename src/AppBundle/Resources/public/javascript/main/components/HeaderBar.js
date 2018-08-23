import React from 'react';
import {goTo} from "../actions/utils";
import {Link} from "react-router-dom";
import {PropTypes} from 'prop-types';

const HeaderBarTab = ({match, children, route}) => {
    return (
        <div className={(match) ? "tab active-tab" : "tab"}>
            <Link to={route} >{children}</Link>
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

                { profile === "BUYER" &&
                <HeaderBarTab
                    match={match.url === "/marketplace"}
                    route={"/marketplace"}>
                    {this.context.t("Marketplace")}
                </HeaderBarTab> }

                { profile === "BUYER" && <HeaderBarTab
                    match={match.url === "/watchlist"}
                    route={"/watchlist"}>
                    {this.context.t("Watchlist")}
                </HeaderBarTab> }

                { profile === "BUYER" && <HeaderBarTab
                    match={match.url === "/bids/activebids" ||match.url === "/bids/declinedbids"  }
                    route={"/bids/activebids"}
                    >
                    {this.context.t("Bids")}
                </HeaderBarTab> }

                { profile === "BUYER" && <HeaderBarTab
                    match={match.url === "/closeddeals"}
                    route={"/closeddeals"}
                    >
                    {this.context.t("Closed deals")}
                </HeaderBarTab> }

                { profile === "SELLER" && <HeaderBarTab
                    match={match.url === "/managelistings"}
                    route={"/managelistings"}>
                    {this.context.t("Manage listings")}
                </HeaderBarTab> }

                { profile === "SELLER" && <HeaderBarTab
                    match={match.url === "/commercialactivity"}
                    route={"/commercialactivity"} >
                    {this.context.t("Commercial activity")}
                </HeaderBarTab> }

                { profile === "SELLER" && <HeaderBarTab
                    match={match.path === "/contentlisting/:customId?/:step?"}
                    route={"/contentlisting/new"}>
                    {this.context.t("Create Listing")}
                </HeaderBarTab> }

                <div className="spacer" />

                { profile === "BUYER" &&
                <HeaderBarTab
                    className="tab"
                    route="/managelistings">
                    {this.context.t("Enter selling mode")}
                </HeaderBarTab> }

                { profile === "SELLER" &&
                <HeaderBarTab
                    className="tab"
                    route="/marketplace">
                    {this.context.t("Enter buying mode")}
                </HeaderBarTab> }

                <HeaderBarTab
                    className="tab"
                    route="/messages">
                    <i className="fa fa-envelope" />
                    {this.context.t("Messages")}
                </HeaderBarTab>

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

