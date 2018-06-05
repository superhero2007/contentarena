import React from 'react';
import { connect } from "react-redux";
import Toggle from 'react-toggle';
import {RightDefaults} from "../components/RightDefaults";

class SuperRight extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({checked:nextProps.checked});
    }

    render(){
        return (
            <div className="select-box-item" >
                <div className="select-box-checkbox">
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
                </div>
                <div className="select-box-item-label">
                    { this.props.superRight.name } ({ this.props.superRight.shortLabel })
                </div>
                <Toggle
                    icons={false}
                    disabled={!this.state.checked}
                    defaultChecked={false} />
            </div>
        )
    }
}

class PackageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages : JSON.parse(props.packages).map( (p) => { p.selectedRights = Object.assign({},RightDefaults); return p }),
            rightsPackage : new Map(props.rightsPackage.map((i) => [i.id, i])),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({rightsPackage : new Map(nextProps.rightsPackage.map((i) => [i.id, i]))});
    }

    componentDidMount(){

        let _this = this;

        this.state.packages.forEach( ( superRight) => {
            if ( superRight.shortLabel === "LT" || superRight.shortLabel === "HL" ){
                _this.updateSuperRightsList(superRight, true);
            }
        });
    }

    updateSuperRightsList = (superRight, status) => {
        if (status && !this.state.rightsPackage.has(superRight.id)) this.state.rightsPackage.set(superRight.id, superRight);
        if (!status && this.state.rightsPackage.has(superRight.id)) this.state.rightsPackage.delete(superRight.id);
        this.props.superRightsUpdated(this.state.rightsPackage);
    };

    render() {
        let _this = this;
        return (
            <div className="package-selector">
                <div className="package-selector-title">
                    Pick rights
                </div>
                <div className="package-selector-container">
                    <div className="package-exclusive">
                        <div className="package-exclusive-item">Exclusive</div>
                        <div className="package-exclusive-item">Exclusive</div>
                        <div className="package-exclusive-item">Exclusive</div>
                        <div className="package-exclusive-item">Exclusive</div>
                    </div>
                    <div className="package-selector-content" >
                        { this.state.packages.map(function(superRight){
                            return <SuperRight
                                key={superRight.id}
                                superRight={superRight}
                                onChange={_this.updateSuperRightsList}
                                checked={ _this.state.rightsPackage.has(superRight.id) }
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageSelector)