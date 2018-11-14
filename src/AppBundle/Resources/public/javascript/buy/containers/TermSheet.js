import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {RightDefinitions} from "../../sell/components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../../sell/components/ProductionStandardsDefinitions";
import {RightItemsDefinitions} from "../../sell/components/RightItemsDefinitions";
import {SuperRightProductionDetailsLabels} from "../../sell/components/SuperRightDefinitions";
import { RepresenationTextArea } from "./../../sell/components/SellFormItems";
import {PropTypes} from "prop-types";
import Moment from "moment/moment";
import { DATE_FORMAT } from "@constants";

class TermSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    hasRight = (shortLabel) => {
        const {rightsPackage} = this.props;
        return rightsPackage.filter(rp => rp.shortLabel === shortLabel ).length > 0;
    };

    renderProgramInfo = (values, name, deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated) => {
        const { rightsPackage } = this.props;
        return <div className='row' key={'program-'+ name}>
                <div className="right-name right-definition">{name}</div>
                {
                    rightsPackage.map((rp,k)=>{

                        let liveFeedColumn = deliveryViaLiveFeed && liveFeedPackages[0].shortLabel === rp.shortLabel;

                        if ( ( rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_LIVE"
                                || highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT"
                            )
                            && !liveFeedColumn
                            && rp.shortLabel !== "LT") return;
                        if ( rp.shortLabel !== 'PR' ) return <div className="right-definition">-</div>;

                        return <div  className="right-definition" key={"program_child"+k}>
                            { values && values.length === 0 && "No" }
                            { values && values.length > 0 && values.map(l=>l.label).join(", ") }
                        </div>
                    })
                }
            </div>
    };

    renderList = (definitions, checkContentDelivery, deliveryViaLiveFeed, liveFeedPackages) => {
        const {selectedRightsBySuperRight, rightsPackage, LICENSED_LANGUAGES} = this.props;
        if (checkContentDelivery) {
            definitions = this.getFilteredByDelivery(definitions, rightsPackage, deliveryViaLiveFeed, liveFeedPackages);
        }

        let highlightRight = rightsPackage.filter(rp =>rp.shortLabel === "HL");
        let highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";


        return definitions.map( (right, i) => {

            if (right.key === 'CONTENT_DELIVERY') return;
            if (right.key === 'PROGRAM') return;

            if ( right.key === "LICENSED_LANGUAGES") {
                if (!LICENSED_LANGUAGES || LICENSED_LANGUAGES.length === 0) return false;
            }

            return <div className='row' key={'list'+i}>
                <div className="right-name right-definition">
                    {this.context.t("RIGHTS_" + right.key)}
                    </div>
                {
                    rightsPackage.map((rp,k)=>{

                        let liveFeedColumn = deliveryViaLiveFeed && liveFeedPackages[0].shortLabel === rp.shortLabel;

                        if ( checkContentDelivery
                            && !liveFeedColumn
                            &&  ( rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
                                || ( highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT" ) )
                            && rp.shortLabel !== "LT"
                            && rp.shortLabel !== "PR" ) return;

                        if ( right.key === 'LICENSED_LANGUAGES' ) return <div className="right-definition">
                            {LICENSED_LANGUAGES.map(l=>l.label).join(", ")}
                        </div>;


                        if ( right.superRights.length > 0
                            && right.superRights.indexOf(rp.shortLabel) === -1 ) return <div className="right-definition">
                            -
                        </div>;

                        const defItems = selectedRightsBySuperRight[rp.id].items;
                        let definition = defItems[right.key];
                        let label = '';

                        if (right.multiple) {
                            if (Array.isArray(defItems[right.key])) {
                                label = defItems[right.key].map(item => RightItemsDefinitions[item].label).join(", ");
                            } else {
                                label = defItems[right.key];
                            }
                        } else {
                            const dynKey = `${right.key}_TEXT`;
                            if (defItems[dynKey]) {
                                label = defItems[dynKey];
                            } else {
                                label = definition && RightItemsDefinitions[definition].label;
                            }
                        }

                        if (right.key === 'RUNS' && defItems["RUNS_NUMBER"]) {
                            label = defItems["RUNS_NUMBER"];
                        }

                        if (right.key === 'GRAPHICS' && defItems["GRAPHICS_LANGUAGES"]) {
                            label = defItems["GRAPHICS_LANGUAGES"].map(l=>l.label).join(", ");
                        }

                        if (right.key === 'COMMENTARY' && defItems["COMMENTARY_LANGUAGES"]) {
                            label = defItems["COMMENTARY_LANGUAGES"].map(l=>l.label).join(", ");
                        }

                        return <div  className="right-definition" key={'list_child'+k}>
                            {label}
                            {right.key === 'CAMERA' && <span style={{marginLeft: 5}}>{defItems["CAMERAS"]}</span>}
                        </div>
                    })
                }
            </div>
        })
    };

    getFilteredByDelivery = (definitions, rightsPackage, deliveryViaLiveFeed, liveFeedPackages) => {
        //filter definitions by user chosen rightPackage

        return definitions.filter(d => {
            if (d.checkDelivery) {
                return rightsPackage.some(p =>
                    !( ( !(deliveryViaLiveFeed && liveFeedPackages[0].shortLabel === p.shortLabel) && p.selectedRights['CONTENT_DELIVERY'] === "CONTENT_DELIVERY_LIVE" && p.shortLabel !== "LT" && p.shortLabel !== "PR") ||
                        p.shortLabel === "PR" && d.key !== 'TECHNICAL_DELIVERY')
                )
            } else {
                return true
            }
        });
    };

    renderTextarea = (definitions) => {
        const {selectedRightsBySuperRight, rightsPackage} = this.props;
        return definitions.map( (right,i) => {
            if (right.key === 'PROGRAM' || !selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_TEXTAREA"]) return;
            return (
                <div key={'textarea_'+i}>
                <div className="title spacer">
                        {right.name}
                    </div>
                    <div className="txt description-text">
                        <RepresenationTextArea
                            value={selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_TEXTAREA"]} />
                    </div>
                </div>
            )
        })
    };

    renderDetails= (definitions) => {
        const {selectedRightsBySuperRight, rightsPackage} = this.props;
        return definitions.map( (right) => {
            if (right.key === 'PROGRAM' || !selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_DETAILS"]) return;
            return <div className="full-item-box">
                <label>{right.name}</label>
                <div  className="full-item-content">
                    {
                        selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_DETAILS"]
                    }
                </div>
            </div>
        })
    };

    render() {
        const {
            selectedRightsBySuperRight,
            rightsPackage,
            PROGRAM_SCRIPT,
            PROGRAM_SUBTITLES,
            PROGRAM_LANGUAGE,
            COMMENTS_RIGHTS,
            COMMENTS_PRODUCTION,
            HL_INPUT,
            NA_INPUT,
            programDescription,
            startDateMode,
            startDate,
            endDateMode,
            endDateLimit,
            endDate
        } = this.props;
        let packagesAvailable = rightsPackage.map(rp =>rp.shortLabel);
        let liveFeedPackages = rightsPackage.filter(rp =>rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE");
        let deliveryViaLiveFeed = liveFeedPackages.length > 0 && packagesAvailable.indexOf("LT") === -1;
        let highlightRight = rightsPackage.filter(rp =>rp.shortLabel === "HL");
        let highlightIsDedicated = highlightRight.length > 0 && highlightRight[0].selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_DEDICATED";


        return (
            <div className="term-sheet">

                {programDescription && (
                    <div className="description-wrapper">
                        <div className="title spacer-bottom">
                            {this.context.t("LISTING_DETAILS_PROGRAM_DEFINITION")}
                        </div>
                        <div className="txt description-text">
                            <RepresenationTextArea value={programDescription} />
                        </div>
                    </div>
                )}

                <div className="additional-items">
                    <div className="item">
                        <i className="fa fa-calendar-check-o icon" />
                        <div className="cap">
                            {this.context.t("LISTING_DETAILS_LICENSE_START")}:
                        </div>
                        <div className="d-flex">
                            <b>
                                { startDateMode !== "DATE"  && this.context.t("LISTING_DETAILS_LICENSE_START_CONCLUSION")}
                                { startDateMode === "DATE"  && " " + Moment(startDate).format(DATE_FORMAT)}
                            </b>
                        </div>
                    </div>
                    <div className="item">
                        <i className="fa fa-calendar-times-o icon" />
                        <div className="cap">
                            {this.context.t("LISTING_DETAILS_LICENSE_END")}:
                        </div>
                        <div className="d-flex">
                            <b>
                                { endDateMode === "LIMITED"  && " " + endDateLimit + this.context.t("LISTING_DETAILS_LICENSE_END_DAYS")}
                                { endDateMode === "DATE"  && " " +Moment(endDate).format(DATE_FORMAT)}
                                { endDateMode === "UNLIMITED"  && this.context.t(" Unlimited")}
                            </b>
                        </div>
                    </div>
                </div>

                <div className="term-sheet-items">
                    <div className="row">
                        <div className="right-definition right-definition-title">
                            {this.context.t("LISTING_DETAILS_RIGHTS_HEADER_RIGHTS")}
                        </div>
                        {
                            rightsPackage.map((rp, i)=>{
                                return <div key={"rp-grant" + i } className="right-definition right-definition-title">
                                    {
                                        rp.name
                                    }
                                </div>
                            })
                        }
                    </div>
                    { this.renderList(RightDefinitions, false) }

                    { ( this.hasRight("NA") && this.hasRight("HL") ) &&
                    <div className={'row'} key={'transmission'}>
                        <div className="right-name right-definition">
                            {this.context.t("LISTING_DETAILS_RIGHTS_HEADER_GRANTED_TIME")}
                        </div>
                        {
                            rightsPackage.map((rp,k)=>{
                                return <div  className="right-definition" key={'list_childs'+k}>
                                    {rp.shortLabel === "NA" && NA_INPUT + " seconds" }
                                    {rp.shortLabel === "HL" && HL_INPUT + " minutes" }
                                    {rp.shortLabel !== "NA" && rp.shortLabel !== "HL" && "-" }
                                </div>
                            })
                        }
                    </div>
                    }
                </div>

                <div>
                    { this.renderTextarea(RightDefinitions) }
                </div>

                { COMMENTS_RIGHTS && (
                    <div>
                        <div className="title spacer">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TITLE_AMENDMENTS")}
                        </div>
                        <div className="txt description-text">
                            <RepresenationTextArea
                                value={COMMENTS_RIGHTS} />

                        </div>
                    </div>
                )}

                <div className="term-sheet-items">
                    <div className="row">
                        <div className="right-definition right-definition-title">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TITLE_PRODUCTION_DETAILS")}
                        </div>

                        {deliveryViaLiveFeed
                        && <div key={"rp-prod-live" } className="right-definition right-definition-title">
                            Live Feed
                        </div>
                        }
                        {
                            rightsPackage.map((rp, i)=>{
                                if ( ( rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE"
                                        || ( highlightIsDedicated && rp.selectedRights.CONTENT_DELIVERY_NA === "CONTENT_DELIVERY_NA_HIGHLIGHT" ) ) &&
                                    rp.shortLabel !== "PR" &&
                                    rp.shortLabel !== "LT" ) return;

                                return (
                                    <div key={"rp-prod" + i } className="right-definition right-definition-title">

                                        {rp.selectedRights['CONTENT_DELIVERY_NA']==="CONTENT_DELIVERY_NA_HIGHLIGHT" &&
                                        SuperRightProductionDetailsLabels['HL']}

                                        {rp.selectedRights['CONTENT_DELIVERY_NA']!=="CONTENT_DELIVERY_NA_HIGHLIGHT" &&
                                        SuperRightProductionDetailsLabels[rp.shortLabel]}
                                    </div>
                                )
                            })
                        }
                    </div>
                    { this.renderList(ProductionStandardsDefinitions, true, deliveryViaLiveFeed, liveFeedPackages) }

                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_LANGUAGE && this.renderProgramInfo(PROGRAM_LANGUAGE, "Languages", deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated) }
                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SUBTITLES && this.renderProgramInfo(PROGRAM_SUBTITLES, "Subtitles", deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated) }
                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SCRIPT && this.renderProgramInfo(PROGRAM_SCRIPT, "Script", deliveryViaLiveFeed, liveFeedPackages, highlightIsDedicated) }
                </div>

                <div>
                    { this.renderTextarea(ProductionStandardsDefinitions) }
                </div>

                {
                    selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"] &&(
                    <div >
                        <div className="title spacer">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TECHNICAL_FEE_DETAILS")}
                        </div>
                        <div className="txt description-text">
                            {selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"]}
                        </div>
                    </div>
                )}

                { COMMENTS_PRODUCTION && (
                    <div>
                        <div className="title spacer">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TITLE_AMENDMENTS_2")}
                        </div>
                        <div  className="txt description-text">
                            {COMMENTS_PRODUCTION}
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

TermSheet.contextTypes = {
    t: PropTypes.func.isRequired
};

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
)(TermSheet)