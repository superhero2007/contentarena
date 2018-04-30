import React from 'react';
import Round from '../components/Round';

export const Description = ({value, onBlur}) => (
    <div className="textarea-input">
        <label>Enter a description</label>
        <textarea onBlur={onBlur} defaultValue={value} placeholder={"Provide a short description of your content listing"}/>
    </div>
);

export const NewCategory = ({onClick, showClose, onBlur, value}) => (
    <div className="base-input">
        <label>Category</label>
        <input
            className="new-category"
            type="text"
            placeholder="Enter category"
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

export const Schedules = ({schedules}) => (
    <div className="schedule">
        { schedules && Object.keys(schedules).map(( number, i ) => {
            return <Round key={i} round={number} schedule={schedules[number]} />
        }) }
    </div>
);

export class SportSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
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