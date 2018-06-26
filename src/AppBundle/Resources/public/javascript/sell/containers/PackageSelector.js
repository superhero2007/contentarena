import React from 'react';
import { connect } from "react-redux";
import Toggle from 'react-toggle';
import {RightDefaults} from "../components/RightDefaults";
import {updateContentValue} from "../actions/contentActions";

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

        const {onExclusive} = this.props;

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
                <div className="select-box-item-label" style={{flex:8}}>
                    { this.props.superRight.name } ({ this.props.superRight.shortLabel })
                </div>
                <Toggle
                    icons={false}
                    checked={this.props.exclusive}
                    disabled={!this.state.checked}
                    onChange={(e) => {
                        this.setState({exclusive: e.target.checked});
                        onExclusive(this.props.superRight ,e.target.checked );
                    }}
                />
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

    componentDidMount(){

        /*let _this = this;

        if ( !this.props.defaultRights ){
            this.state.packages.forEach( ( superRight) => {
                if ( superRight.shortLabel === "LT" || superRight.shortLabel === "HL" ){
                    _this.updateSuperRightsList(superRight, true);
                }
            });
        }
        this.props.updateContentValue("defaultRights", true);*/
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
                                onExclusive={_this.onExclusive}
                                superRight={superRight}
                                onChange={_this.updateSuperRightsList}
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