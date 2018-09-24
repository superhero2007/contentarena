import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {RightDefinitions} from "../../sell/components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../../sell/components/ProductionStandardsDefinitions";
import {RightItemsDefinitions} from "../../sell/components/RightItemsDefinitions";
import {SuperRightProductionDetailsLabels} from "../../sell/components/SuperRightDefinitions";
import {PropTypes} from "prop-types";
import Moment from "moment/moment";

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

    renderProgramInfo = (values, name, i) => {
        const { rightsPackage } = this.props;
        return <div className='row' key={'program'+i}>
                <div className="right-name right-definition">{name}</div>
                {
                    rightsPackage.map((rp,k)=>{
                        if ( rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_NON_DEDICATED") return;
                        if ( rp.shortLabel !== 'PR' ) return <div className="right-definition"/>;

                        return <div  className="right-definition" key={"program_child"+k}>
                            { values && values.length === 0 && "No" }
                            { values && values.length > 0 && values.map(l=>l.label).join(", ") }
                        </div>
                    })
                }
            </div>
    };

    renderList = (definitions, checkContentDelivery) => {
        const {selectedRightsBySuperRight, rightsPackage, LICENSED_LANGUAGES} = this.props;
        if (checkContentDelivery) {
            definitions = this.getFilteredByDelivery(definitions, rightsPackage);
        }
        return definitions.map( (right, i) => {

            if (right.key === 'CONTENT_DELIVERY') return;
            if (right.key === 'PROGRAM') return;

            if ( right.key === "LICENSED_LANGUAGES") {
                if (!LICENSED_LANGUAGES || LICENSED_LANGUAGES.length === 0) return false;
            }

            return <div className='row' key={'list'+i}>
                <div className="right-name right-definition">{right.name}</div>
                {
                    rightsPackage.map((rp,k)=>{

                        if ( checkContentDelivery && rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_NON_DEDICATED") return;

                        if ( right.key === 'LICENSED_LANGUAGES' ) return <div className="right-definition">
                            {LICENSED_LANGUAGES.map(l=>l.label).join(", ")}
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

    getFilteredByDelivery = (definitions, rightsPackage) => {
        //filter definitions by user chosen rightPackage
        return definitions.filter(d => {
            if (d.checkDelivery) {
                return rightsPackage.some(p =>
                    !(p.selectedRights['CONTENT_DELIVERY'] === "CONTENT_DELIVERY_NON_DEDICATED" ||
                        p.shortLabel === "PR" && d.key !== 'TECHNICAL_DELIVERY')
                )
            } else {
                return true
            }
        });
    }

    renderTextarea = (definitions) => {
        const {selectedRightsBySuperRight, rightsPackage} = this.props;
        return definitions.map( (right,i) => {
            if (right.key === 'PROGRAM' || !selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_TEXTAREA"]) return;
            return (
                <div key={'textarea_'+i}>
                    <div className="title spacer">
                        {right.name}
                    </div>
                    <div className="txt">
                        {selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_TEXTAREA"]}
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

        return (
            <div className="term-sheet">

                {programDescription && (
                    <div className="txt">
                        {programDescription}
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
                                { startDateMode === "DATE"  && " " + Moment(startDate).format('DD/MM/YYYY')}
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
                                { endDateMode === "DATE"  && " " +Moment(endDate).format('DD/MM/YYYY')}
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
                        <div className="txt">
                            {COMMENTS_RIGHTS}
                        </div>
                    </div>
                )}

                <div className="term-sheet-items">
                    <div className="row">
                        <div className="right-definition right-definition-title">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TITLE_PRODUCTION_DETAILS")}
                        </div>
                        {
                            rightsPackage.map((rp, i)=>{
                                if ( rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_NON_DEDICATED") return;
                                let viaLiveFeed = rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_LIVE";

                                return (
                                    <div key={"rp-prod" + i } className="right-definition right-definition-title">
                                        {SuperRightProductionDetailsLabels[rp.shortLabel]}
                                        {viaLiveFeed && " (via live feed)"}
                                    </div>
                                )
                            })
                        }
                    </div>
                    { this.renderList(ProductionStandardsDefinitions, true) }

                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_LANGUAGE && this.renderProgramInfo(PROGRAM_LANGUAGE, "Languages") }
                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SUBTITLES && this.renderProgramInfo(PROGRAM_SUBTITLES, "Subtitles") }
                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SCRIPT && this.renderProgramInfo(PROGRAM_SCRIPT, "Script") }
                </div>

                <div>
                    { this.renderTextarea(ProductionStandardsDefinitions) }
                </div>

                {selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"] && (
                    <div>
                        <div className="title spacer">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TECHNICAL_FEE_DETAILS")}
                        </div>
                        <div className="txt">
                            {selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"]}
                        </div>
                    </div>
                )}

                { COMMENTS_PRODUCTION && (
                    <div>
                        <div className="title spacer">
                            {this.context.t("LISTING_DETAILS_RIGHTS_TITLE_AMENDMENTS_2")}
                        </div>
                        <div  className="txt">
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