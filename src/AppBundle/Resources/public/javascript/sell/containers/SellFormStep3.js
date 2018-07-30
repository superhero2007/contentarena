import React from 'react';
import { connect } from "react-redux";
import Modal from 'react-modal';
import Moment from "moment";

import PackageSelector from "../containers/PackageSelector";
import PopupRight from "../components/PopupRight";
import Comments from "../components/Comments";
import LicenseDateSelector from "../components/LicenseDateSelector";

import {RightDefinitions} from "../components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../components/ProductionStandardsDefinitions";
import {SummaryText, TitleBar} from "../components/SellFormItems";
import {stepChangeReset} from "../actions/contentActions";
import {LanguageSelector} from "../../main/components/LanguageSelector";

import {customStyles} from "../../main/styles/custom";

const licenseStyles = {
    fontSize: "12px",
    lineHeight: "14px",
    padding: 0,
    textAlign : "center",
    justifyContent: "center"
};

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            programPopupActive: false,
            licensePopup : false,
            rights : RightDefinitions,
            productionStandards : ProductionStandardsDefinitions
        };
        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";

    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
    };

    closeProgramsPopup = () => {
        this.setState({programPopupActive:false}) ;
    };

    closeLicensePopup = () => {
        this.setState({licensePopup:false}) ;
    };

    selectCurrency = ( currency ) => {
        this.props.updateContentValue('currency', currency);
    };

    selectLicenseDates = (key, value) => {
        this.props.updateContentValue(key, value);
    };

    updateRight = (rightsPackage) => {
        this.props.superRightsUpdated(rightsPackage);
    };

    superRightsEnabled = ( superRights ) => {

        var selected = this.props.rightsPackage.map(a => a.shortLabel);

        return superRights.filter(r => selected.indexOf(r) !== -1).length > 0;

    };

    skipContentDelivery = (right) => {

        const {rightsPackage} = this.props;

        let selected = rightsPackage.map(a => a.shortLabel);

        return right.key === "CONTENT_DELIVERY"
            && selected.indexOf("NA") === -1
            && selected.indexOf("LB") === -1
            && selected.indexOf("HL") === -1
            && selected.indexOf("DT") === -1;

    };

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }

    };

    renderProgramPopup(){

        const {
            onClose,
            updateContentValue,
            PROGRAM_NAME,
            PROGRAM_SUBTITLES,
            PROGRAM_SCRIPT,
            PROGRAM_LANGUAGE
        } = this.props;
        return (
            <Modal
                isOpen={this.state.programPopupActive}
                onRequestClose={this.closeProgramsPopup}
                bodyOpenClassName={"selector"}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className="modal-title">
                    Program details
                    <i className="fa fa-times-circle-o" onClick={onClose}/>
                </div>

                <div className="step-content">
                    <div className="step-content-container" style={{minWidth:500}}>
                        <div className="modal-input">
                            <label>{PROGRAM_NAME}</label>
                        </div>

                        <div className="modal-input">
                            <label>Program language</label>
                            <LanguageSelector
                                value={PROGRAM_LANGUAGE}
                                onChange={(value)=>{updateContentValue('PROGRAM_LANGUAGE', value)}}/>
                        </div>

                        <div className="modal-input">
                            <label>Subtitles (if available)</label>
                            <LanguageSelector
                                value={PROGRAM_SUBTITLES}
                                onChange={(value)=>{updateContentValue('PROGRAM_SUBTITLES', value)}}/>
                        </div>

                        <div className="modal-input">
                            <label>Script (if available)</label>
                            <LanguageSelector
                                value={PROGRAM_SCRIPT}
                                onChange={(value)=>{updateContentValue('PROGRAM_SCRIPT', value)}}/>
                        </div>

                    </div>
                </div>

                <div className={"buttons"}>
                    <button
                        className={"standard-button"}
                        onClick={this.closeProgramsPopup}>Ok</button>
                </div>
            </Modal>
        )
    }

    render() {

        const {step, rightsPackage, startDateMode, endDateMode, endDate, COMMENTS_RIGHTS, COMMENTS_PRODUCTION,
            updateContentValue, PROGRAM_NAME, LICENSED_LANGUAGES
        } = this.props;
        if ( step !== 3) return (null);
        this.scroll();

        return (

            <div className="step-content">
                { this.renderProgramPopup() }

                {/*SUMMARY*/}
                <div className="listing-summary">
                    <SummaryText {...this.props}/>
                </div>

                <div className="step-content-container">

                    {/* RIGHTS*/}
                    <div className={"rights-box"}>
                        {
                            rightsPackage.map(( sr,i )=>{
                                return <div key={i}  className={"rights-box-item"}>
                                    {!sr.exclusive &&
                                    <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.blueCheck}/>}

                                    {sr.exclusive &&
                                    <img style={{width: 23, height: 22, margin: '0 5px'}} src={this.yellowCheck}/>}

                                    <div style={{display: 'flex', flexDirection: "row"  }}>
                                        { sr.shortLabel !== "PR" && sr.name }
                                        { sr.shortLabel === "PR" && content.PROGRAM_NAME &&
                                        "Program: " + content.PROGRAM_NAME
                                        }
                                        {sr.exclusive && <span style={{fontWeight: 600, marginLeft: 3}}> EX</span>}
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <LicenseDateSelector
                        isOpen={this.state.licensePopup}
                        onUpdate={this.selectLicenseDates}
                        startDate={this.props.startDate}
                        endDateLimit={this.props.endDateLimit}
                        endDateMode={endDateMode}
                        startDateMode={startDateMode}
                        endDate={endDate}
                        onClose={this.closeLicensePopup}
                    />

                    <TitleBar title={"License period"}/>

                    <div className={"license-date-container"}>
                        <div className="table-right">
                            <div className="row">
                                <div className="column right-name">Start</div>
                                <div className="column right-item-content" style={licenseStyles} onClick={this.showLicensePopup}>
                                    { !this.props.startDate  && " contract conclusion"}
                                    { this.props.startDate  && Moment(this.props.startDate).format('DD/MM/YYYY')}
                                </div>
                                <div className="column right-name">End</div>
                                <div className="column right-item-content"  style={licenseStyles} onClick={this.showLicensePopup}>
                                    { endDateMode === "LIMITED"  && this.props.endDateLimit + " days from contract conclusion"}
                                    { endDateMode === "DATE"  && Moment(this.props.endDate).format('DD/MM/YYYY')}
                                    { endDateMode === "UNLIMITED"  && "Unlimited"}
                                    { !endDateMode && "Please select"}
                                </div>
                                <div className="column right-item-content edit-item" onClick={this.showLicensePopup}>
                                    <i className="fa fa-edit"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TitleBar title={"Grant of Rights"}/>

                    <div className="rights-container">
                        {
                            this.state.rights.length > 0 && this.state.rights.map((right, i)=> {

                                if ( right.superRights.length > 0
                                    && !this.superRightsEnabled(right.superRights)) return;

                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={right.name}
                                    global={right.global}
                                    language={right.language}
                                    languages={LICENSED_LANGUAGES}
                                    options={right.options}
                                    multiple={right.multiple}
                                    superRights={right.superRights}
                                    showTextArea={right.showTextArea}
                                    onUpdate={this.updateRight}
                                    onUpdateListing={(k, v)=>{updateContentValue(k,v)}}
                                    rightsPackage={this.props.rightsPackage}/>
                            })
                        }
                    </div>

                    <Comments comments={COMMENTS_PRODUCTION} propName={"COMMENTS_PRODUCTION"}/>

                    <TitleBar title={"Configure Production Standards"}/>

                    <div className="rights-container">
                        {
                            this.state.productionStandards.length > 0 && this.state.productionStandards.map((right, i)=> {

                                let superRights = right.superRights;

                                if ( right.superRights.length > 0
                                    && !this.superRightsEnabled(right.superRights)) return;

                                if ( this.skipContentDelivery(right) ) return;

                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={right.name}
                                    selected={this.props[right.key]}
                                    options={right.options}
                                    multiple={right.multiple}
                                    productionLabel={right.productionLabel}
                                    checkContentDelivery={true}
                                    programName={PROGRAM_NAME}
                                    onProgram={() => {
                                        this.setState({
                                            programPopupActive : true,
                                        });
                                    }}
                                    content={this.props}
                                    superRights={superRights}
                                    showTextArea={right.showTextArea}
                                    technicalFee={right.technicalFee}
                                    onUpdate={this.updateRight}
                                    onUpdateListing={(k, v)=>{updateContentValue(k,v)}}
                                    rightsPackage={this.props.rightsPackage}
                                />
                            })
                        }
                    </div>

                    <Comments comments={COMMENTS_RIGHTS} propName={"COMMENTS_RIGHTS"}/>

                </div>
            </div>
        );
    }

    showLicensePopup = () => {
        this.setState({
            licensePopup: true
        });
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
        removeNewSport : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sports",
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
        updateProgram : (index, program, name) => dispatch({
            type: 'UPDATE_PROGRAMS',
            index: index,
            program : program,
            name: name
        }),
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep3)
