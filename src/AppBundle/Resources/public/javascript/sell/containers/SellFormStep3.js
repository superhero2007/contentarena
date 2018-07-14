import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import PopupRight from "../components/PopupRight";
import Program from "../components/Program";
import Comments from "../components/Comments";
import LicenseDateSelector from "../components/LicenseDateSelector";
import {TitleBar} from "../components/SellFormItems";
import Moment from "moment";
import {RightDefinitions} from "../components/RightDefinitions";
import {ProductionStandardsDefinitions} from "../components/ProductionStandardsDefinitions";
import {stepChangeReset} from "../actions/contentActions";

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
            title : "Step 3 - Configure Rights",
            packagesConfirmed : false,
            programsEnabled: false,
            programsShown: false,
            licensePopup : false,
            rights : RightDefinitions,
            productionStandards : ProductionStandardsDefinitions
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

        window.content = nextProps;

        const { programsShown } = this.state;
        let programsEnabled = false;

        nextProps.rightsPackage.forEach(( rightPackage )=>{
            if ( rightPackage.shortLabel === "PR" && !programsShown ) programsEnabled = true ;
        });

        if ( programsEnabled ){
        }
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

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }

    };

    render() {

        const {step, programs, startDateMode, endDateMode, endDate } = this.props;
        if ( step !== 3) return (null);
        this.scroll();

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
                                <div className="column right-item-content" style={licenseStyles}>
                                    { !this.props.startDate  && " contract conclusion"}
                                    { this.props.startDate  && Moment(this.props.startDate).format('DD/MM/YYYY')}
                                </div>
                                <div className="column right-name">End</div>
                                <div className="column right-item-content"  style={licenseStyles}>
                                    { endDateMode === "LIMITED"  && this.props.endDateLimit + " days from contract conclusion"}
                                    { endDateMode === "DATE"  && Moment(this.props.endDate).format('DD/MM/YYYY')}
                                    { endDateMode === "UNLIMITED"  && "Unlimited"}
                                    { !endDateMode && "Please select"}
                                </div>
                                <div className="column right-item-content edit-item" onClick={()=>this.setState({licensePopup: true})}>
                                    <i className="fa fa-edit"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TitleBar title={"Configure Rights"}/>

                    <Program
                        programs={programs}
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

                                if ( right.superRights.length > 0
                                    && !this.superRightsEnabled(right.superRights)) return;

                                return <PopupRight
                                    key={right.key}
                                    id={right.key}
                                    name={right.name}
                                    selected={this.props[right.key]}
                                    options={right.options}
                                    multiple={right.multiple}
                                    programs={programs}
                                    onProgram={() => {
                                        this.setState({
                                            programsEnabled : true,
                                        });
                                    }}
                                    superRights={right.superRights}
                                    showTextArea={right.showTextArea}
                                    technicalFee={right.technicalFee}
                                    onUpdate={this.updateRight}
                                    rightsPackage={this.props.rightsPackage}/>
                            })
                        }
                    </div>

                    <Comments/>

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
        stepChangeReset : () => dispatch(stepChangeReset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep3)
