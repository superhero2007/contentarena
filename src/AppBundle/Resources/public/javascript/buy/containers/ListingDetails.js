import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import CommercialTerms from "./CommercialTerms";
import ContentInformation from "./ContentInformation";
import TermSheet from "./TermSheet";
import TechnicalDetails from "./TechnicalDetails";
import Seller from "./Seller";
import Moment from "moment/moment";

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

        const {onBack, content} = this.props;
        const {tab} = this.state;
        let listingImage = (content.image) ? assetsBaseDir + "../" + content.image : this.noImage;

        return (
            <div className="listing-details">
                <div className="listing-details-header">
                    <button onClick={onBack} className="light-blue-button">
                        <i className="fa fa-chevron-left"/> Back to results
                    </button>
                    <div className="name">{content.name}</div>
                    <div className="publisher" style={{flex:1}}>{"Juan Cruz Talco"}</div>
                    <button className="link-button" style={{flex:1}}>Contact Seller</button>
                    <button className="link-button" style={{flex:1}}>Contact Seller</button>
                    <div className="custom-id">#{content.customId}</div>
                </div>

                <div className="listing-details-content">
                    <div className={"left"}  >
                        <div className={"image"}>
                            <img src={listingImage}/>
                        </div>

                        <div style={{flex: 1, fontWeight: 600, lineHeight: "30px"}}>
                            {content.sportCategory && <div>{content.sportCategory.name}</div>}
                            {content.tournament && <div>{content.tournament.name}</div>}
                            {
                                content.seasons && content.seasons.length > 0 && content.seasons.map(season => {
                                    return <div>{season.name}</div>
                                })
                            }
                        </div>

                        <div className={"date"}>Published <span>{Moment().format('DD/MM/YYYY')}</span></div>
                        <div className={"date"}>Expires <span>{Moment(content.expiresAt).format('DD/MM/YYYY')}</span></div>
                    </div>
                    <div className={"right"} >
                        <div className={"listing-details-buttons"}>
                            <button className={(tab ===1)?"active": ""} onClick={()=>this.showTab(1)}>Commercial terms</button>
                            <button className={(tab ===2)?"active": ""} onClick={()=>this.showTab(2)}>Content information</button>
                            <button className={(tab ===3)?"active": ""} onClick={()=>this.showTab(3)}>Term Sheet</button>
                            <button className={(tab ===4)?"active": ""} onClick={()=>this.showTab(4)}>Technical details</button>
                            <button className={(tab ===5)?"active": ""} onClick={()=>this.showTab(5)}>Seller</button>
                        </div>
                        <div className={"listing-details-tab"}>

                            { this.state.tab === 1 &&
                            <CommercialTerms content={content}/>
                            }
                            { this.state.tab === 2 && <ContentInformation content={this.props.content}/> }
                            { this.state.tab === 3 &&
                                <TermSheet
                                    selectedRights={content.selectedRightsBySuperRight}
                                    rightsPackage={content.rightsPackage}/>
                            }
                            { this.state.tab === 4 && <TechnicalDetails content={this.props.content}/> }
                            { this.state.tab === 5 && <Seller content={this.props.content}/> }


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