import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import PopupRight from "../components/PopupRight";
import Program from "../components/Program";
import LicenseDateSelector from "../components/LicenseDateSelector";
import {TitleBar} from "../components/SellFormItems";
import Moment from "moment";
import {RightDefinitions} from "../components/RightDefinitions";

const licenseStyles = {
    fontSize: "12px",
    lineHeight: "14px",
    padding: 0,
    textAlign : "center",
    justifyContent: "center"
};

class SellFormStep2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : "Step 2 - Configure Rights",
            packagesConfirmed : false,
            programsEnabled: false,
            programsShown: false,
            licensePopup : false,
            rights : RightDefinitions,
            productionStandards : [
                {
                    name: "Video Standard",
                    key: "VIDEO_STANDARD",
                    superRights: [],
                    options : [
                        "VIDEO_STANDARD_HD",
                        "VIDEO_STANDARD_SD",
                        "VIDEO_STANDARD_UHD",
                        "VIDEO_STANDARD_VR",
                    ],
                    multiple : false
                },
                {
                    name: "Aspect ratio",
                    key: "ASPECT_RATIO",
                    superRights: [],
                    options : [
                        "ASPECT_RATIO_16_9",
                        "ASPECT_RATIO_4_3",
                        "ASPECT_RATIO_CUSTOM"
                    ],
                    multiple : false
                },
                {
                    name: "Graphics",
                    key: "GRAPHICS",
                    superRights: [],
                    options : [
                        "GRAPHICS_NO",
                        "GRAPHICS_YES",
                    ],
                    multiple : false
                },
                {
                    name: "Commentary",
                    key: "COMMENTARY",
                    superRights: [],
                    options : [
                        "COMMENTARY_NO",
                        "COMMENTARY_YES",
                    ],
                    multiple : false
                },
                {
                    name: "Camera standards",
                    key: "CAMERA",
                    superRights: [],
                    options : [
                        "CAMERA_MINIMUM",
                        "CAMERA_TEXT",
                    ],
                    multiple : false
                },
                {
                    name: "Content production",
                    key: "CONTENT",
                    superRights: [],
                    options : [
                        "CONTENT_ALL",
                        "CONTENT_TEXT",
                    ],
                    multiple : false
                }
            ]
        };
    }

    componentDidMount () {}

    componentWillReceiveProps(nextProps) {
        console.log("Step 2 - props", nextProps);

        const { programsShown } = this.state;
        let programsEnabled = false;

        nextProps.rightsPackage.forEach(( rightPackage )=>{
            if ( rightPackage.shortLabel === "PR" && !programsShown ) programsEnabled = true ;
        });

        if ( programsEnabled ){
            this.setState({
                programsEnabled : programsEnabled,
                programsShown : true
            });
        }

        if ( programsEnabled && nextProps.programs.length === 0) this.props.updateProgram(0, {name: "", saved : false}, "save");

    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
    };

    packagesConfirmed = (packagesConfirmed) =>{
        this.setState({packagesConfirmed});
    };

    closeProgramsPopup = () => {
        this.setState({programsEnabled:false}) ;
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

    addProgram = (index) => {
        this.props.updateProgram(index, {name: name}, "add")
    };

    saveProgram = (index,name) => {
        this.props.updateProgram(index, {name: name, saved: true}, "save")
    };

    editProgram = (index,name) => {
        this.props.updateProgram(index, {name: name, saved: false}, "save")
    };

    removeProgram = (index) => {
        this.props.updateProgram(index, null, "remove")
    };

    updateRight = (rightsPackage) => {
        this.props.superRightsUpdated(rightsPackage);
    };

    superRightsEnabled = ( superRights ) => {

        var selected = this.props.rightsPackage.map(a => a.shortLabel);

        return superRights.filter(r => selected.indexOf(r) !== -1).length > 0;

    };

    render() {
        if ( this.props.step !== 2) return (null);

        return (
            <div className="step-content">
                <PackageSelector
                    packages={this.props.packages}
                    packagesConfirmed={this.state.packagesConfirmed}
                    onConfirm={this.packagesConfirmed} />

                <div className="step-content-container">

                    <LicenseDateSelector
                        isOpen={this.state.licensePopup}
                        onUpdate={this.selectLicenseDates}
                        startDate={this.props.startDate}
                        endDateLimit={this.props.endDateLimit}
                        endDate={this.props.endDate}
                        onClose={this.closeLicensePopup}
                    />

                    <TitleBar title={"License period"}/>

                    <div className={"license-date-container"}>
                        <div className="table-right">
                            <div className="row">
                                <div className="column right-name">Start</div>
                                <div className="column right-item-content" style={licenseStyles}>
                                    { !this.props.startDate  && "With contract conclusion"}
                                    { this.props.startDate  && Moment(this.props.startDate).format('DD/MM/YYYY')}
                                </div>
                                <div className="column right-name">End</div>
                                <div className="column right-item-content"  style={licenseStyles}>
                                    { !this.props.endDate  && this.props.endDateLimit + " days from contract conclusion"}
                                    { this.props.endDate  && Moment(this.props.endDate).format('DD/MM/YYYY')}
                                </div>
                                <div className="column right-item-content edit-item" onClick={()=>this.setState({licensePopup: true})}>
                                    <i className="fa fa-edit"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TitleBar title={"Configure Rights"}/>

                    <Program
                        isOpen={this.state.programsEnabled}
                        onClose={this.closeProgramsPopup}/>

                    <div className="rights-container">
                        {
                            this.state.rights.length > 0 && this.state.rights.map((right, i)=> {

                                if ( right.superRights.length > 0
                                    && !this.superRightsEnabled(right.superRights)) return;

                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={right.name}
                                    options={right.options}
                                    multiple={right.multiple}
                                    superRights={right.superRights}
                                    showTextArea={right.showTextArea}
                                    onUpdate={this.updateRight}
                                    rightsPackage={this.props.rightsPackage}/>
                            })
                        }
                    </div>

                    <TitleBar title={"Configure Production Standards"}/>

                    <div className="rights-container">
                        {
                            this.state.productionStandards.length > 0 && this.state.productionStandards.map((right, i)=> {
                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={right.name}
                                    selected={this.props[right.key]}
                                    options={right.options}
                                    multiple={right.multiple}
                                    superRights={right.superRights}
                                    onUpdate={this.updateRight}
                                    rightsPackage={this.props.rightsPackage}/>
                            })
                        }
                    </div>

                </div>


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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep2)