import React from 'react';
import Round from '../components/Round';

export const Description = ({value, onBlur}) => (
    <div className="textarea-input">
        <label>Enter a description</label>
        <textarea onBlur={onBlur} defaultValue={value} placeholder={"Provide a short description of your content listing"}/>
    </div>
);

export const TitleBar = ({title, subtitle}) => (
    <div className="title-bar">
        <hr/>
        <div className={"title"}>{title}</div>
        <div className={"subtitle"}>{subtitle}</div>
    </div>
);

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
            return <Round key={i} round={number} season={season} />
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
                               placeholder={"Sport"}  />
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