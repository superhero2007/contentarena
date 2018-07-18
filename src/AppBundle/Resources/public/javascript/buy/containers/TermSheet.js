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

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    hasTextarea = () => {

    };

    renderList = (definitions) => {
        const {selectedRights, rightsPackage} = this.props;
        return definitions.map( (right, i) => {

            if (right.key === 'PROGRAM') return;

            return <div className={'row '+(i%2 ? 'odd-row':'')}>
                <div className="right-name right-definition">{right.name}</div>
                {
                    rightsPackage.map((rp)=>{
                        let definition = selectedRights[rp.id].items[right.key];
                        return <div  className="right-definition">
                            {
                                !right.multiple && definition && RightItemsDefinitions[definition].label
                            }

                            {
                                right.multiple &&
                                selectedRights[rp.id].items[right.key].map(item => RightItemsDefinitions[item].label).join(", ")
                            }

                            {right.key === 'CAMERA'
                                && <span style={{marginLeft: 5}}>{selectedRights[rp.id].items["CAMERAS"]}</span>}
                        </div>
                    })
                }
            </div>
        })
    };

    renderTextarea = (definitions) => {
        const {selectedRights, rightsPackage} = this.props;
        return definitions.map( (right) => {
            if (right.key === 'PROGRAM' || !selectedRights[rightsPackage[0].id].items[right.key+"_TEXTAREA"]) return;
            return <div className="full-item-box">
                <label>{right.name}</label>
                <div  className="full-item-content">
                    {
                        selectedRights[rightsPackage[0].id].items[right.key+"_TEXTAREA"]
                    }
                </div>
            </div>
        })
    };

    renderDetails= (definitions) => {
        const {selectedRights, rightsPackage} = this.props;
        return definitions.map( (right) => {
            if (right.key === 'PROGRAM' || !selectedRights[rightsPackage[0].id].items[right.key+"_DETAILS"]) return;
            return <div className="full-item-box">
                <label>{right.name}</label>
                <div  className="full-item-content">
                    {
                        selectedRights[rightsPackage[0].id].items[right.key+"_DETAILS"]
                    }
                </div>
            </div>
        })
    };

    render() {
        const {selectedRights, rightsPackage} = this.props;
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
                    { this.renderList(RightDefinitions) }
                </div>

                <div style={{marginTop: 20}}>
                    { this.renderTextarea(RightDefinitions) }
                    { this.renderTextarea(ProductionStandardsDefinitions) }

                    {
                        selectedRights[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"] &&
                        <div className="full-item-box">
                            <label>Technical Fee Details</label>
                            <div  className="full-item-content">
                                {
                                    selectedRights[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"]
                                }
                            </div>
                        </div>
                    }

                </div>

                <div className="term-sheet-items">
                    <div className="row" style={{
                        border: 'none'
                    }}>
                        <div className="right-definition right-definition-title">Production details</div>
                        {
                            rightsPackage.map((rp, i)=>{
                                return <div key={"rp-" + i }className="right-definition right-definition-title">
                                    {
                                        SuperRightProductionDetailsLabels[rp.shortLabel]
                                    }
                                </div>
                            })
                        }
                    </div>
                    { this.renderList(ProductionStandardsDefinitions) }
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
)(TermSheet)