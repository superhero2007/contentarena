import React from 'react';
import PropTypes from 'prop-types';
import CountrySelector from "../../main/components/CountrySelector";
import cn from "classnames";
import NewRegionCountrySelector from "../../main/components/NewRegionCountrySelector";

class PreferredTerritoriesBuyer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMultipleEnabled: (props.territories) ? props.territories.length > 1 : false,
            territories : (props.territories) ? props.territories.map(item=>{
                item.value = item.name;
                item.label = item.name;
                return item;
            }) : []
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.territories){
            this.setState({
                //isMultipleEnabled : nextProps.territories.length > 1,
                territories : nextProps.territories.map(item=>{
                    item.value = item.name;
                    item.label = item.name;
                    return item;
                })
            });
        }
    }

    handleRadioChange = ( flag ) => {
        this.setState({isMultipleEnabled: flag});
    };

    setTerritories = ( territories) => {
        const { onChange } = this.props;
        this.setState({territories });
        if (onChange) onChange(territories.filter(i=>i).map(item=>{
            item.value = item.name;
            item.label = item.name;
            return item;

        }));
    };

    render() {
        const { style }  = this.props;
        const { isMultipleEnabled, territories } = this.state;

        return (
            <React.Fragment>
                <div className={"preferences-title"}>
                    {this.context.t("PREFERENCES_TERRITORIES_BUYER_TITLE")}
                </div>
                <div className={"row"} style={style}>
                    <div className={"preferences-item"}>
                        <div className="d-flex align-items-center" style={{marginBottom:5}}>
                            <div className={cn({
                                'font-weight-bold': isMultipleEnabled === false ,
                                "d-flex align-items-center" : true
                            })}
                                 style={{marginRight:20}}>
                                <input className="ca-radio"
                                       type="radio"
                                       value={false}
                                       onChange={ e => { this.handleRadioChange(false)}}
                                       checked={isMultipleEnabled === false}
                                       style={{marginRight:5, width: 20,padding: 0}}
                                />
                                {this.context.t('PREFERENCES_TERRITORIES_BUYER_SINGLE_TERRITORY_OPTION')}
                            </div>
                            <div className={cn({
                                'font-weight-bold': isMultipleEnabled === true,
                                "d-flex align-items-center" : true
                            })}>
                                <input className="ca-radio"
                                       type="radio"
                                       value={true}
                                       onChange={ e => { this.handleRadioChange(true)}}
                                       checked={isMultipleEnabled === true}
                                       style={{marginRight:5, width: 20,padding: 0}}
                                />
                                {this.context.t('PREFERENCES_TERRITORIES_BUYER_MULTIPLE_TERRITORY_OPTION')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row"} style={{marginBottom:50}}>
                    <div className={"preferences-item"}>
                        {!isMultipleEnabled && <CountrySelector
                            className={"small-select"}
                            onChange={t => this.setTerritories([t])}
                            value={territories[0]}
                            filter={[]}
                            multi={false}
                            exclusiveSoldTerritories={ false}
                        />}
                        {isMultipleEnabled && <NewRegionCountrySelector
                            className={"small-select"}
                            onChange={this.setTerritories}
                            onSelectRegion={(c) =>{ }}
                            value={territories}
                            multiple={true}
                            worldwide={true}
                            filter={[]}
                            exclusiveSoldTerritories={ false}
                        />}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

PreferredTerritoriesBuyer.contextTypes = {
    t: PropTypes.func.isRequired
};

export default PreferredTerritoriesBuyer;