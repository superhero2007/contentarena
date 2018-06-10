import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector'
import SearchCompetition from '../../main/components/SearchCompetition'
import SeasonSelector from '../../main/components/SeasonSelector'
import ListingName from "../components/ListingName";
import TagsInput from 'react-tagsinput'
import {stepChangeReset} from "../actions/contentActions";

import {
    Description,
    NewTournament,
    NewCategory,
    SportSelector,
} from "../components/SellFormItems";


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
            loadingSchedule: false,
            seasonSelectors : [1],
            sportSelectors : [1],
            seasons: [],
            schedules: {},
            showSearch : true,
            website: [],
            tournaments: [],
            sportCategories: [],
            sportCategoryExtended : false,
            nameFromCompetition : false
        };
    }

    componentDidMount () {
        ContentArena.Api.getSports().done( (sports ) => {
            ContentArena.Data.FullSports = sports;
        });

        if ( ContentArena.Data.Countries.length === 0) {
            ContentArena.Api.getCountries().done( (countries ) => {
                ContentArena.Data.Countries = countries;
            });
        }
    }

    loadCategories (sport) {

        let sportId = sport.externalId;

        if ( sportId === this.state.lastSportId ) return;

        this.setState({ loadingCategories : true });
        ContentArena.Api.getCategories(sportId).done( (categories ) => {
            ContentArena.Data.Categories = categories;
            this.setState({ lastSportId : sportId, loadingCategories : false });
        });
    }

    loadTournaments (sport, category) {

        let sportId = sport.externalId;
        let categoryId = ( category ) ? category.externalId : null;

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

    loadSeasons (tournaments) {

        let tournamentId = ( tournaments.length > 0 ) ? tournaments[0].externalId : null;

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

        let tournaments, seasons, sportCategories, website, name = nextProps.name;

        tournaments = ( Array.isArray(nextProps.tournament) ) ? nextProps.tournament : [nextProps.tournament];
        seasons = ( Array.isArray(nextProps.seasons) ) ? nextProps.seasons : [nextProps.seasons];
        sportCategories =( Array.isArray(nextProps.sportCategory) ) ? nextProps.sportCategory : [nextProps.sportCategory];
        website =( Array.isArray(nextProps.website) ) ? nextProps.website : (nextProps.website) ? [nextProps.website]: [];

        if (nextProps.sports.length === 1) {
            this.loadCategories(nextProps.sports[0]);
            this.setState(() => ({
                showSearch: false
            }));
        }

        if (nextProps.sports.length === 0) {
            this.setState(() => ({
                seasons: [],
                schedules: []
            }));
            sportCategories = [];
            tournaments= [];

            this.props.updateContentValue("name","");
        }

        if ( !name && tournaments.length > 0 && !this.state.nameFromCompetition) {
            this.setState({nameFromCompetition : true});
            this.props.updateContentValue("name",tournaments[0].name);
        }

        if (nextProps.sports.length === 1 ) this.loadTournaments(nextProps.sports[0], sportCategories[0]);

        if (tournaments.length === 1) if (!tournaments[0].custom) this.loadSeasons(tournaments);

        this.setState({
            sportCategories: sportCategories,
            tournaments : tournaments
        });

        if (sportCategories.length === 1 ) {
            this.setState({sportCategoryExtended : sportCategories[0].extended});
        }

        if (seasons.length > 0) {
            this.setState(() => ({
                seasonSelectors: [...Array(seasons.length).keys()]
            }));
            this.loadSchedule(nextProps);
        }

        if (website && website.length > 0) {
            this.setState({ website: website});
        }

    }

    /**
     *
     * @param event
     * @param key
     */
    updateContentValue = ( event, key ) =>{
        this.props.updateContentValue(key,event.target.value);
    };

    forceCustomTournament = () => { return this.hasCustomSport() || this.hasCustomCategory() || this.state.sportCategoryExtended  };

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

        this.state.sportCategories.forEach( ( sportCategory ) => {
            if ( sportCategory.custom ) hasCustomCategory = true;
        });

        return this.forceCustomCategory() || hasCustomCategory ;
    };

    hasCustomTournament = () => {
        let hasCustomTournament = false;

        this.state.tournaments.forEach( ( tournament ) => {
            if ( tournament.custom ) hasCustomTournament = true;
        });

        return this.forceCustomTournament() || hasCustomTournament || this.state.sportCategoryExtended;
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

    websitesUpdated = (website) => {
        this.setState({website});
        this.props.updateContentValue("website",website);
    };

    selectTournament = ( tournament ) =>{
        this.toggleSearch();
        this.props.selectTournament(tournament);
    };

    clear = () => {
        this.removeSport(0);
        this.props.updateContentValue("name", "");
    };

    scroll = () => {

        const {stepChange, stepChangeReset } = this.props;

        if ( stepChange ) {
            window.scrollTo(0, 0);
            stepChangeReset();
        }

    };


    render() {
        if ( this.props.step !== 1) return (null);

        this.scroll();

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
        if ( this.state.sportCategories.length > 0 ) {
            inputProps.sportCategory = {
                value: this.state.sportCategories[0].name,
                isCustom: this.state.sportCategories[0].isCustom
            }
        }
        if ( this.state.tournaments.length > 0 ) {
            inputProps.tournament = {
                value: this.state.tournaments[0].name,
                isCustom: this.state.tournaments[0].isCustom
            }
        }

        return (
            <div className="step-content">
                <div className="step-title">{this.state.title}</div>

                {this.state.showSearch && <SearchCompetition close={this.toggleSearch} select={this.selectTournament} />}
                {!this.state.showSearch &&
                <div className="buttons">
                    <div className={"buttons-container"} style={{ justifyContent: 'flex-start'}}>
                        <button className="light-blue-button" style={{ marginRight: '20px'}} onClick={this.toggleSearch}>
                            <i className="fa fa-search"/> Show search function
                        </button>

                        <button className="light-blue-button" onClick={this.clear}>
                            <i className="fa fa-close"/> Clear
                        </button>
                    </div>
                </div>}

                {!this.state.showSearch && <div className="step-content-container">

                    <div className="step-item-description" >
                        Please select the sport(s) and competition(s) covered by your content listing:
                    </div>

                    {
                        this.state.sportSelectors.map((item, i, list)=>{
                            return <SportSelector
                                key={i}
                                index={i}
                                remove={() => this.removeSport(i) }
                                showAddNew={list.length > 1 && list.length === i + 1}
                                onEditNew={(a)=>{ console.log(a)}}
                                showClose={ i > 0 }
                                isCustom={(inputProps.sports[i]) ? inputProps.sports[i].isCustom : false}
                                addSportSelector={this.addSportSelector}
                                onClick={() => { this.props.openSportSelector(i, this.props.sports) } }
                                value={( inputProps.sports[i]) ?inputProps.sports[i].value : ""}  />
                        })
                    }

                    {this.state.sportSelectors.length === 1 && <div className="step-item-description" style={{marginTop: "-15px"}}>
                        Your content covers multiple sports? <button className={"link-button"} onClick={this.addSportSelector}>Please click here</button>
                    </div>}

                    {this.state.sportSelectors.length === 1 && !this.hasCustomCategory() &&
                    <div className="base-input">
                        <label>Country/Category</label>
                        <input
                            type="text"
                            value={inputProps.sportCategory.value || ""}
                            readOnly={true}
                            disabled={this.props.sports.length === 0 || this.state.loadingCategories}
                            onClick={() => {
                                this.props.openCategorySelector(this.state.sportCategories)
                            }}
                            placeholder={"Country/Category"}  />
                        { this.state.loadingCategories && <i className="fa fa-cog fa-spin"/>}
                    </div>}
                    {this.state.sportSelectors.length === 1 && this.hasCustomCategory() && <NewCategory
                        showClose={!this.forceCustomCategory()}
                        value={this.props.customCategory}
                        onBlur={ (e) => this.updateContentValue(e, "customCategory")}
                        onClick={this.props.removeNewCategory}
                    />}
                    {this.state.sportSelectors.length === 1 && !this.hasCustomTournament() &&
                    <div className="base-input">
                        <label>Competition</label>
                        <input type="text"
                               value ={inputProps.tournament.value || ""}
                               readOnly={true}
                               disabled={this.props.sports.length === 0 || this.state.loadingTournaments}
                               onClick={() => {
                                   this.props.openTournamentSelector( this.state.tournaments );
                               }}
                               placeholder={"Tournament"}  />
                        { this.state.loadingTournaments && <i className="fa fa-cog fa-spin"/>}
                    </div>}

                    { this.state.sportSelectors.length === 1 && this.hasCustomTournament() &&
                    <NewTournament showClose={!this.forceCustomTournament()}
                                      value={this.props.customTournament}
                                      onBlur={ (e) => this.updateContentValue(e, "customTournament")}
                                      onClick={this.props.removeNewTournament} />
                    }

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
                            onBlur={ (e) => this.updateContentValue(e, "customSeason")}
                            isCustom={(inputProps.seasons[i]) ? inputProps.seasons[i].isCustom || this.forceCustomSeason() : false}
                            showAddNew={this.state.seasonSelectors.length === i + 1}
                            openSelector={()=>this.props.openSeasonSelector(i, this.props.seasons)}/>
                    })}

                    { ( this.state.loadingSeasons || this.state.loadingSchedule ) && <div><i className="fa fa-cog fa-spin"/></div>}

                    <ListingName/>

                    <Description value={this.props.description} onBlur={ (e) => this.updateContentValue(e, "description")} />

                    <div className="base-input">
                        <label>Website</label>
                        <TagsInput inputProps={{placeholder: "Website"}} value={this.state.website} onChange={this.websitesUpdated} />
                    </div>

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
        selectTournament : (tournament) => dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament }),
        stepChangeReset : () => dispatch(stepChangeReset())

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)