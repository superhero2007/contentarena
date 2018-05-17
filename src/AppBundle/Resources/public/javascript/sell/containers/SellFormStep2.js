import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import Right from "../components/Right";
import Program from "../components/Program";
import LicenseDateSelector from "../components/LicenseDateSelector";


class SellFormStep2 extends React.Component {

    constructor(props) {
        super(props);

        let packages = JSON.parse(this.props.packages);

        this.state = {
            title : "Step 2 - Configure Rights",
            packagesConfirmed : false,
            programsEnabled: false,
            programsShown: false,
            rights : [],
            rightPackages : new Map(packages.map((i) => [i.id, i]))
        };
    }

    componentDidMount () {}

    componentWillReceiveProps(nextProps) {
        console.log("Step 2 - props", nextProps);

        const { programsShown } = this.state;
        let programsEnabled = false;

        if ( nextProps.rightsPackage.length > 0 && this.state.rights.length === 0 ) {
            this.loadRights(nextProps.rightsPackage, "Main Information");
        }

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

    render() {
        if ( this.props.step !== 2) return (null);

        return (
            <div className="step-content">
                <PackageSelector
                    packages={this.props.packages}
                    packagesConfirmed={this.state.packagesConfirmed}
                    onConfirm={this.packagesConfirmed} />

                <div className="step-content-container">

                    {/*<LicenseDateSelector
                        onUpdate={this.selectLicenseDates}
                        startDate={this.props.startDate}
                        endData={this.props.endDate}
                    />*/}

                    <Program isOpen={this.state.programsEnabled} onClose={this.closeProgramsPopup}/>

                </div>

                {/*<div>
                    {
                        this.state.rights.length > 0 && this.state.rights.map((right)=> {
                            return <Right
                                key={right.id}
                                data={right}
                                programs={this.props.programs}
                                rightPackages={this.state.rightPackages}
                                availablePackages={this.props.rightsPackage}/>
                        })
                    }
                </div>*/}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
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