import React from 'react';
import PropTypes from 'prop-types';
import {goTo} from "../../main/actions/utils";
import SportSelector from "../../main/components/SportSelector";
import cn from "classnames";

class PreferredSportSeller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports : (props.sports) ? props.sports.map(s=>({value : s.id , label : s.name })) : [],
            allSports : (props.allSports) ? props.allSports : false
        };
    }

    handleRadioChange = ( flag ) => {
        const { onChange } = this.props;
        this.setState({allSports: flag, sports: []});
        if (onChange) onChange([], flag);
    };

    setSports = ( sports) => {

        const { onChange } = this.props;
        if (onChange) onChange(sports.map(t=>({id : t.value, name: t.label})), false);
        this.setState({sports: sports });
    };

    render() {
        const { sports, allSports } = this.state;
        return (
            <React.Fragment>
                <div className={"preferences-title"}>
                    {this.context.t("PREFERENCES_SPORT_SELLER_TITLE")}
                </div>
                <div className={"subtitle"}>
                    {this.context.t("PREFERENCES_SPORT_SELLER_SUBTITLE")}
                </div>
                <div className={"row"}>
                    <div className={"preferences-item"}>
                        <div className="d-flex align-items-center" style={{marginBottom:5}}>
                            <div className={cn({
                                'font-weight-bold': allSports === false ,
                                "d-flex align-items-center" : true
                            })}
                                 style={{marginRight:20}}>
                                <input className="ca-radio"
                                       type="radio"
                                       value={false}
                                       onChange={ e => { this.handleRadioChange(false)}}
                                       checked={allSports === false}
                                       style={{marginRight:5, width: 20,padding: 0}}
                                />
                                {this.context.t('PREFERENCES_SELECTED_SPORTS')}
                            </div>
                            <div className={cn({
                                'font-weight-bold': allSports === true,
                                "d-flex align-items-center" : true
                            })}>
                                <input className="ca-radio"
                                       type="radio"
                                       value={true}
                                       onChange={ e => { this.handleRadioChange(true)}}
                                       checked={allSports === true}
                                       style={{marginRight:5, width: 20,padding: 0}}
                                />
                                {this.context.t('PREFERENCES_ALL_SPORTS')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{marginBottom:50}}>
                    <div className={"preferences-item"}>
                        <SportSelector
                            className={"small-select"}
                            disabled={allSports}
                            onChange={this.setSports}
                            value={sports}
                            multi={true}
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