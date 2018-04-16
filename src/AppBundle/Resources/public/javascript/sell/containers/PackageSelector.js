import React from 'react';
import { connect } from "react-redux";

const SuperRight = ({superRight, onChange, checked}) => (
    <div className="select-box-item" >
        <div className="select-box-checkbox">
            <input type="checkbox"
                   defaultChecked={checked}
                   onChange={ () => onChange(superRight)}
                   id={"super-right-" + superRight.id}
                   className="package-selector" />
                <label htmlFor={"super-right-" + superRight.id}></label>
        </div>
        <div className="select-box-item-label">
            { superRight.name }
        </div>
    </div>
);

class PackageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages : JSON.parse(props.packages),
            content : JSON.parse(props.content)
        };
    }

    render() {
        let _this = this;
        return (
            <div>
                {this.props.listingInfo.step === 2 && <div className="box">
                    <div className="box-title">
                        Pick rights
                    </div>
                    <div className="seller-box-content seller-box-packages" >
                        { this.state.packages.map(function(superRight, i){
                            return <SuperRight
                                key={superRight.id}
                                superRight={superRight}
                                checked={ ContentArena.Utils.getIndex( superRight.id, _this.props.listingInfo.rights_package, "id") !== -1 }
                                onChange={ _this.props.superRightsUpdated }
                            />;
                        })}
                    </div>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listingInfo : state.listingInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        superRightsUpdated : (rights_package) => dispatch({
            type : 'SUPER_RIGHTS_UPDATED',
            rights_package: rights_package
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageSelector)