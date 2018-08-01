import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";
import {editedProgramSelected} from "../../main/actions/utils";

function Wrapper(props) {
    if (props.isFragment) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    } else {
        return (
            <div className={"listing-row"}>
                {props.children}
            </div>
        );
    }

}

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
            customTournament,
            customCategory,
            tournament,
            seasons,
            showCustomId,
            PROGRAM_YEAR,
            PROGRAM_EPISODES,
            isFragment
        } = this.props;

        let schedules = this.getSchedules();
        let rounds = schedules.rounds;
        let matches = schedules.matches;
        let seasonTitle = ( seasons.length > 1 ) ? "Seasons: " : "Season: ";
        let seasonName =  seasonTitle + seasons.map(season => (season.year)).join(", ");
        let roundsTitle = ( rounds.length > 1 ) ? "Rounds: " : "Round: ";
        let roundsName =  roundsTitle + rounds.join(", ");
        return (
            <Wrapper isFragment={isFragment}>

                <div className="listing-item event">
                    {sports && sports.length === 1 && <span>{sports[0].name}</span>}
                    {sports && sports.length > 1 && <span>Multiple Sports</span>}
                    {sportCategory && sportCategory.length > 0 && <span> {sportCategory[0].name}</span> }
                    {customCategory && <span>{customCategory}</span>}
                </div>

                {tournament && tournament.length > 0 &&
                <div className="listing-item event">{tournament[0].name}</div>}

                {customTournament &&
                <div className="listing-item event">{customTournament}</div>}

                {tournament && tournament.length === 0 && !customTournament &&
                <div className="listing-item event">General content</div>}

                {seasons && seasons.length > 0 &&
                <div className="listing-item event">{seasonName}</div>}

                {this.showProgramInfo() && PROGRAM_YEAR &&
                <div className="listing-item event">Release year: {PROGRAM_YEAR}</div>}

                {this.showProgramInfo() && PROGRAM_EPISODES &&
                <div className="listing-item event">Episodes: {PROGRAM_EPISODES}</div>}

                {this.getFixtures().length > 1 &&
                <div className="listing-item event">{this.getFixtures().length} fixtures</div>}

                {this.getFixtures().length === 1 &&
                <div className="listing-item event">{this.getFixtures()[0].name}</div>}

                {rounds.length === 1 &&
                <div className="listing-item event">{roundsName}</div>}

                {rounds.length > 1 &&
                <div className="listing-item event">Multiple rounds</div>}

                {matches.length === 1 &&
                <div className="listing-item event">
                    {matches[0].competitors.map(( competitor, i, list)=>{
                    return <span key={i}>{competitor.name} {(list.length !== i + 1) && " vs " }</span>
                })}
                </div>}

            </Wrapper>
        );
    }
}



export default ContentListingEventDetails