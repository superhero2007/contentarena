import React from 'react';
import { connect } from "react-redux";
import CurrencySelector from "../components/CurrencySelector";
import Right from "../components/Right";

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        let packages = JSON.parse(this.props.packages);

        this.state = {
            title : "Step 3",
            packagesConfirmed : false,
            rights : [],
            rightPackages : new Map(packages.map((i) => [i.id, i]))
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.rightsPackage.length > 0 && this.state.rights.length === 0 && nextProps.step === 3 ) {
            this.loadRights(nextProps.rightsPackage, "Production Standards");
        }
    }

    loadRights = (rightsPackage, group) => {
        let _this = this;
        ContentArena.Api.getRights(rightsPackage.map((p)=> (p.id)), group).done((rights)=>{
            _this.setState({rights});
        });
    };

    render() {
        if ( this.props.step !== 3) return (null);

        return (
            <div className="step-content">

                <CurrencySelector onClick={this.selectCurrency} selected={this.props.currency} />

                <div>
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep3)