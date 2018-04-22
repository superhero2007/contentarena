import React from 'react';
import NewSeason from './NewSeason'
import { Schedules } from "../../sell/components/SellFormItems";

export const NewFixture = ({onRemove, onAdd, onBlur, value, showAdd}) => (
    <div>
        <input
            className="new-category"
            type="text"
            placeholder="Enter fixture"
            onBlur={onBlur}
            defaultValue={value}/>
        <i onClick={onRemove} className="fa fa-close"/>
        {showAdd && <i onClick={onAdd} className="fa fa-plus"/>}
    </div>
);

class SeasonSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSchedule : false,
            fixtures : []
        };
    }

    toggle = () => {
        this.setState((prevState) => ({
            showSchedule: !prevState.showSchedule
        }));
    };

    addFixture = () => {
        this.setState((prevState)=>({
            fixtures : [...prevState.fixtures,1]
        }));
    };

    removeFixture = (i) => {
        this.setState((prevState)=>{
            prevState.fixtures.splice(i,1);
            return {
                fixtures: prevState.fixtures
            }
        });
    };

    render(){
        return (
            <div>
                <div>
                    {!this.props.isCustom &&
                    <input
                        type="text"
                        value={this.props.value || ""}
                        readOnly={true}
                        disabled={this.props.loading}
                        onClick={this.props.openSelector}
                        placeholder={"Season"}/>
                    }
                    { !this.props.isCustom && this.props.showClose &&
                    <i onClick={this.props.removeSeason} className="fa fa-close"/>}
                    { this.props.loading && <i className="fa fa-cog fa-spin"/>}

                    { this.props.isCustom
                    && <NewSeason showClose={this.props.showClose}
                                  onBlur={this.props.onBlur}
                                  onRemove={this.props.removeSeason } />}

                </div>
                {this.props.schedules && <div>
                    <button onClick={this.toggle}>Event list</button>
                </div>}
                {this.state.showSchedule && <div>
                    <Schedules schedules={this.props.schedules}/>
                </div>}
                {this.props.showAddNew && <div>
                    <button onClick={this.props.addSeason}>Add season</button>
                </div>}
                {this.props.showAddNew && <div>
                    Do you wish to add fixtures individually?
                    <button onClick={this.addFixture}>Click here</button>
                </div>}

                {this.state.fixtures.length > 0 && <div>
                    {
                        this.state.fixtures.map( (fixture, i, list) => {
                            return <NewFixture
                                key={i}
                                onAdd={this.addFixture}
                                onRemove={() => this.removeFixture(i)}
                                showAdd={i === list.length - 1}
                            />
                        })
                    }
                </div>}

            </div>
        )
    }
}

export default SeasonSelector;
