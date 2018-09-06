import React from 'react';
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

export const SummaryText = ({sports, sportCategory, tournament, seasons}, context) => {

    let summary = "", rounds = [], fixtures = [], matches = [];

    if (sports.length === 0 && sportCategory.length === 0 && tournament.length === 0) return null;
    if (sports.length > 1 ) return <span>{context.t("LISTING_DETAILS_MULTIPLE_SPORTS")}</span>;

    summary += sports[0].name;
    if ( sportCategory.length > 0 )  summary += " - " + sportCategory[0].name;
    if ( tournament.length > 0 )  summary += " - " + tournament[0].name;
    if ( seasons.length > 0 ){
        seasons.forEach(s => {
            if (s.schedules) Object.entries(s.schedules).forEach((sh) =>{
                if (sh[1].selected && rounds.indexOf(sh[0]) === -1){
                    rounds.push(sh[0]);
                    sh[1].matches.forEach(m => {
                        if(m.selected) matches.push(m)
                    });
                }
            })
            if ( s.fixtures ) fixtures = [...fixtures, ...s.fixtures];
        });
    }

    if ( rounds.length <= 1 && fixtures.length === 1 )  summary += " - " + fixtures[0].name;
    if ( rounds.length <= 1 && fixtures.length > 1 )  summary += " - " + fixtures.length + " fixtures";
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