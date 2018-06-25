import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import CommercialTerms from "./CommercialTerms";
import ContentInformation from "./ContentInformation";
import TermSheet from "./TermSheet";
import TechnicalDetails from "./TechnicalDetails";
import ProgramDetails from "./ProgramDetails";
import Seller from "./Seller";
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";

class ListingDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content : ContentArena.Utils.contentParserFromServer(props.content) || {},
            tab : 1
        };
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        this.contactIcon = assetsBaseDir + "app/images/envelope.png";
        this.watchlistIcon = assetsBaseDir + "app/images/watchlist.png";
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            content : ContentArena.Utils.contentParserFromServer(nextProps.content)
        });
    }

    showTab = (tab) => {
        this.setState({tab});
    };

    render() {

        const {onBack } = this.props;
        const {tab, content} = this.state;
        let listingImage = (content.image) ? assetsBaseDir + "../" + content.image : this.noImage;

        return (
            <div className="listing-details">
                <div className="listing-details-header">
                    <button onClick={onBack} className="light-blue-button">
                        <i className="fa fa-chevron-left"/> Back to results
                    </button>
                    <div className="name">{content.name}</div>
                    <div className="publisher" style={{
                        flex:1,
                        fontSize: 18,
                        fontWeight: 600
                    }}>{"Juan Cruz Talco"}</div>

                    <div style={{margin: '0 10px', display: 'flex'}}>
                        <img style={{width: 22, height: 18, marginBottom: 5}} src={this.contactIcon}/>
                        <div style={{
                            flex:1,
                            color: '#4F4F4F',
                            fontSize: 16,
                            margin: '0 10px'
                        }}>Contact Seller</div>
                    </div>

                    <div style={{margin: '0 10px', display: 'flex'}}>
                        <img style={{width: 22, height: 15, marginTop: 3}} src={this.watchlistIcon}/>
                        <div style={{
                            flex:1,
                            color: '#2DA7E6',
                            fontSize: 16,
                            textDecoration: 'underline',
                            margin: '0 10px'

                        }}>Watchlist</div>
                    </div>

                    <div className="custom-id">#{content.customId}</div>
                </div>

                <div className="listing-details-content">
                    <div className={"left"}  >
                        <div className={"image"}>
                            <img src={listingImage}/>
                        </div>

                        <ContentListingEventDetails {...this.props.content}/>

                        <div style={{flex: 2, flexDirection: "column", margin: '20px 0' }}>
                            {
                                content.rightsPackage.map(( sr,i )=>{
                                    return <div key={i}  style={{
                                        minHeight: 46,
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {!sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.blueCheck}/>}

                                        {sr.exclusive &&
                                        <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.yellowCheck}/>}

                                        <div style={{display: 'flex', flexDirection: "row"  }}>
                                            { sr.shortLabel !== "PR" && sr.name }
                                            { sr.shortLabel === "PR" && content.programs[0].name &&
                                            "Program: " + content.programs[0].name
                                            }
                                            {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                        <div className={"date"}>
                            Start of license period
                            <span>
                                { content.startDateMode !== "DATE"  && " With contract conclusion"}
                                { content.startDateMode === "DATE"  && " " + Moment(content.startDate).format('DD/MM/YYYY')}
                            </span>
                        </div>
                        <div className={"date"}>
                            End of license period
                            <span>
                            { content.endDateMode === "LIMITED"  && content.endDateLimit + " days from contract conclusion"}
                            { content.endDateMode === "DATE"  && " " +Moment(content.endDate).format('DD/MM/YYYY')}
                            { content.endDateMode === "UNLIMITED"  && " Unlimited"}
                            </span>
                        </div>
                        <div className={"date"}>Publishing date <span>{Moment().format('DD/MM/YYYY')}</span></div>
                        <div className={"date"}>Expiry <span>{Moment(content.expiresAt).format('DD/MM/YYYY')}</span></div>
                    </div>
                    <div className={"right"} >
                        <div className={"listing-details-buttons"}>
                            <button className={(tab ===1)?"active": ""} onClick={()=>this.showTab(1)}>Commercial terms</button>
                            <button className={(tab ===2)?"active": ""} onClick={()=>this.showTab(2)}>Content information</button>
                            <button className={(tab ===3)?"active": ""} onClick={()=>this.showTab(3)}>Term Sheet</button>
                            {content.programs && content.programs.length > 0 &&
                                <button className={(tab ===4)?"active": ""} onClick={()=>this.showTab(4)}>Program Details</button>}
                            <button className={(tab ===5)?"active": ""} onClick={()=>this.showTab(5)}>Seller</button>
                        </div>
                        <div className={"listing-details-tab"}>

                            { this.state.tab === 1 &&
                                <CommercialTerms content={content}/>
                            }
                            { this.state.tab === 2 &&
                                <ContentInformation {...content}/> }
                            { this.state.tab === 3 &&
                                <TermSheet
                                    selectedRights={content.selectedRightsBySuperRight}
                                    rightsPackage={content.rightsPackage}/>
                            }
                            { this.state.tab === 4 && <ProgramDetails {...content}/> }
                            { this.state.tab === 5 && <Seller {...content}/> }


                        </div>
                    </div>
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