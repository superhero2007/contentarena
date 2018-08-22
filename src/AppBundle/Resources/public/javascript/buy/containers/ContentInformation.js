import React from 'react';
import { connect } from "react-redux";
import { test } from "../actions";
import { StaticSchedules } from "../../sell/components/SellFormItems";
import {PropTypes} from "prop-types";

class ContentInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seasons : props.seasons
        };
        this.baseDir = assetsBaseDir + "../";
        this.pdfIcon = assetsBaseDir + "app/images/pdf.png";
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
        const {description, website, attachments }= this.props;
        const {seasons }= this.state;
        return (
            <div style={{marginTop: 20}}>

                {/*SEASON/FIXTURES*/}
                {
                    seasons && seasons.length > 0 && seasons.map((season, key)  => {
                        return <div key={"season-" + key} className="season-details">
                            <div className="season-name">
                                 {this.context.t("Season :")} {season.name}
                            </div>
                            {( !season.fixtures || season.fixtures.length === 0) && <StaticSchedules season={key} seasons={seasons}/>}
                            { season.fixtures && season.fixtures.length > 0 &&
                            <div className="schedule">
                                {season.fixtures.map(fixture => {
                                    return <div className="matchday">
                                        {fixture.name}
                                    </div>})}
                            </div>}
                        </div>
                    })
                }

                {/*DESCRIPTIONS*/}
                {description && (
                    <div className="full-item-box">
                        <label>
                            {this.context.t("EVENT DESCRIPTION")}
                        </label>
                        <div className="full-item-content">
                            {description}
                        </div>
                    </div>
                )}


                {/*WEBSITE*/}
                {website && (
                    <div className="full-item-box"
                         style={{
                             flexDirection : 'row',
                             width : '70%'
                         }}>
                        <label>
                            {this.context.t("CONTENT WEBSITE")}
                        </label>
                        <div style={{ padding: 12, border: '1px solid lightgrey', marginLeft: 3, minWidth: 220}}>
                            {website && website.map(website=>{
                                return <div><a target="_blank" href={website}>{website}</a></div>
                            })}
                        </div>
                    </div>
                )}

                {/*ATTACHMENTS*/}
                {attachments && attachments.length > 0 && (
                    <div className="full-item-box"
                         style={{
                             flexDirection : 'row',
                             width : '70%'
                         }}>
                        <label style={{
                            height: 'auto'
                        }}>
                            {this.context.t("ATTACHMENTS")}
                        </label>
                        <div style={{display : "flex", flexDirection: 'column'}}>{attachments.map(a=>{
                            return <div onClick={()=>{}} style={{
                                padding: 12, border: '1px solid lightgrey', marginLeft: 3, minWidth: 220,
                                display: 'flex'
                            }}>
                                <a download={a.name} target="_blank" href={this.baseDir + a.file} style={{
                                    display: 'inline-flex',
                                    paddingRight: 30
                                }}>
                                    <img style={{ margin: '-2px 5px 0 0'}} src={this.pdfIcon}/>  {a.name}
                                </a>
                            </div>
                        })}</div>
                    </div>
                )}



            </div>
        );
    }
}

ContentInformation.contextTypes = {
    t: PropTypes.func.isRequired
};

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