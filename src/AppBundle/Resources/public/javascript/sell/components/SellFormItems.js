import React from 'react';
import Round from '../components/Round';

export const Description = ({value, onBlur}) => (
    <div>
        <div className="step-item-description">
            Provide a short description of your content listing
        </div>
        <textarea onBlur={onBlur} defaultValue={value}/>
    </div>
);

export const Website = ({value, onBlur}) => (
    <div>
        <input
            className="website"
            type="text"
            onBlur={onBlur}
            defaultValue={value}
            placeholder="Website"/>
    </div>
);

export const NewCategory = ({onClick, showClose, onBlur, value}) => (
    <div>
        <input
            className="new-category"
            type="text"
            placeholder="Enter category"
            onBlur={onBlur}
            defaultValue={value}/>
        { showClose && <i onClick={onClick} className="fa fa-close"></i>}
    </div>
);

export const NewTournament = ({onClick, showClose, onBlur, value}) => (
    <div>
        <input
            className="new-category"
            type="text"
            onBlur={onBlur}
            defaultValue={value}
            placeholder="Enter competition name"/>
        { showClose && <i onClick={onClick} className="fa fa-close"></i>}
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

                { ( this.props.isCustom || this.props.showClose ) && <i onClick={this.props.remove} className="fa fa-close"/>}

                {this.props.showAddNew && <div>
                    <button onClick={this.props.addSportSelector}>Add sport</button>
                </div>}
            </div>
        )
    }
}