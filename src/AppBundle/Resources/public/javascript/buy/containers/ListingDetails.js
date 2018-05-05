import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import CommercialTerms from "./CommercialTerms";
import ContentInformation from "./ContentInformation";
import TermSheet from "./TermSheet";
import TechnicalDetails from "./TechnicalDetails";
import Seller from "./Seller";

class ListingDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content : props.content || {},
            tab : 1
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    showTab = (tab) => {
        this.setState({tab});
    };

    render() {

        return (
            <div className="listing-details">
                <div className={"listing-details-buttons"}>
                    <button onClick={()=>this.showTab(1)}>Commercial terms</button>
                    <button onClick={()=>this.showTab(2)}>Content information</button>
                    <button onClick={()=>this.showTab(3)}>Term Sheet</button>
                    <button onClick={()=>this.showTab(4)}>Technical details</button>
                    <button onClick={()=>this.showTab(5)}>Seller</button>
                </div>
                <div className={"listing-details-content"}>

                    { this.state.tab === 1 && <CommercialTerms content={this.props.content}/> }
                    { this.state.tab === 2 && <ContentInformation content={this.props.content}/> }
                    { this.state.tab === 3 && <TermSheet content={this.props.content}/> }
                    { this.state.tab === 4 && <TechnicalDetails content={this.props.content}/> }
                    { this.state.tab === 5 && <Seller content={this.props.content}/> }


                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingDetails)