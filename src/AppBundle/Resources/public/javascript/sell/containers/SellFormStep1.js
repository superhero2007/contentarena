import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector'
import SearchCompetition from '../../main/components/SearchCompetition'
import NewSeason from '../../main/components/NewSeason'

import {
    Description,
    Website,
    NewTournament,
    NewCategory,
    SportSelector,
    Schedules
} from "../components/SellFormItems";

class SeasonSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSchedule : false
        };
    }

    toggle = () => {
        this.setState((prevState) => ({
            showSchedule: !prevState.showSchedule
        }));
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
                              onBlur={ (e) => this.updateContentValue(e, "customSeason")}
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

            </div>
        )
    }
}

class SellFormStep1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title : "Step 1 - Event selection",
            lastSportId : null,
            lastCategoryId : null,
            lastTournamentId : null,
            loadingCategories : false,
            loadingTournaments : false,
            loadingSeasons: false,
            seasonSelectors : [1],
            sportSelectors : [1],
            seasons: [],
            schedules: {},
            showSearch : true
        };
    }

    componentDidMount () {
        ContentArena.Api.getSports().done( (sports ) => {
            ContentArena.Data.FullSports = sports;
        });

        ContentArena.Api.getCountries().done( (countries ) => {
            ContentArena.Data.Countries = countries;
        });

    }

    loadCategories (nextProps) {

        let sportId = nextProps.sports[0].externalId;

        if ( sportId === this.state.lastSportId ) return;

        this.setState({ loadingCategories : true });
        ContentArena.Api.getCategories(sportId).done( (categories ) => {
            ContentArena.Data.Categories = categories;
            this.setState({ lastSportId : sportId, loadingCategories : false });
        });
    }

    loadTournaments (nextProps) {

        let sportId = nextProps.sports[0].externalId;
        let categoryId = ( nextProps.sportCategory.length > 0 ) ? nextProps.sportCategory[0].externalId : null;

        if ( sportId === this.state.lastSportId && categoryId === this.state.lastCategoryId ) return;

        this.setState({ loadingTournaments : true });
        ContentArena.Api.getTournaments(sportId,categoryId).done( (tournaments ) => {
            ContentArena.Data.Tournaments = tournaments;
            this.setState({
                lastSportId : sportId,
                loadingTournaments : false,
                lastCategoryId : categoryId
            });
        });
    }

    loadSeasons (nextProps) {

        let tournamentId = ( nextProps.tournament.length > 0 ) ? nextProps.tournament[0].externalId : null;

        if ( tournamentId === this.state.lastTournamentId ) return;

        this.setState({ loadingSeasons : true });
        ContentArena.Api.getSeasons(tournamentId).done( (seasons ) => {
            ContentArena.Data.Seasons = seasons;
            this.setState({
                lastTournamentId : tournamentId,
                loadingSeasons : false,
                seasons : seasons
            });
        });
    }

    loadSchedule (nextProps) {

        let _this = this;

        nextProps.seasons.forEach(( season ) =>{
            if ( !_this.state.schedules[season.externalId] ){
                _this.setState({ loadingSchedule : true });
                ContentArena.Api.getSchedule(season.externalId).done( (schedules ) => {
                    _this.setState(function(prevState) {
                        let prevSchedules = prevState.schedules;
                        prevSchedules[season.externalId] = schedules;
                        return {
                            loadingSchedule : false,
                            schedules: prevSchedules
                        };
                    });
                });
            }
        });
    }

    getSchedules(index){

        if (!this.props.seasons || !this.props.seasons[index] ) return false;

        return this.state.schedules[this.props.seasons[index].externalId];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sports.length === 1) {
            this.loadCategories(nextProps);
            this.setState(() => ({
                showSearch: false
            }));
        }

        if (nextProps.sports.length === 0) {
            this.setState(() => ({
                seasons: [],
                schedules: []
            }));
        }

        if (nextProps.sports.length === 1 || nextProps.sportCategory.length === 1) this.loadTournaments(nextProps);
        if (nextProps.tournament.length === 1 && !nextProps.tournament[0].custom) {
            this.loadSeasons(nextProps);
        }
        if (nextProps.seasons.length > 0) {
            this.setState(() => ({
                seasonSelectors: [...Array(nextProps.seasons.length).keys()]
            }));

            this.loadSchedule(nextProps);
        }

    }

    updateContentValue = ( event, key ) =>{
        this.props.updateContentValue(key,event.target.value);
    };

    forceCustomTournament = () => { return this.hasCustomSport() || this.hasCustomCategory()  };

    forceCustomCategory = () => { return this.hasCustomSport()  };

    forceCustomSeason = () => {
        return this.hasCustomSport()
            || this.hasCustomTournament()
    };

    hasCustomSport = () => {
        let hasCustomSport = false;

        this.props.sports.forEach( ( sport ) => {
            if ( sport.custom ) hasCustomSport = true;
        });

        return hasCustomSport && this.props.sports.length === 1;

    };

    hasCustomCategory = () => {
        let hasCustomCategory = false;

        this.props.sportCategory.forEach( ( sportCategory ) => {
            if ( sportCategory.custom ) hasCustomCategory = true;
        });

        return this.forceCustomCategory() || hasCustomCategory;
    };

    hasCustomTournament = () => {
        let hasCustomTournament = false;

        this.props.tournament.forEach( ( tournament ) => {
            if ( tournament.custom ) hasCustomTournament = true;
        });

        return this.forceCustomTournament() || hasCustomTournament;
    };

    hasCustomSeason = () => {

        let hasCustomSeason = false;

        this.props.seasons.forEach( ( season ) => {
            if ( season.custom ) hasCustomSeason = true;
        });

        return this.forceCustomSeason() || hasCustomSeason;
    };

    addSeason = () => {
        this.setState((prevState)=> ({
            seasonSelectors : [...prevState.seasonSelectors, 1]
        }))
    };

    addSportSelector = () => {
        this.setState((prevState)=> ({
            sportSelectors : [...prevState.sportSelectors, 1]
        }))
    };

    removeSport = (i) => {

        if ( i === 0 ) {
            this.props.removeNewSport(i);
            return;
        }

        this.setState((prevState)=> {
            prevState.sportSelectors.splice(i,1);
            return {
                sportSelectors : prevState.sportSelectors
            }
        });

        this.props.removeFromMultiple(i, "sports");
    };

    removeSeason = (i) => {

        if ( i === 0 ) {
            this.props.removeNewSeason(i);
            return;
        }

        this.setState((prevState)=> {
            prevState.seasonSelectors.splice(i,1);
            return {
                seasonSelectors : prevState.seasonSelectors
            }
        });

        this.props.removeFromMultiple(i, "seasons");
    };

    toggleSearch = () => {
        this.setState((prevState) => ({
            showSearch: !prevState.showSearch
        }));
    };

    selectTournament = ( tournament ) =>{
        this.toggleSearch();
        this.props.selectTournament(tournament);
    };

    render() {
        if ( this.props.step !== 1) return (null);

        const inputProps = {
            sports: [{ value : "", custom : false }],
            sportCategory : { value : "", custom : false },
            tournament : { value : "", custom : false },
            seasons : [{ value : "", custom : false }]
        };

        if ( this.props.sports.length > 0 ) {
            inputProps.sports = [];
            this.props.sports.forEach(( sport )=>{
                inputProps.sports.push({
                    value: sport.name,
                    isCustom : sport.custom
                })
            });
        }
        if ( this.props.seasons.length > 0 ) {
            inputProps.seasons = [];
            this.props.seasons.forEach(( season )=>{
                inputProps.seasons.push({value: season.name,isCustom : season.custom})
            });
        }
        if ( this.props.sportCategory.length > 0 ) {
            inputProps.sportCategory = {
                value: this.props.sportCategory[0].name,
                isCustom: this.props.sportCategory[0].isCustom
            }
        }
        if ( this.props.tournament.length > 0 ) {
            inputProps.tournament = {
                value: this.props.tournament[0].name,
                isCustom: this.props.tournament[0].isCustom
            }
        }

        return (
            <div className="step-content">

                {this.state.showSearch && <SearchCompetition close={this.toggleSearch} select={this.selectTournament} />}
                {!this.state.showSearch && <button onClick={this.toggleSearch}>Show search function</button>}
                {!this.state.showSearch && <div className="step-content-container">

                    <div className="step-item-description">
                        Please select the sport(s) and competition(s) covered by your content listing:
                    </div>

                    {
                        this.state.sportSelectors.map((item, i, list)=>{
                            return <SportSelector
                                key={i}
                                remove={() => this.removeSport(i) }
                                showAddNew={list.length > 1 && list.length === i + 1}
                                showClose={ i > 0 }
                                isCustom={(inputProps.sports[i]) ? inputProps.sports[i].isCustom : false}
                                addSportSelector={this.addSportSelector}
                                onClick={() => { this.props.openSportSelector(i, this.props.sports) } }
                                value={( inputProps.sports[i]) ?inputProps.sports[i].value : ""}  />
                        })
                    }

                    {this.state.sportSelectors.length === 1 && <div>
                        Your content covers multiple sports? <button onClick={this.addSportSelector}>Please click here</button>
                    </div>}
                    {this.state.sportSelectors.length === 1 && <div>
                        {!this.hasCustomCategory() && <input
                            type="text"
                            value={inputProps.sportCategory.value || ""}
                            readOnly={true}
                            disabled={this.props.sports.length === 0 || this.state.loadingCategories}
                            onClick={() => {
                                this.props.openCategorySelector(this.props.sportCategory)
                            }}
                            placeholder={"Country/Category"}  />
                        }
                        { this.hasCustomCategory() && <NewCategory
                            showClose={!this.forceCustomCategory()}
                            value={this.props.customCategory}
                            onBlur={ (e) => this.updateContentValue(e, "customCategory")}
                            onClick={this.props.removeNewCategory}
                        />}
                        { this.state.loadingCategories && <i className="fa fa-cog fa-spin"/>}
                    </div>}
                    {this.state.sportSelectors.length === 1 && <div>
                        {!this.hasCustomTournament() && <input type="text"
                               value ={inputProps.tournament.value || ""}
                               readOnly={true}
                               disabled={this.props.sports.length === 0 || this.state.loadingTournaments}
                               onClick={() => {
                                   this.props.openTournamentSelector( this.props.tournament );
                               }}
                               placeholder={"Tournament"}  />}
                        { ( this.hasCustomTournament() )
                        && <NewTournament showClose={!this.forceCustomTournament()}
                                          value={this.props.customTournament}
                                          onBlur={ (e) => this.updateContentValue(e, "customTournament")}
                                          onClick={this.props.removeNewTournament} />}

                        { this.state.loadingTournaments && <i className="fa fa-cog fa-spin"/>}
                    </div>}
                    {this.state.sportSelectors.length === 1 && ( this.state.seasons.length > 0 || this.forceCustomSeason() )
                        && this.state.seasonSelectors.length > 0 &&
                    this.state.seasonSelectors.map( (season, i) => {
                        return <SeasonSelector
                            key={i}
                            season={season}
                            addSeason={this.addSeason}
                            removeSeason={()=>this.removeSeason(i)}
                            value={ (inputProps.seasons[i] ) ? inputProps.seasons[i].value : ""}
                            schedules={this.getSchedules(i)}
                            loading={this.state.loadingSeasons}
                            showClose={ i > 0 || ( !this.forceCustomSeason() && this.hasCustomSeason() ) }
                            isCustom={(inputProps.seasons[i]) ? inputProps.seasons[i].isCustom || this.forceCustomSeason() : false}
                            showAddNew={this.state.seasonSelectors.length === i + 1}
                            openSelector={()=>this.props.openSeasonSelector(i, this.props.seasons)}/>
                    })}

                    <Description value={this.props.description} onBlur={ (e) => this.updateContentValue(e, "description")} />
                    <Website value={this.props.website} onBlur={ (e) => this.updateContentValue(e, "website")} />
                    <FileSelector target={"brochure"}/>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        openSportSelector : (index, selectedItems) => dispatch({
            type : 'OPEN_SELECTOR',
            selectorItems : ContentArena.Data.FullSports,
            popularItems : ContentArena.Data.TopSports,
            selectorType : "sports",
            activeFilter : "popular",
            clean: ["tournament", "seasons", "sportCategory"],
            selectedItems : selectedItems,
            showNewSport : true,
            index : index
        }),
        openCategorySelector : (selectedItems) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Categories,
            selectorType: "sportCategory",
            activeFilter : "ag",
            showAllCountries : true,
            showNewCategory : true,
            selectedItems: selectedItems,
            index: 0,
            clean: ["tournament", "seasons"]
        }),
        openTournamentSelector : (selectedItems) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Tournaments,
            selectorType: "tournament",
            activeFilter : "ag",
            index: 0,
            selectedItems: selectedItems,
            showNewTournament : true,
            clean: ["seasons"]
        }),
        openSeasonSelector : (index, selectedItems) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Seasons,
            selectorType: "seasons",
            multiple: true,
            index: index,
            showNewSeason : true,
            clean : [],
            selectedItems : selectedItems
        }),
        removeFromMultiple : (index, selectorType) => dispatch({
            type: 'REMOVE_FROM_MULTIPLE',
            selectorType: selectorType,
            index: index
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
        removeNewSport : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sports",
        }),
        removeNewTournament : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "tournament",
        }),
        removeNewCategory : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "sportCategory",
        }),
        removeNewSeason : (index) => dispatch({
            type: 'REMOVE_NEW',
            index : index,
            selectorType : "seasons",
        }),
        selectTournament : (tournament) => dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)