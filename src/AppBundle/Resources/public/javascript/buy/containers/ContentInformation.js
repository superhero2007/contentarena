import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import { StaticSchedules } from "../../sell/components/SellFormItems";

class ContentInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seasons : props.seasons
        };
    }

    componentDidMount() {
        this.loadSchedule();
    }

    componentWillReceiveProps(nextProps) {}

    loadSchedule () {

        let _this = this;
        const { seasons, schedulesBySeason } = this.props;

        seasons.forEach(( season, index ) =>{
            if ( !season.schedules && !season.custom ){
                _this.setState({ loadingSchedule : true });
                ContentArena.Api.getSchedule(season.externalId).done( (schedules ) => {
                    _this.setState({ loadingSchedule : false });
                    let keys = [];
                    if (schedulesBySeason && schedulesBySeason[index]){
                        keys = Object.keys(schedulesBySeason[index]);
                        keys.forEach((k)=>{
                            schedulesBySeason[index][k].matches.forEach((m)=>{
                                if (m.selected) {
                                    schedules[k].matches.get(m.externalId).selected = true;

                                }
                            });
                            schedules[k].selected = true;
                        });
                    }

                    let tempSeasons  = _this.state.seasons;
                    tempSeasons[index].schedules = schedules;
                    if( keys.length> 0) tempSeasons[index].showchedules = true;

                    _this.setState({
                        seasons: tempSeasons
                    });

                });
            }
        });
    }

    render() {
        const {description, website }= this.props;
        const {seasons }= this.state;
        return (
            <div style={{marginTop: 20}}>
                {description && <div className="full-item-box">
                    <label>EVENT DESCRIPTION</label>
                    <div className="full-item-content">
                        {description}
                    </div>
                </div>}

                {website &&
                <div className="full-item-box"
                     style={{
                         flexDirection : 'row',
                         width : '50%'
                     }}>
                    <label>CONTENT WEBSITE</label>
                    <div style={{ padding: 12, border: '1px solid lightgrey', marginLeft: 3}}>
                        {website}
                    </div>
                </div>}

                {
                    seasons && seasons.length > 0 && seasons.map((season, key)  => {
                        return <div key={"season-" + key}>
                            <div style={{
                                backgroundColor: '#32A9E7',
                                color: 'white',
                                padding: 12,
                                fontSize: 18,
                                fontWeight: 600
                            }}>
                                {season.name}
                            </div>
                            <StaticSchedules season={key} seasons={seasons}/>
                            {/*<div className="schedule">
                                { schedulesBySeason[key]
                                    && Object.keys(schedulesBySeason[key]).length > 0
                                    && Object.entries(schedulesBySeason[key]).map(( entry, i ) => {

                                        let round = entry[0];
                                        let matches = entry[1].matches;

                                        console.log("ROUNDS", round);
                                    return <div className={"matchday"} key={"round-"+ i}>
                                        <div className="select-box-checkbox">
                                            <div style={{width: '100%'}}>
                                                {isNaN(round) && round}
                                                {!isNaN(round) && "Matchday " + round}
                                                {<span onClick={()=> {}}>All ></span>}
                                            </div>
                                        </div>

                                        <div className={"match-group"}>
                                            {matches && Array.from (matches.values()).map((item, mi, list) => {
                                                return <div className={"match "} key={"match" + mi}>
                                                    {item.competitors.map(( competitor, ci)=>{
                                                        return <span key={"competitor-" + ci}>
                                                            {competitor.name} {(list.length !== ci + 1) && " vs " }
                                                        </span>
                                                    })}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                }) }
                            </div>*/}
                        </div>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentInformation)