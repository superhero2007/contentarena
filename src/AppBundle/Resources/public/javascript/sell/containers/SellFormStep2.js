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
import {Description} from "../components/SellFormItems";

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
            productionStandards : ProductionStandardsDefinitions
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log("Step 2 - props", nextProps);
        window.content = nextProps;
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

        const {
            programDescription,
            updateContentValue,
            step, programs, startDateMode, endDateMode, endDate } = this.props;
        if ( step !== 2) return (null);
        this.scroll();

        return (

            <div className="step-content">
                <div className="step-title">{this.state.title}</div>

                <div className="step-content-container">
                    <div className="textarea-input">
                        <label>Program/Content Description</label>
                        <div>
                            Which program do you wish to license? This may include events and/or produced content. All rights, selected later on, will refer to this.
                        </div>
                        <textarea
                            onBlur={ (e) => updateContentValue("programDescription", e.target.value)}
                            defaultValue={programDescription}
                            placeholder={"Please enter the program description. The program description represents the core of the license agreement. All rights picked later on refer to this program description. You may enter all information you consider relevant (e.g. which events you seek to grant rights to or which events you will produce and deliver to the buyer). \n"}/>
                    </div>

                </div>



                <PackageSelector
                    packages={this.props.packages}
                    packagesConfirmed={this.state.packagesConfirmed}
                    onConfirm={this.packagesConfirmed} />
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
)(SellFormStep2)
