import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";
import {searchIcon} from "../../main/components/Icons";
import localStorageEnums from '../../main/constants/localStorageEnums';
import {PropTypes} from 'prop-types';
import uniqBy from 'lodash/uniqBy'

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports:[],
            checkedSports: this.getActiveSport(),
            seeAll: false
        };

        this.searchIcon = searchIcon;
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount () {
        if ( ContentArena.Data.ActiveSports.length === 0) {
            ContentArena.Api.getActiveSports().done( (sports ) => {
                ContentArena.Data.ActiveSports = sports;
                !this.isCancelled && this.setState({sports});
            });
        } else {
            !this.isCancelled && this.setState({sports: ContentArena.Data.ActiveSports});
        }

        this.syncPropsWithLocalStorage();
    }

    syncPropsWithLocalStorage() {
        const sports = localStorage.getItem(localStorageEnums.SPORTS) && JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));
        if (sports && sports.label !== this.props.sport.label) {
            this.props.selectSport(sports);
        }
    }

    getOptions = () => {
        const {sports} = this.state;

        let countries = sports.filter(s=>s.name).map((i,k)=>({value : i.name , label : i.name }));

        return [...[{value: null, label: 'All sports'}], ...countries];
    };

    showTab = (tab) => {
        this.setState({tab});
    };

    setSport = (sports) => {
        localStorage.setItem(localStorageEnums.SPORTS, JSON.stringify(sports));
        this.props.selectSport(sports);

        this.setState({
            checkedSports: sports
        })
    }

    onSelectSport = (e, sp) => {
        const checked = e.target.checked;
        const checkedSports = this.state.checkedSports;
        const selectedSport = sp;

        if (checked) {
            selectedSport.value
                ? this.setSport(uniqBy([...checkedSports, selectedSport], "value"))
                : this.setSport([]);
        } else {
            this.setSport([...checkedSports.filter(e => e.value !== selectedSport.value)]);
        }

        this.handleFilter();
    };

    updateEvent = (e) => {
        this.props.updateEvent(this.refs.search_field.value);
    };

    handleFilter = () => {
        this.props.onFilter();
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleFilter()
        }
    };

    getActiveSport = () => {
        const sportFromStorage = localStorage.getItem(localStorageEnums.SPORTS) &&
            JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));
        const sportValue = sportFromStorage ? sportFromStorage : this.props.sport;
        return sportValue
    }

    isSportChecked = (sp) => {
        const {checkedSports} = this.state;
        if (checkedSports.length === 0 && sp.value === null) {
            return true
        } else {
            return checkedSports.some(s => s.value === sp.value)
        }
    }

    render() {
        const { event } = this.props;
        const {seeAll} = this.state;
        return (
            <div>
                <div className="box">
                    <div className="search-btn"
                         onClick={this.handleFilter}
                    >
                        <img src={this.searchIcon}/>
                    </div>
                    <input
                        className="search-input ca-form-control"
                        value={event}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.updateEvent}
                        ref="search_field"
                        type="text"
                        id="inputSearch"
                        name="event"
                        placeholder={this.context.t("Search", {}, "Marketplace - Placeholder for Search input")}/>
                </div>
                <div className="box">
                    <div className="title">
                        {this.context.t("MARKETPLACE_LABEL_FILTER_SPORT")}
                    </div>

                    {this.getOptions().slice(0, seeAll ? -1 : 6).map(sp => {
                        return (
                            <div style={{margin: '7px 0 '}} key={sp.label}>
                                <label className={'d-flex'}>
                                    <input
                                        type="checkbox"
                                        onChange={e => this.onSelectSport(e, sp)}
                                        className={'ca-checkbox checkbox-item'}
                                        defaultChecked={this.isSportChecked(sp)}
                                    />
                                    <span>{sp.label}</span>
                                </label>
                            </div>
                        )
                    })}
                    <hr />
                    <div className="text-center">
                        <a onClick={()=>this.setState({seeAll: !seeAll})}>
                            {seeAll ? (
                                this.context.t('SEE_LESS')
                            ) : (
                                this.context.t('SEE_ALL')
                            )}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

EventFilter.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.filter
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id)),
        selectSport : sport =>dispatch(updateSport(sport)),
        updateEvent : event => dispatch(updateEvent(event))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter)