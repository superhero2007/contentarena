import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {RightDefinitions} from "../../sell/components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../../sell/components/ProductionStandardsDefinitions";
import {RightItemsDefinitions} from "../../sell/components/RightItemsDefinitions";
import {SuperRightProductionDetailsLabels} from "../../sell/components/SuperRightDefinitions";

class TermSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderProgramInfo = (values, name, i) => {
        const { rightsPackage } = this.props;
        return <div className={'row '+(i%2 ? 'odd-row':'')}>
                <div className="right-name right-definition">{name}</div>
                {
                    rightsPackage.map((rp)=>{
                        if ( rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_NON_DEDICATED") return;
                        if ( rp.shortLabel !== 'PR' ) return <div className="right-definition"/>;

                        return <div  className="right-definition">
                            { values && values.length === 0 && "No" }
                            { values && values.length > 0 && values.map(l=>l.label).join(", ") }
                        </div>
                    })
                }
            </div>
    };

    renderList = (definitions, checkContentDelivery) => {
        const {selectedRightsBySuperRight, rightsPackage, LICENSED_LANGUAGES} = this.props;
        return definitions.map( (right, i) => {

            if (right.key === 'CONTENT_DELIVERY') return;
            if (right.key === 'PROGRAM') return;

            if ( right.key === "LICENSED_LANGUAGES") {
                if (!LICENSED_LANGUAGES || LICENSED_LANGUAGES.length === 0) return false;
            }

            return <div className={'row '+(i%2 ? 'odd-row':'')}>
                <div className="right-name right-definition">{right.name}</div>
                {
                    rightsPackage.map((rp)=>{
                        if ( checkContentDelivery && rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_NON_DEDICATED") return;

                        if ( checkContentDelivery &&
                            rp.shortLabel === "PR"
                            && right.key !== 'TECHNICAL_DELIVERY' ) return <div className="right-definition">
                            -
                        </div>;

                        if ( right.key === 'LICENSED_LANGUAGES' ) return <div className="right-definition">
                            {LICENSED_LANGUAGES.map(l=>l.label).join(", ")}
                        </div>;


                        let definition = selectedRightsBySuperRight[rp.id].items[right.key];

                        return <div  className="right-definition">
                            {
                                !right.multiple && definition && RightItemsDefinitions[definition].label
                            }
                            {
                                right.multiple &&
                                selectedRightsBySuperRight[rp.id].items[right.key].map(item => RightItemsDefinitions[item].label).join(", ")
                            }

                            {right.key === 'CAMERA'
                                && <span style={{marginLeft: 5}}>{selectedRightsBySuperRight[rp.id].items["CAMERAS"]}</span>}
                        </div>
                    })
                }
            </div>
        })
    };

    renderTextarea = (definitions) => {
        const {selectedRightsBySuperRight, rightsPackage} = this.props;
        return definitions.map( (right) => {
            if (right.key === 'PROGRAM' || !selectedRightsBySuperRight[rightsPackage[0].id].items[right.key+"_TEXTAREA"]) return;
            return <div className="term-sheet-full-item-box">
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
            COMMENTS_RIGHTS, COMMENTS_PRODUCTION} = this.props;
        let packagesAvailable = rightsPackage.map(rp =>rp.shortLabel);

        return (
            <div className="term-sheet">

                <div className="term-sheet-items">
                    <div className="row" style={{
                        border: 'none'
                    }} >
                        <div className="right-definition right-definition-title">Grant of Rights</div>
                        {
                            rightsPackage.map((rp, i)=>{
                                return <div key={"rp-" + i } className="right-definition right-definition-title">
                                    {
                                        rp.name
                                    }
                                </div>
                            })
                        }
                    </div>
                    { this.renderList(RightDefinitions, false) }
                </div>

                <div>
                    { this.renderTextarea(RightDefinitions) }
                    { this.renderTextarea(ProductionStandardsDefinitions) }

                    {
                        selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"] &&
                        <div className="term-sheet-full-item-box">
                            <label>Technical Fee Details</label>
                            <div  className="full-item-content">
                                {
                                    selectedRightsBySuperRight[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"]
                                }
                            </div>
                        </div>
                    }

                </div>

                { COMMENTS_RIGHTS && <div className="term-sheet-full-item-box">
                    <label>Amendment(s) to the Grant of Rights / Special Conditions</label>
                    <div  className="full-item-content">
                        {
                            COMMENTS_RIGHTS
                        }
                    </div>
                </div>}

                <div className="term-sheet-items">
                    <div className="row" style={{
                        border: 'none'
                    }}>
                        <div className="right-definition right-definition-title">Production details</div>
                        {
                            rightsPackage.map((rp, i)=>{
                                if ( rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_NON_DEDICATED") return;
                                let viaLiveFeed = rp.selectedRights['CONTENT_DELIVERY']==="CONTENT_DELIVERY_LIVE";

                                return <div key={"rp-" + i }className="right-definition right-definition-title">
                                    {
                                        SuperRightProductionDetailsLabels[rp.shortLabel]
                                    }
                                    {viaLiveFeed && " (via live feed)"}
                                </div>
                            })
                        }
                    </div>
                    { this.renderList(ProductionStandardsDefinitions, true) }

                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_LANGUAGE && this.renderProgramInfo(PROGRAM_LANGUAGE, "Languages") }
                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SUBTITLES && this.renderProgramInfo(PROGRAM_SUBTITLES, "Subtitles") }
                    { packagesAvailable.indexOf("PR") !== -1 && PROGRAM_SCRIPT && this.renderProgramInfo(PROGRAM_SCRIPT, "Script") }
                </div>

                { COMMENTS_PRODUCTION && <div className="term-sheet-full-item-box">
                    <label>Amendment(s) to the Content Delivery / Special Conditions</label>
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