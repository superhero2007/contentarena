import React from 'react';
import moment from 'moment';
import Round from '../components/Round';
import StaticRound from '../components/StaticRound';

export const Description = ({value, onChange, title= "Enter a description", placeholder="Provide a short description of your content listing"}) => (
    <div className="textarea-input">
        <label>{title} (optional)</label>
        <textarea onChange={onChange} value={value} placeholder={placeholder}/>
    </div>
);

export const TitleBar = ({title, subtitle, infoText}) => (
    <div className="title-bar">
        <hr/>
        <div className={"title"}>{title}</div>
        <div className={"subtitle"}>{subtitle}</div>
        {infoText && (
            <i className="fa fa-info-circle tooltip-icon" title={infoText}/>
        )}
    </div>
);

export const SummaryText = ({sports, sportCategory, tournament, seasons, customCategory, customTournament}) => {

    let summary = "", rounds = [], fixtures = [], matches = [];

    if (sports.length === 0 && sportCategory.length === 0 && tournament.length === 0) return null;

    if (sports.length > 1) {
        summary += 'Multiple sports';
    } else {
        summary += sports[0].name;
    }

    if ( sportCategory.length > 0 && !sportCategory[0].custom )  summary += " - " + sportCategory[0].name;
    if ( customCategory && customCategory != "") summary += " - " + customCategory;
    if ( tournament.length > 0 && !tournament[0].custom )  summary += " - " + tournament[0].name;
    if ( customTournament && customTournament != "") summary += " - " + customTournament;
    if ( seasons.length > 0 ){
        const seasonsStr = [];
        seasons.forEach(s => {
            const str = s.custom && s.from && s.to ? `${s.from}/${s.to}` : (s.custom && s.from) ? s.from : (s.year) ? s.year: null;
            if (str) seasonsStr.push(str);
            if ( s.fixtures ) fixtures = [...fixtures, ...s.fixtures];
        });

        if (seasonsStr.length) {
            summary += " - " + seasonsStr.join(' - ');
        }
    }

    if ( rounds.length <= 1 && fixtures.length === 1 )  summary += ` - ${fixtures[0].name} (${moment(fixtures[0].date).format('DD-MM-YYYY')})`;
    if ( rounds.length <= 1 && fixtures.length > 1 )  summary += " - " + fixtures.length + " Fixtures";
    if ( rounds.length <= 1 && matches.length === 1 )  summary += " - " + matches[0].competitors.map(function (competitor) {
        return competitor.name ;
    }).join(" vs ");
    if ( rounds.length === 1 && matches.length !== 1 )  summary += " - " + rounds[0];
    if ( rounds.length > 1) summary += " - Multiple rounds";


    return <span>{summary}</span>;
};

export const NewCategory = ({onClick, showClose, onBlur, value}) => (
    <div className="base-input">
        <label>Country/Category</label>
        <input
            className="new-category"
            type="text"
            placeholder="Enter Country/Category"
            onBlur={onBlur}
            defaultValue={value}/>
        { showClose && <button onClick={onClick} className={"standard-button"}><i className="fa fa-close"/></button>}
    </div>
);

export const NewTournament = ({onClick, showClose, onBlur, value}) => (
    <div className="base-input">
        <label>Competition</label>
        <input
            className="new-category"
            type="text"
            onBlur={onBlur}
            defaultValue={value}
            placeholder="Enter competition name"/>
        { showClose && <button onClick={onClick} className={"standard-button"}><i className="fa fa-close"/></button>}
    </div>
);

export const Schedules = ({season, seasons}) => (
    <div className="schedule">
        { seasons && seasons[season] && seasons[season].schedules && Object.keys(seasons[season].schedules).map(( number, i ) => {
            return <Round seasons={seasons} key={i} round={number} season={season} />
        }) }
    </div>
);


export const StaticSchedules = ({season, seasons}) => (
    <div className="schedule">
        { seasons && seasons[season] && seasons[season].schedules && Object.keys(seasons[season].schedules).map(( number, i ) => {
            return <StaticRound seasons={seasons} key={i} round={number} season={season} />
        }) }
    </div>
);


export class SportSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handle = (e) => {
        const {onUpdateNew} = this.props;

        if (onUpdateNew) onUpdateNew(e.target.value);
    };

    render(){
        const {sports, index} = this.props;
        return (
            <div>
                <div className="base-input">
                    <label>Sport</label>
                    {
                        !this.props.isCustom &&
                        <input type="text"
                               value={this.props.value}
                               readOnly={true}
                               onClick={this.props.onClick}
                               placeholder={"e.g. Soccer"}  />
                    }

                    {
                        this.props.isCustom &&
                        <input
                            className="new-sport"
                            type="text"
                            value={sports[index].value}
                            onChange={this.handle}
                            placeholder="Enter sport"/>
                    }

                    { ( this.props.isCustom || this.props.showClose ) &&
                        <button className="standard-button" onClick={this.props.remove}>
                            <i className="fa fa-close"/>
                        </button>
                    }
                </div>
                {this.props.showAddNew &&
                <button style={{marginBottom: "25px"}} className={"link-button"} onClick={this.props.addSportSelector}>Add sport</button> }
            </div>
        )
    }
}