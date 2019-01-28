import React from 'react';
import PropTypes from 'prop-types';
import SportSelector from "../../main/components/SportSelector";

class PreferredSportSeller extends React.Component {

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

    setSports = ( selection) => {

        const { onChange } = this.props;
        if (onChange) onChange(selection);
        this.setState({sports: selection.sports });
    };

    render() {
        const { sports, all, other } = this.state;
        const { parse, showSubtitle = true } = this.props;
        return (
            <React.Fragment>
                <div className={"preferences-title"}>
                    {this.context.t("PREFERENCES_SPORT_SELLER_TITLE")}
                </div>
                {showSubtitle && <div className={"subtitle"}>
                    {this.context.t("PREFERENCES_SPORT_SELLER_SUBTITLE")}
                </div>}
                <div className={"row"} style={{marginBottom:50}}>
                    <div className={"preferences-item"}>
                        <SportSelector
                            onChange={this.setSports}
                            sports={sports}
                            all={all}
                            other={other}
                            parse={parse}
                            flags={["wall"]}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

PreferredSportSeller.contextTypes = {
    t: PropTypes.func.isRequired
};

export default PreferredSportSeller;