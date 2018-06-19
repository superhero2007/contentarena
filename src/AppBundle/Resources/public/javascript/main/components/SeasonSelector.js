import React from 'react';
import NewSeason from './NewSeason'
import { Schedules } from "../../sell/components/SellFormItems";
import {connect} from "react-redux";
import {stepChangeReset} from "../../sell/actions/contentActions";

export const NewFixture = ({onRemove, onAdd, onChange, value, showAdd}) => (
    <div className="base-input">
        <label>Fixture</label>
        <input
            className="new-category"
            type="text"
            placeholder="Enter fixture"
            onChange={onChange}
            value={value}/>
        <i onClick={onRemove} className="fa fa-close"/>
        {showAdd && <i onClick={onAdd} className="fa fa-plus"/>}
    </div>
);

class SeasonSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    toggle = () => {
        const {updateFromMultiple, seasons, index} = this.props;
        updateFromMultiple("seasons", index, "showSchedule", !seasons[index].showSchedule );
    };

    addFixture = () => {
        const {updateFromMultiple, seasons, index} = this.props;
        let fixtures = seasons[index].fixtures || [];
        updateFromMultiple("seasons", index, "fixtures", [...fixtures,{name : ""}] );

    };

    onChangeFixture = (i, value ) => {
        const {updateFromMultiple, seasons, index} = this.props;
        let fixtures = seasons[index].fixtures;

        fixtures[i].name = value;
        updateFromMultiple("seasons", index, "fixtures", fixtures );

    };

    removeFixture = (i) => {
        const {updateFromMultiple, seasons, index} = this.props;
        let fixtures = seasons[index].fixtures || [];
        fixtures.splice(i,1);
        updateFromMultiple("seasons", index, "fixtures", fixtures );
    };

    render(){
        const {index, season, seasons} = this.props;
        let activeSeason = seasons[season];
        return (
            <div style={{zIndex: 1}}>
                {!this.props.isCustom &&
                <div className="base-input">
                    <label>Season</label>
                    <input
                        type="text"
                        value={this.props.value || ""}
                        readOnly={true}
                        disabled={this.props.loading}
                        onClick={this.props.openSelector}
                        placeholder={"Season"}/>

                    { this.props.showClose &&
                    <button onClick={this.props.removeSeason} className={"standard-button"}>
                        <i className="fa fa-close"/>
                    </button>
                    }
                </div> }

                { this.props.isCustom && activeSeason
                && <NewSeason showClose={this.props.showClose}
                              onBlur={this.props.onBlur}
                              index={index}
                              onRemove={this.props.removeSeason } />}


                {activeSeason && activeSeason.schedules && <div className={"base-input"}  style={{zIndex: 1}}>
                    <label>Event</label>
                    <input type="text"
                           disabled
                           style={{
                               backgroundColor: 'white'
                           }}
                           placeholder={"Select events"}
                           onClick={this.toggle}/>
                </div>}
                {activeSeason && activeSeason.showSchedule && <div>
                    <Schedules season={season} seasons={seasons}/>
                </div>}
                {this.props.showAddNew && <div>
                    <button className="link-button" onClick={this.props.addSeason}>Add season</button>
                </div>}
                {this.props.showAddNew && <div className="step-item-description">
                    Do you wish to add fixtures individually?
                    <button className="link-button" onClick={this.addFixture}>Click here</button>
                </div>}

                {activeSeason && activeSeason.fixtures && activeSeason.fixtures.length > 0 && <div>
                    {
                        activeSeason.fixtures.map( (fixture, i, list) => {
                            return <NewFixture
                                key={i}
                                onAdd={this.addFixture}
                                value={fixture.name}
                                onChange={(e) => this.onChangeFixture(i, e.target.value)}
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


const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateFromMultiple : (type, index, key, value) => dispatch({
            type: 'UPDATE_FROM_MULTIPLE',
            selectorType: type,
            index: index,
            key: key,
            value: value
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SeasonSelector)

