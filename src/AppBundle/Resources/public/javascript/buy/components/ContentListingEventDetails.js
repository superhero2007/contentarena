import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";
import {editedProgramSelected} from "../../main/actions/utils";

class ContentListingEventDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getFixtures = () => {
        const {seasons} = this.props;

        let fixtures = [];

        seasons.forEach( s => {
            if ( s.fixtures ) fixtures = [...fixtures, ...s.fixtures]
        });

        return fixtures;

    };

    getSchedules = () => {

        const { seasons , schedulesBySeason} = this.props;
        let schedules = {
            rounds : [],
            matches : []
        };
        seasons.forEach(s => {
            if (s.schedules) Object.entries(s.schedules).forEach((sh) =>{
                if (sh[1].selected && schedules.rounds.indexOf(sh[0]) === -1){
                    schedules.rounds.push(sh[0]);
                    sh[1].matches.forEach(m => {
                        if(m.selected) schedules.matches.push(m)
                    });
                }
            })
        });

        if ( schedulesBySeason ){
            schedulesBySeason.forEach(s => {
                if (s && Object.entries(s)) Object.entries(s).forEach((sh) =>{
                    if (schedules.rounds.indexOf(sh[0]) === -1){
                        schedules.rounds.push(sh[0]);
                        sh[1].matches.forEach(m => {
                            if(m.selected) schedules.matches.push(m)
                        });
                    }


                })
            });
        }

        return schedules
    };

    showProgramInfo = () => {

        const {rightsPackage, PROGRAM_NAME} = this.props;
        let show = false;

        if (rightsPackage.length > 1) return show;
        show = editedProgramSelected(rightsPackage);
        return show && PROGRAM_NAME;

    };

    render() {
        const {
            sports,
            sportCategory,
            tournament,
            seasons,
            PROGRAM_YEAR,
            PROGRAM_EPISODES
        } = this.props;

        let schedules = this.getSchedules();
        let rounds = schedules.rounds;
        let matches = schedules.matches;
        let seasonTitle = ( seasons.length > 1 ) ? "Seasons: " : "Season: ";
        let seasonName =  seasonTitle + seasons.map(season => (season.year)).join(", ");
        let roundsTitle = ( rounds.length > 1 ) ? "Rounds: " : "Round: ";
        let roundsName =  roundsTitle + rounds.join(", ");
        return (
            <div className="listing-event-details listing-col">

                <div className="listing-item">
                    {sports && sports.length === 1 && <span>{sports[0].name}</span>}
                    {sports && sports.length > 1 && <span>Multiple Sports</span>}
                    {sportCategory && sportCategory.length > 0 && <span> {sportCategory[0].name}</span> }
                </div>

                {tournament && tournament.length > 0 &&
                <div className="listing-item">{tournament[0].name}</div>}

                {tournament && tournament.length === 0 &&
                <div className="listing-item">General content</div>}

                {seasons && seasons.length > 0 &&
                <div className="listing-item">{seasonName}</div>}

                {this.showProgramInfo() && PROGRAM_YEAR &&
                <div className="listing-item">Release year: {PROGRAM_YEAR}</div>}

                {this.showProgramInfo() && PROGRAM_EPISODES &&
                <div className="listing-item">Episodes: {PROGRAM_EPISODES}</div>}

                {this.getFixtures().length > 1 &&
                <div className="listing-item">{this.getFixtures().length} fixtures</div>}

                {this.getFixtures().length === 1 &&
                <div className="listing-item">{this.getFixtures()[0].name}</div>}

                {rounds.length === 1 &&
                <div className="listing-item">{roundsName}</div>}

                {rounds.length > 1 &&
                <div className="listing-item">Multiple rounds</div>}

                {matches.length === 1 &&
                <div className="listing-item">
                    {matches[0].competitors.map(( competitor, i, list)=>{
                    return <span key={i}>{competitor.name} {(list.length !== i + 1) && " vs " }</span>
                })}
                </div>}

            </div>
        );
    }
}



export default ContentListingEventDetails