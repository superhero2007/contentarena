import React from 'react';
import HistoryButton from './HistoryButton'
import {goTo} from "../actions/utils";

const HeaderBarTab = ({tabName, activeTab, children, route}) => {
    return (
        <div className={(tabName === activeTab) ? "tab active-tab" : "tab"}
                 onClick={()=>{
                     if ( tabName !== activeTab && route ) {
                         goTo(route);
                     };
                 }}>
            {children}
        </div>
    )
};

class HeaderBar extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }

    goTo = () => {
    };

    render(){
        const {tab, profile} = this.props;
        return(
            <div className="manager-header">

                <div className="logo">
                    <img src={assetsBaseDir + "app/images/logo.png"} alt=""/>
                </div>

                { profile === "BUYER" && <HeaderBarTab
                    tabName={"MARKETPLACE"}
                    route={"marketplace"}
                    activeTab={tab} >
                    Marketplace
                </HeaderBarTab> }

                { profile === "BUYER" && <HeaderBarTab
                    tabName={"WATCHLIST"}
                    route={"watchlist"}
                    activeTab={tab} >
                    Watchlist
                </HeaderBarTab> }

                { profile === "BUYER" && <HeaderBarTab
                    tabName={"BIDS"}
                    route={"activebids"}
                    activeTab={tab} >
                    Bids
                </HeaderBarTab> }

                { profile === "BUYER" && <HeaderBarTab
                    tabName={"CLOSED_DEALS"}
                    route={"closeddeals"}
                    activeTab={tab} >
                    Closed deals
                </HeaderBarTab> }

                { profile === "SELLER" && <HeaderBarTab
                    tabName={"MANAGE_LISTINGS"}
                    route={"managelistings"}
                    activeTab={tab} >
                    Manage listings
                </HeaderBarTab> }

                { profile === "SELLER" && <HeaderBarTab
                    tabName={"COMMERCIAL_ACTIVITY"}
                    route={"commercialactivity"}
                    activeTab={tab} >
                    Commercial activity
                </HeaderBarTab> }

                <div className="spacer" />

                { profile === "BUYER" &&
                <HistoryButton
                    className="tab"
                    onClick={()=>{goTo("managelistings")}}
                    path="managelistings">
                    Enter selling mode
                </HistoryButton> }

                { profile === "SELLER" &&
                <HistoryButton className="tab" onClick={()=>{goTo("marketplace")}} path="marketplace">
                    Enter buying mode
                </HistoryButton> }

                <HistoryButton className="tab" onClick={()=>{ goTo("messages?profile=" + profile)}} path="messages">
                    <i className="fa fa-envelope" /> Messages
                </HistoryButton>

                <div className="settings">
                    <i className="fa fa-2x fa-gear" />

                    <div className="popup">
                        <div className="wrap">
                            <HistoryButton className="tab" onClick={()=>{goTo("settings?profile=" + profile)}} path="settings">
                                Settings
                            </HistoryButton>
                            <a href="http://contentarena.com" className="tab">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderBar;

