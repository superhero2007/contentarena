import React from 'react';
import { connect } from "react-redux";
import Moment from "moment";
import PopupRight from "../components/PopupRight";
import LicenseDateSelector from "../components/LicenseDateSelector";
import {RightDefinitions} from "../components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../components/ProductionStandardsDefinitions";
import {SummaryText, TitleBar} from "../components/SellFormItems";
import {stepChangeReset} from "../actions/contentActions";
import {PropTypes} from "prop-types";
import { DATE_FORMAT } from "@constants";
import RightsLegend from "../../main/components/RightsLegend";
import {blueCheckIcon, yellowCheckIcon} from "../../main/components/Icons";

const licenseStyles = {
    fontSize: "15px",
    fontWeight: "100",
    justifyContent: "left"
};

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            licensePopup : false,
            rights : RightDefinitions,
            productionStandards : ProductionStandardsDefinitions,
            contentDeliveryShouldBeConfigured: !ProductionStandardsDefinitions.find(item => this.skipContentDelivery(item)),
            contentDeliveryConfigured: props.contentDeliveryConfigured
        };

        this.updateContentDeliveryStatus();

        this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
    }

    componentWillReceiveProps(nextProps) {
        const { rightsPackage, contentDeliveryConfigured } = this.props;

        if (rightsPackage !== nextProps.rightsPackage || contentDeliveryConfigured !== nextProps.contentDeliveryConfigured) {
            this.setState({
                contentDeliveryShouldBeConfigured: !ProductionStandardsDefinitions.find(item => this.skipContentDelivery(item, nextProps)),
                contentDeliveryConfigured: nextProps.contentDeliveryConfigured
            }, () => this.updateContentDeliveryStatus());
        }
    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
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

    skipContentDelivery = (right, { rightsPackage } = this.props) => {
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

    render() {

        const {
            step,
            rightsPackage,
            startDateMode,
            endDateMode,
            endDate,
            updateContentValue,
            PROGRAM_NAME,
            LICENSED_LANGUAGES,
            validation
        } = this.props;
        if ( step !== 3) return (null);
        this.scroll();

        const isLicenseInvalid = !endDateMode && validation;

        return (

            <div className="step-content step-3">
                <div style={{width: '100%', textAlign: 'right', marginBottom: 10}}>
                    <RightsLegend />
                </div>

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
                                    <img style={{width: 23, height: 22, margin: '0 5px'}} src={blueCheckIcon}/>}

                                    {sr.exclusive &&
                                    <img style={{width: 23, height: 22, margin: '0 5px'}} src={yellowCheckIcon}/>}

                                    <div style={{display: 'flex', flexDirection: "row"  }}>
                                        { sr.shortLabel !== "PR" && sr.name }
                                        { sr.shortLabel === "PR" && content.PROGRAM_NAME &&
                                        "Edited Program"
                                        }
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

                    <TitleBar title={"License period"} />

                    <div className={"license-date-container"}>
                        <div className="table-right">
                            <div className="row">
                                <div className="column right-name">
                                    {this.context.t("CL_STEP3_TITLE_LICENSE_PERIOD_START")}
                                </div>
                                <div className="column right-item-content" style={licenseStyles} onClick={this.showLicensePopup}>
                                    { this.props.startDateMode === "LICENSE"  && " contract conclusion"}
                                    { this.props.startDateMode === "DATE"  && Moment(this.props.startDate).format(DATE_FORMAT)}
                                </div>
                                <div className="column right-name">
                                    {this.context.t("CL_STEP3_TITLE_LICENSE_PERIOD_END")}
                                </div>
                                <div className={`column right-item-content ${isLicenseInvalid ? 'is-invalid' : ''}`}  style={licenseStyles} onClick={this.showLicensePopup}>

                                    {isLicenseInvalid ? (
                                        this.context.t('LICENSE_PERIOD_EMPTY')
                                    ) : (
                                        <span>
                                            {endDateMode === "LIMITED" && this.props.endDateLimit + this.context.t("LISTING_DETAILS_LICENSE_END_DAYS")}
                                            {endDateMode === "DATE"  && Moment(this.props.endDate).format(DATE_FORMAT)}
                                            {endDateMode === "UNLIMITED"  && this.context.t("Unlimited")}
                                            {!endDateMode && this.context.t("CL_STEP3_SELECT_LICENSE_PERIOD")}
                                        </span>
                                    )}

                                    <div className="column right-item-content edit-item" onClick={this.showLicensePopup}>
                                        <i className="fa fa-edit"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TitleBar title={this.context.t("CL_STEP3_TITLE_GRANT_RIGHT")}/>

                    <div className="rights-container">
                        {
                            this.state.rights.length > 0 && this.state.rights.map((right, i)=> {

                                if ( right.superRights.length > 0
                                    && !this.superRightsEnabled(right.superRights)) return;

                                let rightKeyPreffix = "RIGHTS_";
                                let rightKeySuffix = "_DESCRIPTION";

                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={this.context.t(rightKeyPreffix + right.key )}
                                    description={this.context.t(rightKeyPreffix + right.key + rightKeySuffix )}
                                    global={right.global}
                                    language={right.language}
                                    languages={LICENSED_LANGUAGES}
                                    options={right.options}
                                    multiple={right.multiple}
                                    superRights={right.superRights}
                                    showTextArea={right.showTextArea}
                                    textAreaRequired={right.textAreaRequired}
                                    onUpdate={this.updateRight}
                                    onUpdateListing={(k, v)=>{updateContentValue(k,v)}}
                                    rightsPackage={this.props.rightsPackage}/>
                            })
                        }
                    </div>

                    <TitleBar title={this.context.t("CL_STEP3_TITLE_PRODUCTION_STANDARDS")}/>

                    <div className="rights-container">
                        {
                            this.state.productionStandards.length > 0 && this.state.productionStandards.map((right, i)=> {

                                let superRights = right.superRights;

                                if ( right.superRights.length > 0
                                    && !this.superRightsEnabled(right.superRights)) return;

                                if ( this.skipContentDelivery(right) ) return;

                                const { contentDeliveryShouldBeConfigured, contentDeliveryConfigured }  = this.state;

                                const rightDisabled = contentDeliveryShouldBeConfigured &&
                                    !contentDeliveryConfigured && right.key !== "CONTENT_DELIVERY";

                                let rightKeyPreffix = "RIGHTS_";
                                let rightKeySuffix = "_DESCRIPTION";

                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={this.context.t(rightKeyPreffix + right.key )}
                                    description={this.context.t(rightKeyPreffix + right.key + rightKeySuffix )}
                                    selected={this.props[right.key]}
                                    options={right.options}
                                    multiple={right.multiple}
                                    productionLabel={right.productionLabel}
                                    checkContentDelivery={true}
                                    programName={PROGRAM_NAME}
                                    onOKClicked={this.onProductionPopupOKClicked}
                                    onProgram={() => {
                                        this.setState({
                                            programPopupActive : true,
                                        });
                                    }}
                                    content={this.props}
                                    superRights={superRights}
                                    showTextArea={right.showTextArea}
                                    textAreaRequired={right.textAreaRequired}
                                    technicalFee={right.technicalFee}
                                    onUpdate={this.updateRight}
                                    onUpdateListing={(k, v)=>{updateContentValue(k,v)}}
                                    rightsPackage={this.props.rightsPackage}
                                    disabled={rightDisabled}
                                    contentDeliveryConfigured={this.props.contentDeliveryConfigured}
                                    validation={validation}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    showLicensePopup = () => {
        this.setState({
            licensePopup: true
        });
    };

    onProductionPopupOKClicked = (name) => {
        const { updateContentValue } = this.props;

        if (name === "CONTENT_DELIVERY") {
            updateContentValue("contentDeliveryConfigured", true);
            this.setState({
                contentDeliveryConfigured: true
            });
        }
    };

    updateContentDeliveryStatus = () => {
        const { updateContentValue, tempData } = this.props;
        const { contentDeliveryShouldBeConfigured } = this.state;

        updateContentValue("tempData", { ...tempData, CONTENT_DELIVERY_SHOULD_BE_CONFIGURED: contentDeliveryShouldBeConfigured });
    }
}
SellFormStep3.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        ...state.content,
        validation: state.validation
    }
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
)(SellFormStep3);
