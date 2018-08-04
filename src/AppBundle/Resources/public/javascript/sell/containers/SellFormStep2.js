import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import {SummaryText, TitleBar} from "../components/SellFormItems";
import {RightDefinitions} from "../components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../components/ProductionStandardsDefinitions";
import {stepChangeReset} from "../actions/contentActions";
import {editedProgramSelected} from "../../main/actions/utils";

class SellFormStep2 extends React.Component {

    constructor(props) {
        super(props);

        let startYear = 2030;
        let years = [];

        for (let i =0; i < 81;i++ ){ years.push(startYear-i)}

        this.state = {
            years : years,
            title : "Step 2 - Configure Rights",
            licensePopup : false,
            rights : RightDefinitions,
            productionStandards : ProductionStandardsDefinitions
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log("Step 2 - props", nextProps);
        window.content = nextProps;
    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
    };

    updateRight = (rightsPackage) => {
        this.props.superRightsUpdated(rightsPackage);
    };

    superRightsEnabled = ( superRights ) => {

        var selected = this.props.rightsPackage.map(a => a.shortLabel);

        return superRights.filter(r => selected.indexOf(r) !== -1).length > 0;

    };

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }

    };

    render() {

        const {
            programDescription,
            updateContentValue,
            PROGRAM_NAME,
            PROGRAM_EPISODES,
            PROGRAM_YEAR,
            PROGRAM_TYPE,
            PROGRAM_DURATION,
            PROGRAM_DESCRIPTION,
            rightsPackage,
            step,
        } = this.props;
        if ( step !== 2) return (null);

        let editedProgram = editedProgramSelected(rightsPackage);

        this.scroll();
        return (

            <div className="step-content step-2">

                {/*SUMMARY*/}
                <div className="listing-summary">
                    <SummaryText {...this.props}/>
                </div>

                {/*PROGRAM DESCRIPTION*/}
                <div className="step-content-container">

                    {/*<div className="base-input">
                        <label>event</label>
                        {
                            !this.props.isCustom &&
                            <input type="text"
                                   value={this.props.value}
                                   readOnly={false}
                                   onClick={this.props.onClick}
                                   placeholder={"Soccer-Germany-Bundesliga-2018/19 "}  />
                        }
                    </div>*/}

                    <div className="textarea-input">
                        <label>PROGRAM DESCRIPTION</label>
                        <div style={{margin: 10}}>
                            Which program do you wish to license? This may include events and/or produced content. All rights, selected later on, will refer to this.
                        </div>
                        <textarea
                            onChange={ (e) => updateContentValue("programDescription", e.target.value)}
                            defaultValue={programDescription}
                            placeholder={"Please enter the program description. The program description represents the core of the license agreement. All rights picked later on refer to this program description. You may enter all information you consider relevant (e.g. which events you seek to grant rights to or which events you will produce and deliver to the buyer). \n"}/>
                    </div>
                </div>

                {/*SUPER RIGHTS*/}
                <PackageSelector packages={this.props.packages}/>

                {/* PROGRAM DETAILS*/}
                {editedProgram && <div>

                <div className="left">
                    <div className="modal-input">
                        <label>Enter program name</label>
                        <input
                            type="text"
                            value={PROGRAM_NAME}
                            onChange={(e)=>{updateContentValue("PROGRAM_NAME", e.target.value)}}
                            placeholder="Tennis Preview Show"/>
                    </div>

                    <div className="modal-input">
                        <label>Number of episodes</label>
                        <input
                            type="number"
                            value={PROGRAM_EPISODES}
                            onChange={(e)=>{updateContentValue("PROGRAM_EPISODES", Number(e.target.value))}}
                            min={0}
                            placeholder="1"/>
                    </div>

                    <div className="modal-input">
                        <label>Average episode duration in minutes</label>
                        <input
                            type="number"
                            value={PROGRAM_DURATION}
                            onChange={(e)=>{updateContentValue("PROGRAM_DURATION", Number(e.target.value))}}
                            min={0}
                            placeholder="123"/>
                    </div>

                    <div className="modal-input">
                        <label>Enter program type</label>
                        <select
                            value={PROGRAM_TYPE}
                            onChange={(e)=>{updateContentValue("PROGRAM_TYPE", e.target.value)}}>
                            <option value="SELECT">Select</option>
                            <option value="HIGHLIGHT_SHOW">Highlight show</option>
                            <option value="DOCUMENTARY">Documentary</option>
                            <option value="PREVIEW">Preview</option>
                            <option value="TALK_SHOW">Talk show</option>
                            <option value="OTHER">Other</option>
                        </select>

                    </div>

                    <div className={"modal-input"}>
                        <label>Release year (optional)</label>
                        <select
                            value={PROGRAM_YEAR}
                            onChange={(e)=>{updateContentValue("PROGRAM_YEAR", e.target.value)}}>
                            <option value="Year">Year</option>
                            {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                        </select>
                    </div>
                </div>
                <div className='right'>
                    <div className="modal-input">
                        <label>Edited Program Description (optional)</label>
                        <textarea
                            onChange={(e)=>{updateContentValue("PROGRAM_DESCRIPTION", e.target.value)}}
                            placeholder="Provide a description of your content listing">
                            {PROGRAM_DESCRIPTION}
                        </textarea>
                    </div>
                </div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        superRightsUpdated : (rightsPackage) => dispatch({
            type : 'SUPER_RIGHTS_UPDATED',
            rightsPackage: rightsPackage
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep2)
