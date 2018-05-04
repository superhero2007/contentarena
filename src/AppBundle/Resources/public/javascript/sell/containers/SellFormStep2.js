import React from 'react';
import { connect } from "react-redux";
import PackageSelector from "../containers/PackageSelector";
import Right from "../components/Right";
import CurrencySelector from "../components/CurrencySelector";
import LicenseDateSelector from "../components/LicenseDateSelector";
import ProgramName from "../components/ProgramName";

class SellFormStep2 extends React.Component {

    constructor(props) {
        super(props);

        let packages = JSON.parse(this.props.packages);

        this.state = {
            title : "Step 2 - Configure Rights",
            packagesConfirmed : false,
            programsEnabled: false,
            rights : [],
            rightPackages : new Map(packages.map((i) => [i.id, i]))
        };
    }

    componentDidMount () {}

    componentWillReceiveProps(nextProps) {
        console.log("Step 2 - props", nextProps);
        let programsEnabled = false;

        if ( nextProps.rightsPackage.length > 0 && this.state.rights.length === 0 ) {
            this.loadRights(nextProps.rightsPackage, "Main Information");
        }

        nextProps.rightsPackage.forEach(( rightPackage )=>{
            if ( rightPackage.shortLabel === "PR" ) programsEnabled = true ;
        });

        this.setState({
            programsEnabled : programsEnabled
        });

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
                {
                    this.state.packagesConfirmed && this.state.rights.length === 0 && <i className="fa fa-cog fa-spin"/>
                }

                <div className="step-content-container">
                    {this.state.packagesConfirmed &&
                        <CurrencySelector onClick={this.selectCurrency} selected={this.props.currency} />}

                    {this.state.packagesConfirmed && this.state.programsEnabled && this.props.programs.map((v,i, l)=>(
                        <ProgramName
                            key={i}
                            index={i}
                            name={v.name}
                            showAdd={v.saved && i === l.length - 1}
                            showEdit={v.saved}
                            showSave={!v.saved}
                            showRemove={v.saved || i > 0}
                            onAdd={this.addProgram}
                            onEdit={this.editProgram}
                            onSave={this.saveProgram}
                            onRemove={this.removeProgram} />
                    ))}

                    {this.state.packagesConfirmed &&
                    <LicenseDateSelector
                        onUpdate={this.selectLicenseDates}
                        startDate={this.props.startDate}
                        endData={this.props.endDate}
                    />}

                </div>

                <div>
                    {
                        this.state.rights.length > 0 && this.state.rights.map((right)=> {
                            return <Right
                                key={right.id}
                                data={right}
                                programs={this.props.programs}
                                rightPackages={this.state.rightPackages}/>
                        })
                    }
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