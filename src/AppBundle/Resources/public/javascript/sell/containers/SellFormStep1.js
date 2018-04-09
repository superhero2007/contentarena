import React from 'react';
import { connect } from "react-redux";

class SellFormStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "Step 1 - Event selection"
        };
    }

    render() {
        let _this = this;

        if ( this.props.step !== 1) return (null);

        return (
            <div className="step-content">
                <div className="step-title">
                    { this.state.title }
                </div>
                <div className="">
                    <div className="step-item-description">
                        Please enter the name of the competition for which you would like to sell content. In case you can't find your competition, please follow the steps below
                    </div>
                    <input type="text"
                           id="search-sport"
                           placeholder="Enter competition name (e.g. Bundesliga)" />

                    <div className="step-item-description">
                        Please select the sport(s) and competition(s) covered by your content listing:
                    </div>
                    <input type="text"
                           value={this.props.sports[0].name}
                           readOnly={true}
                           onClick={this.props.openSportSelector}
                           placeholder={"Sport"}  />

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        step : state.step,
        sports: state.sports
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openSportSelector : () => dispatch({
            type : 'OPEN_SELECTOR',
            selectorItems : ContentArena.Data.FullSports,
            popularItems : ContentArena.Data.TopSports,
            selectorType : "sports"
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)