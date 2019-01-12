import React from 'react';
import Select from 'react-select';
import {PropTypes} from 'prop-types';
import cn from "classnames";

class SportSelector extends React.Component {

    constructor(props) {
        super(props);

        let activeSports = new Map();

        if (props.sports) {
            props.sports.forEach(sport => {
               activeSports.set(sport.id, sport);
            });
        }

        this.state = {
            sports : [],
            activeSports :activeSports,
            all : props.all || false,
            other : props.other || false
        };
    }

    componentDidMount () {
        const {flags} = this.props;
        let _this = this;

        ContentArena.Api.getAllSports(flags).done( (sports ) => {
            _this.setState({sports});
        });
    }

    selectSport = (sport) => {

        const {onChange } = this.props;

        let activeSports = this.state.activeSports;

        if (!activeSports.has(sport.id)) {
            activeSports.set(sport.id, sport);
        } else {
            activeSports.delete(sport.id);
        }

        this.setState({ activeSports, all: false, other : false });
        if (onChange) onChange({
            sports : Array.from(activeSports.values()),
            all: false,
            other : false
        })
    };

    selectAll = () => {
        const { onChange } = this.props;
        let all = !this.state.all;
        let activeSports = this.state.activeSports;
        let other = (all) ? false : this.state.other;

        if (all) activeSports.clear();

        this.setState({
            all : all,
            other : other,
            activeSports : activeSports
        });

        if (onChange) onChange({
            sports : Array.from(activeSports.values()),
            all: all,
            other : other
        })

    };

    selectOther = () => {
        const { onChange } = this.props;
        let other = !this.state.other;
        let activeSports = this.state.activeSports;
        let all = (other) ? false : this.state.all;

        if (other) activeSports.clear();

        this.setState({
            all : all,
            other : other,
            activeSports : activeSports
        });

        if (onChange) onChange({
            sports : Array.from(activeSports.values()),
            all: all,
            other : other
        })

    };


    render(){
        const {
            activeSports,
            sports,
            all,
            other
        } = this.state;

        return (
            <div className="country-selector region-filter sports-selector">
                <div>
                    <div className="regions">
                        <button className={cn({
                            "region" : true,
                            'region-selected': all
                        })}
                                onClick={this.selectAll}>
                            All
                        </button>
                        {sports.map((sport,i)=>{
                            return <button className={cn({
                                                "region" : true,
                                                'region-selected': activeSports.has(sport.id)
                                            })}
                                           key={"sport-" + i}
                                           onClick={()=>{
                                               this.selectSport(sport)
                                           }}>
                                {sport.name}
                            </button>
                        })}
                        <button className={cn({
                            "region" : true,
                            'region-selected': other
                        })}
                                onClick={this.selectOther}>
                            Other
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

SportSelector.contextTypes = {
    t: PropTypes.func.isRequired
};

export default SportSelector;