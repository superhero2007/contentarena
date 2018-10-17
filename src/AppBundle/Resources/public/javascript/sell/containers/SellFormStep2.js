import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import {SummaryText} from "../components/SellFormItems";
import {RightDefinitions} from "../components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../components/ProductionStandardsDefinitions";
import { stepChangeReset, changeAllEpisodeFlag} from "../actions/contentActions";
import {editedProgramSelected} from "../../main/actions/utils";
import {PropTypes} from "prop-types";

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
        // console.log("Step 2 - props", nextProps);
        window.content = nextProps;
    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
    };

    handleCheckboxChange = () => {
        const { changeAllEpisodeFlag, EDIT_PROGRAM_DESCRIPTION_OPTIONAL } = this.props;
        changeAllEpisodeFlag(!EDIT_PROGRAM_DESCRIPTION_OPTIONAL);
    };

    updateRight = (rightsPackage) => {
        this.props.superRightsUpdated(rightsPackage);
    };

    superRightsEnabled = ( superRights ) => {
        var selected = this.props.rightsPackage.map(a => a.shortLabel);
        return superRights.filter(r => selected.indexOf(r) !== -1).length > 0;
    };

    scroll = () => {
        const { stepChange, stepChangeReset } = this.props;

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
            EDIT_PROGRAM_DESCRIPTION_OPTIONAL,
            rightsPackage,
            step,
            sports,
            sportCategory,
            tournament,
            seasons
        } = this.props;
        if ( step !== 2) return (null);

        let editedProgram = editedProgramSelected(rightsPackage);

        this.scroll();
        return (

            <div className="step-content step-2">
                {(sports.length || sportCategory.length || tournament.length ||  seasons.length) && (
                    <div className="listing-summary">
                        <SummaryText {...this.props}/>
                    </div>
                )}

                {/*PROGRAM DESCRIPTION*/}
                <div className="step-content-container">
                    <div className="textarea-input">
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_DESCRIPTION_TITLE")}
                        </label>
                        <div className='textarea-input-text'>
                            {this.context.t("CL_STEP2_PROGRAM_DESCRIPTION_TEXT")}
                        </div>
                        <textarea
                            onChange={ (e) => updateContentValue("programDescription", e.target.value)}
                            defaultValue={programDescription}
                            placeholder={this.context.t("CL_STEP2_PROGRAM_DESCRIPTION_PLACEHOLDER")}/>
                    </div>
                </div>

                {/*SUPER RIGHTS*/}
                <PackageSelector packages={this.props.packages}/>

                {/* PROGRAM DETAILS*/}
                {editedProgram && <div>

                <div className="left">
                    <div className="modal-input">
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_NAME")}
                        </label>
                        <input
                            type="text"
                            value={PROGRAM_NAME}
                            onChange={(e)=>{updateContentValue("PROGRAM_NAME", e.target.value)}}/>
                    </div>

                    <div className="modal-input">
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_EPISODES")}
                        </label>
                        <input
                            type="number"
                            value={PROGRAM_EPISODES}
                            onChange={(e)=>{updateContentValue("PROGRAM_EPISODES", Number(e.target.value))}}/>
                    </div>

                    <div className="modal-input">
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_DURATION")}
                        </label>
                        <input
                            type="number"
                            value={PROGRAM_DURATION}
                            onChange={(e)=>{updateContentValue("PROGRAM_DURATION", Number(e.target.value))}}/>
                    </div>

                    <div className="modal-input">
                        <label htmlFor="similar-length">
                            {this.context.t("LISTING_DETAILS_PROGRAM_ENTER_DETAILS_VIA_EDITED_PROGRAM_DESC")}
                        </label>
                        <input
                            id="similar-length"
                            className='ca-checkbox package-selector'
                            type='checkbox'
                            checked={EDIT_PROGRAM_DESCRIPTION_OPTIONAL}
                            onChange={this.handleCheckboxChange}
                        />
                        <div className="checkbox-custom" />

                    </div>
                    {!EDIT_PROGRAM_DESCRIPTION_OPTIONAL && <div className="modal-input red-text">
                        {this.context.t("LISTING_DETAILS_PROGRAM_SIMILAR_LENGTH_EPISODES")}
                    </div>}
                    <div className="modal-input">
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_TYPE")}
                        </label>
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
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_YEAR")}
                        </label>
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
                        <label>
                            {this.context.t("CL_STEP2_PROGRAM_DESCRIPTION")}
                        </label>
                        <textarea
                            onChange={(e)=>{updateContentValue("PROGRAM_DESCRIPTION", e.target.value)}}
                            placeholder={this.context.t("CL_STEP2_PROGRAM_DESCRIPTION_OPTIONAL_PLACEHOLDER")}>
                            {PROGRAM_DESCRIPTION}
                        </textarea>
                    </div>
                </div>
                <div className='clearfix'/>
                </div>}
            </div>
        );
    }
}

SellFormStep2.contextTypes = {
    t: PropTypes.func.isRequired
};

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
        stepChangeReset : () => dispatch(stepChangeReset()),
        changeAllEpisodeFlag: (flag) => dispatch(changeAllEpisodeFlag(flag))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep2)
