import React from 'react';
import { connect } from "react-redux";
import ListingDetails from './ListingDetails';

class MarketPlace extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
        console.log("MarketPlace - Props", nextProps);
    }

    render() {
        return (
            <div className="marketplace">
                {this.props.loadingListing &&
                    <i className="fa fa-cog fa-spin"/>
                }

                {this.props.content && !this.props.loadingListing &&
                    <ListingDetails
                        id={this.props.id}
                        countries={this.props.countries}
                        territories={this.props.territories}
                        content={this.props.content}/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        removeNewSport : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sports",
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MarketPlace)