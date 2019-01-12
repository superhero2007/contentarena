import React from 'react';
import PropTypes from 'prop-types';
import {goTo} from "../../main/actions/utils";
import SportSelector from "../../main/components/SportSelector";
import cn from "classnames";

class PreferredSportBuyer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports : (props.sports) ? props.sports : [],
            all : (props.all) ? props.all : false,
            other : (props.other) ? props.other : false
        };
    }

    handleRadioChange = ( flag ) => {
        const { onChange } = this.props;
        this.setState({allSports: flag, sports: []});
        if (onChange) onChange([], flag);
    };

    setSports = ( sports) => {
        const { onChange } = this.props;
        if (onChange) onChange(sports);
        this.setState({sports: sports });
    };

    render() {
        const { sports,all, other } = this.state;
        const { style } = this.props;
        return (
            <React.Fragment>
                <div className={"preferences-title"}>
                    {this.context.t("PREFERENCES_SPORT_BUYER_TITLE")}
                </div>
                <div className={"subtitle"}>
                    {this.context.t("PREFERENCES_SPORT_BUYER_SUBTITLE")}
                </div>
                <div className={"row"} style={{marginBottom:50}}>
                    <div className={"preferences-item"}>
                        <SportSelector
                            onChange={this.setSports}
                            flags={["wall"]}
                            sports={sports}
                            all={all}
                            other={other}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

PreferredSportBuyer.contextTypes = {
    t: PropTypes.func.isRequired
};

export default PreferredSportBuyer;