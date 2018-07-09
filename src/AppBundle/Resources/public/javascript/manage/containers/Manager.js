import React from 'react';
import { connect } from "react-redux";
import HeaderBar from '../../main/components/HeaderBar';
import Watchlist from './Watchlist';
import ClosedDeals from './ClosedDeals';
import PendingDeals from './PendingDeals';

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile : props.profile,
            tab : props.tab
        };
    }

    componentDidMount () {

    }

    componentWillReceiveProps ( props ) {
    }

    render () {
        const { profile, tab } = this.state;
        const { company } = this.props;
        return (
            <div className={"manager-container"}>
                <HeaderBar tab={tab} profile={profile}/>
                <div className="manager-content">
                    {tab === 'WATCHLIST' && <Watchlist company={company} />}
                    {tab === 'CLOSED_DEALS' && <ClosedDeals />}
                    {tab === 'BIDS' && <PendingDeals />}
                    {tab === 'SETTINGS' && "SETTINGS"}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manager)