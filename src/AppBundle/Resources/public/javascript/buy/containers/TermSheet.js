import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {RightDefinitions} from "../../sell/components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../../sell/components/ProductionStandardsDefinitions";
import {RightItemsDefinitions} from "../../sell/components/RightItemsDefinitions";
import {SuperRightProductionDetailsLabels} from "../../sell/components/SuperRightDefinitions";
import {PropTypes} from "prop-types";

class TermSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderProgramInfo = (values, name, i) => {
        const { rightsPackage } = this.props;
        return <div className={'row '+(i%2 ? 'odd-row':'')} key={'program'+i}>
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

            return <div className={'row '+(i%2 ? 'odd-row':'')} key={'list'+i}>
                <div className="right-name right-definition">{right.name}</div>
                {
                    rightsPackage.map((rp,k)=>{

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
            return <div className="term-sheet-full-item-box" key={'textarea_'+i}>
                <label>{right.name}</label>
                <div  className="full-item-content">
                    {
                        selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_TEXTAREA"]
                    }
                </div>
            </div>
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
        const {selectedRightsBySuperRight, rightsPackage, PROGRAM_SCRIPT, PROGRAM_SUBTITLES, PROGRAM_LANGUAGE,
            COMMENTS_RIGHTS, COMMENTS_PRODUCTION, HL_INPUT, NA_INPUT} = this.props;
        let packagesAvailable = rightsPackage.map(rp =>rp.shortLabel);

        return (
            <div className="term-sheet">

                <div className="term-sheet-items">
                    <div className="row" style={{
                        border: 'none'
                    }} >
                        <div className="right-definition right-definition-title">
                            {this.context.t("Grant of Rights")}
                        </div>
                        {
                            rightsPackage.map((rp, i)=>{
                                return <div key={"rp-grant" + i } className="right-definition right-definition-title">
                                    {
                                        rp.name
                                    }
                                    {this.context.t(" Rights")}
                                </div>
                            })
                        }
                    </div>
                    { this.renderList(RightDefinitions, false) }
                </div>

                <div>
                    { this.renderTextarea(RightDefinitions) }
                    { this.renderTextarea(ProductionStandardsDefinitions) }
                </div>

                <div>
                    {
                        rightsPackage.map((rp, i)=>{
                            if (rp.shortLabel === "HL" && HL_INPUT) return <div className="term-sheet-full-item-box" key={'HL'}>
                                <label>Transmission of Footage</label>
                                <div  className="full-item-content">
                                    Not exceeding {HL_INPUT} minutes not before the end of the relevant Event or the Time Embargo defined
                                </div>
                            </div>

                            if (rp.shortLabel === "NA" && NA_INPUT) return <div className="term-sheet-full-item-box" key={'HL'}>
                                <label>Transmission of Highlight footage</label>
                                <div  className="full-item-content">
                                    Not exceeding {NA_INPUT} seconds in news programs not before the end of the relevant Event or the Time Embargo defined
                                </div>
                            </div>
                        })
                    }
                </div>

                { COMMENTS_RIGHTS && <div className="term-sheet-full-item-box">
                    <label>
                        {this.context.t("Amendment(s) to the Grant of Rights / Special Conditions")}
                    </label>
                    <div  className="full-item-content">
                        {
                            COMMENTS_RIGHTS
                        }
                    </div>
                </div>}

                <div className="term-sheet-items">
                    <div className="row" style={{border: 'none'}}>
                        <div className="right-definition right-definition-title">
                            {this.context.t("Production details")}
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

                {
                    selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"] &&
                    <div className="term-sheet-full-item-box">
                        <label>
                            {this.context.t("Technical Fee Details")}
                        </label>
                        <div  className="full-item-content">
                            {
                                selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"]
                            }
                        </div>
                    </div>
                }

                { COMMENTS_PRODUCTION && <div className="term-sheet-full-item-box">
                    <label>
                        {this.context.t("Amendment(s) to the Content Delivery / Special Conditions")}
                    </label>
                    <div  className="full-item-content">
                        {
                            COMMENTS_PRODUCTION
                        }
                    </div>
                </div>}

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