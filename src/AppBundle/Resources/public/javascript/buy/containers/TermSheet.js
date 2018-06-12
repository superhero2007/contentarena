import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import {RightDefinitions} from "../../sell/components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../../sell/components/ProductionStandardsDefinitions";
import {RightItemsDefinitions} from "../../sell/components/RightItemsDefinitions";

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
        return definitions.map( (right) => {

            if (right.key === 'PROGRAM') return;

            return <div className="row">
                <div className="right-name">{right.name}</div>
                {
                    rightsPackage.map((rp)=>{
                        return <div  className="right-definition">
                            {
                                RightItemsDefinitions[selectedRights[rp.id].items[right.key]].label
                            }
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
                    { this.renderList(RightDefinitions) }
                    { this.renderList(ProductionStandardsDefinitions) }
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