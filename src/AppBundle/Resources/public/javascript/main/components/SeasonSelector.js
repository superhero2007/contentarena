import React from 'react';
import NewSeason from './NewSeason'
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import NewFixture from "./NewFixture"
import DatePicker from '@components/DatePicker';
import { DATE_FORMAT } from "@constants";
import moment from "moment";

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

    setDurationStart = (e) => {
        const {index} = this.props;
        this.props.updateFromMultiple("seasons", index, 'customStartDate', e.format());
    };

    setDurationEnd = (e) => {
        const {index} = this.props;
        this.props.updateFromMultiple("seasons", index, 'customEndDate', e.format());
    };

    render(){
        const {index, season, seasons, validation} = this.props;
        let activeSeason = seasons[season];

        return (
            <div style={{zIndex: 1}} className="base-container">
                {!this.props.isCustom &&
                <div className="base-input">
                    <label>
                        {this.context.t("CL_STEP1_LABEL_SEASON")}
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

                {this.props.isCustom && activeSeason
                && <NewSeason showClose={this.props.showClose}
                              onBlur={this.props.onBlur}
                              index={index}
                              onRemove={this.props.removeSeason } />}

                {this.renderDurationFields(activeSeason)}

                {this.props.showAddNew && activeSeason && (
                    <div className="step-item-description d-flex justify-content-end text-right align-items-center">
                        <div style={{marginRight: 15}}>
                            {this.context.t("Would you like to add specific fixture details to your listing? This is especially important if you sell single matches (e.g. friendly matches) or rounds.")}
                        </div>
                        <button className="standard-button link-button" onClick={this.addFixture} style={{minWidth:200}}>
                            {this.context.t("CL_STEP1_ADD_FIXTURES")}
                        </button>
                    </div>
                )}

                {this.props.showAddNew && (
                    <div className="step-item-description d-flex justify-content-end text-right align-items-center">
                        <div style={{marginRight: 15}}>
                            {this.context.t("CL_STEP1_ADD_SEASON_BUTTON_DESCRIPTION")}
                         </div>
                        <button className="standard-button link-button" onClick={this.props.addSeason} style={{minWidth:200}}>
                            {this.context.t("CL_STEP1_ADD_SEASON")}
                        </button>
                    </div>
                )}

                {activeSeason && activeSeason.fixtures && activeSeason.fixtures.length > 0 && <div className="base-input fixture-wrapper">
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
                                isInvalid={!fixture.name && validation}
                            />
                        })
                    }
                </div>}
            </div>
        )
    }

    renderDurationFields(activeSeason) {
        if (!activeSeason) {
            return null;
        }
        
        const { startDate, endDate, customStartDate, customEndDate } = activeSeason;
        const realStartDate = customStartDate || startDate;
        const realEndDate = customEndDate || endDate;

        return (
            <div className="base-input duration-date-pickers">
                <label>{this.context.t("CL_STEP1_ADD_SEASON_DURATION")}</label>
                <label className={"season-selector-label"}>From</label>
                <DatePicker
                    showYearDropdown
                    className={"date-picker"}
                    selected={realStartDate ? moment(realStartDate) : undefined}
                    onChange={this.setDurationStart}
                    dateFormat={DATE_FORMAT}
                    placeholderText={DATE_FORMAT.toLowerCase()}
                />
                <label className={"season-selector-label"}>
                    {this.context.t("To")}
                </label>
                <DatePicker
                    showYearDropdown
                    className={"date-picker"}
                    selected={realEndDate ? moment(realEndDate) : undefined}
                    onChange={this.setDurationEnd}
                    placeholderText={DATE_FORMAT.toLowerCase()}
                    dateFormat={DATE_FORMAT}
                />
            </div>
        );
    }
}

SeasonSelector.contextTypes = {
    t: PropTypes.func.isRequired
};

NewFixture.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        ...state.content,
        validation: state.validation
    }
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

