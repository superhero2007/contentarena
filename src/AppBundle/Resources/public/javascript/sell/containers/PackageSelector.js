import React from 'react';
import { connect } from "react-redux";
import Toggle from 'react-toggle';
import {RightDefaults} from "../components/RightDefaults";
import {updateContentValue} from "../actions/contentActions";
import {SuperRightDefinitions} from "../components/SuperRightDefinitions";

class SuperRight extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked:props.checked
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({checked:nextProps.checked});
    }

    render(){

        const {onExclusive, superRight, exclusive, onChangeInput, inputValues} = this.props;

        let inputData = SuperRightDefinitions[superRight.shortLabel][1];

        return (
            <div className="select-box-item" >
                <div style={{flex:3, display: 'inline-flex'}}>
                    <input type="checkbox"
                           defaultChecked={this.props.checked}
                           checked={this.state.checked}
                           onChange={ (e) =>{
                               this.setState({checked: e.target.checked});
                               this.props.onChange(this.props.superRight, e.target.checked);
                           }}
                           id={"super-right-" + this.props.superRight.id}
                           className="package-selector" />
                    <label htmlFor={"super-right-" + this.props.superRight.id}/>
                    { superRight.name }
                </div>
                <div style={{flex:1, textAlign: 'center'}}>
                    <Toggle
                        icons={false}
                        checked={exclusive}
                        disabled={!this.state.checked}
                        onChange={(e) => {
                            this.setState({exclusive: e.target.checked});
                            onExclusive(superRight ,e.target.checked );
                        }}
                    />
                </div>
                <div style={{flex:6,fontSize: 13}}>
                    { SuperRightDefinitions[superRight.shortLabel][0] }
                    { inputData &&
                    <input
                        type={"number"}
                        onChange={(e) => { onChangeInput(inputData.key, Number(e.target.value))} }
                        value={inputValues[inputData.key]}
                        disabled={!this.state.checked}
                        style={{
                            margin: '0 5px',
                            padding: 4,
                            width: 40,
                            fontSize : 12
                        }}/>}
                    { SuperRightDefinitions[superRight.shortLabel][2] && SuperRightDefinitions[superRight.shortLabel][2]}
                </div>

            </div>
        )
    }
}

class PackageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages : JSON.parse(props.packages).map( (p) => { p.selectedRights = Object.assign({},RightDefaults); return p }),
            rightsPackage : new Map(props.rightsPackage.map((i) => {

                if (!i.selectedRights) i.selectedRights = Object.assign({},RightDefaults) ;
                return[i.id, i]
            })),
            defaultRights : false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({rightsPackage : new Map(nextProps.rightsPackage.map((i) => [i.id, i]))});
    }

    updateSuperRightsList = (superRight, status) => {
        if (status && !this.state.rightsPackage.has(superRight.id)) this.state.rightsPackage.set(superRight.id, superRight);
        if (!status && this.state.rightsPackage.has(superRight.id)) this.state.rightsPackage.delete(superRight.id);
        this.props.superRightsUpdated(this.state.rightsPackage);
    };

    onExclusive = (superRight, status) => {

        let rightPackage = this.state.rightsPackage.get(superRight.id);
        rightPackage.exclusive = status;
        this.state.rightsPackage.set(superRight.id, rightPackage);
        this.props.superRightsUpdated(this.state.rightsPackage);
    };

    render() {
        let _this = this;
        const {HL_INPUT, NA_INPUT} = this.props;
        return (
            <div className="package-selector">
                <div className="package-selector-title">
                    Rights selection & definition
                </div>
                <div className="package-selector-container">

                    <div style={{margin: 20}}>
                        Which rights, relating to the program defined above, do you wish to grant to the buyer?
                    </div>

                    <div className="package-exclusive">
                        <div className="package-exclusive-item" style={{flex:3}}/>
                        <div className="package-exclusive-item" style={{flex:1}}>Exclusive</div>
                        <div className="package-exclusive-item" style={{flex:6}}>Definition</div>
                    </div>
                    <div className="package-selector-content" >
                        { this.state.packages.map(function(superRight){
                            return <SuperRight
                                key={superRight.id}
                                onExclusive={_this.onExclusive}
                                superRight={superRight}
                                inputValues={{
                                    HL_INPUT : HL_INPUT,
                                    NA_INPUT : NA_INPUT
                                }}
                                onChange={_this.updateSuperRightsList}
                                onChangeInput={_this.props.updateContentValue}
                                checked={ _this.state.rightsPackage.has(superRight.id) }
                                exclusive={ (_this.state.rightsPackage.has(superRight.id)) ? _this.state.rightsPackage.get(superRight.id).exclusive: false }
                            />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content;
};

const mapDispatchToProps = dispatch => {
    return {
        superRightsUpdated : (rightsPackage) => dispatch({
            type : 'SUPER_RIGHTS_UPDATED',
            rightsPackage: rightsPackage
        }),
        resetSuperRigths : () => dispatch({
            type : 'SUPER_RIGHTS_UPDATED',
            reset: true
        }),
        updateContentValue : (k, v) => dispatch(updateContentValue(k, v))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageSelector)