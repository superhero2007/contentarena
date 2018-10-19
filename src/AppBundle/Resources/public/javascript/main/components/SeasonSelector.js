import React from 'react';
import NewSeason from './NewSeason'
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import NewFixture from "./NewFixture"

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

    onChangeFixtureDate = (i, value ) => {
        const {updateFromMultiple, seasons, index} = this.props;
        let fixtures = seasons[index].fixtures;

        fixtures[i].date = value;
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
            <div style={{zIndex: 50-index, maxWidth: 872}}>
                {!this.props.isCustom &&
                <div className="base-input">
                    <label>
                        {this.context.t("Season")}
                    </label>
                    <input
                        type="text"
                        value={this.props.value || ""}
                        readOnly={true}
                        disabled={this.props.loading}
                        onClick={this.props.openSelector}
                        placeholder={this.context.t("Season")}/>

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

                {this.props.showAddNew && activeSeason &&
                <div className="step-item-description" style={{display: 'flex'}}>
                    <div style={{maxWidth: 655}}>
                        {this.context.t("Would you like to add specific fixture details to your listing? This is especially important if you sell single matches (e.g. friendly matches) or rounds.")}
                    </div>
                    <button style={{marginLeft: 21, alignSelf: 'center'}} className="standard-button link-button" onClick={this.addFixture}>
                        {this.context.t("CL_STEP1_ADD_FIXTURES")}
                    </button>
                </div>}

                {this.props.showAddNew && <div>
                    <button style={{marginBottom: 25, marginLeft: 'auto', minWidth: 196}} className="standard-button link-button" onClick={this.props.addSeason}>
                        {this.context.t("CL_STEP1_ADD_SEASON")}
                    </button>
                </div>}

                {activeSeason && activeSeason.fixtures && activeSeason.fixtures.length > 0 && <div>
                    {
                        activeSeason.fixtures.map( (fixture, i, list) => {
                            return <NewFixture
                                key={i}
                                id={i}
                                onAdd={this.addFixture}
                                value={fixture.name}
                                date={fixture.date}
                                handleDate={(e) => this.onChangeFixtureDate(i, e)}
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
SeasonSelector.contextTypes = {
    t: PropTypes.func.isRequired
};

NewFixture.contextTypes = {
    t: PropTypes.func.isRequired
};

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

