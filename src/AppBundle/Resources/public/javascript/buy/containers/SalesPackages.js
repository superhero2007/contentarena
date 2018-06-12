import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import SalesPackage from "../components/SalesPackage"

class SalesPackages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.bidIcon = assetsBaseDir + "app/images/auction.svg";
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    getFee = (salesPackage) => {
        let currencySymbol = (salesPackage.currency.code === "EUR" ? "€" : "$");
        return salesPackage.fee + " " + currencySymbol ;
    };

    render() {
        const {salesPackages} = this.props;
        return (
            <div className="sales-packages">
                { salesPackages.map( (salesPackage, i) => {
                    return <div className="sales-package-container" key={"sales-package-"+ i}>
                        <div style={{flex : 1, textAlign: 'center'}}>
                            {salesPackage.territories.length}
                        </div>
                        <div style={{flex : 8}}>
                            {salesPackage.name}
                        </div>

                        <div style={{flex : 2}}>
                            <i className="fa fa-info-circle" onClick={() => {  }} />
                        </div>

                        {
                            ( salesPackage.salesMethod.name !== "BIDDING" ||  ( salesPackage.salesMethod.name === "BIDDING" && salesPackage.fee > 0 ) )
                            &&<div style={{flex : 2, justifyContent: "flex-end", display: "flex"}}>
                                {this.getFee(salesPackage)}
                            </div>
                        }

                        {salesPackage.salesMethod.name === "BIDDING" &&<div style={{flex : 1, justifyContent: "flex-end", display: "flex"}}>
                            <img style={{width: 30}} src={this.bidIcon}/>
                        </div>}

                        { salesPackage.salesMethod.name === "FIXED" &&
                            <button className="standard-button">
                                Buy now
                            </button>
                        }

                        { salesPackage.salesMethod.name === "BIDDING" &&
                            <button className="standard-button">
                                Place bid
                            </button>
                        }




                    </div>
                })}
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
)(SalesPackages)