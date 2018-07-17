import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";

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

        const {rightsPackage, programs} = this.props;

        let show = false;

        if (rightsPackage.length > 1) return show;

        rightsPackage.forEach(rp => {
            if ( rp.shortLabel === "PR" ) show = true;
        });


        return show && programs && programs.length > 0;

    };

    render() {
        const {
            sports,
            sportCategory,
            tournament,
            seasons,
            programs,
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

                {this.showProgramInfo() && programs[0].releaseYear &&
                <div className="listing-item">Release year: {programs[0].releaseYear}</div>}

                {this.showProgramInfo() && programs[0].episodes &&
                <div className="listing-item">Episodes: {programs[0].episodes}</div>}

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