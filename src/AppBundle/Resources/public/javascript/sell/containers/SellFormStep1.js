import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector'
import SearchCompetition from '../../main/components/SearchCompetition'
const Description = ({value, onBlur}) => (
    <div>
        <div className="step-item-description">
            Provide a short description of your content listing
        </div>
        <textarea onBlur={onBlur} value={value}></textarea>
    </div>
);

const Website = ({value, onBlur}) => (
    <div>
        <input
            className="website"
            type="text"
            onBlur={onBlur}
            value={value}
            placeholder="Website"/>
    </div>
);

const NewSport = ({onClick}) => (
    <div>
        <input
            className="new-sport"
            type="text"
            placeholder="Enter sport"/>
        <i onClick={onClick} className="fa fa-close"></i>
    </div>
);

const NewCategory = ({}) => (
    <div>
        <input
            className="new-category"
            type="text"
            placeholder="Enter category"/>
    </div>
);

const NewTournament = ({onClick, showClose, onBlur, value}) => (
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
const Schedules = ({schedules}) => (
    <div className="schedule">
        { schedules && Object.keys(schedules).map(( number, i ) => {
            return <Round key={i} round={number} schedule={schedules[number]} />
        }) }
    </div>
);

class Round extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            round : props.round,
            schedule : props.schedule,
            selected : false
        };
    }

    toggle = () => {
        this.setState((prevState, props) => ({
            selected: !prevState.selected
        }));
    };

    render(){

        return (
            <div>
                <div onClick={this.toggle}>
                    Round {this.state.round}
                    {this.state.selected && <span>Unselect</span>}
                    </div>
                {this.state.selected && <div>
                    {this.state.schedule.length > 0 && this.state.schedule.map((item, i) => {
                        return <Match match={item} key={i}/>
                    })}
                </div>}
            </div>
        )
    }
}

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match : props.match,
            selected : false
        };
    }

    toggle = () => {
        this.setState((prevState, props) => ({
            selected: !prevState.selected
        }));
    };

    render(){
        const competitorsLen = this.props.match.competitors.length;
        return (
            <div onClick={this.toggle}>
                {this.props.match.competitors.map(( competitor, i)=>{
                    return <span key={i}>{competitor.name} {(competitorsLen !== i + 1) && " vs " }</span>
                })}
                {this.state.selected && <span>Unselect</span>}
            </div>
        )
    }
}

class SeasonSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSchedule : false
        };
    }

    toggle = () => {
        this.setState((prevState, props) => ({
            showSchedule: !prevState.showSchedule
        }));
    };

    render(){
        return (
            <div>
                <div>
                    <input type="text"
                           {...this.props.inputProps}
                           readOnly={true}
                           disabled={this.props.loading}
                           onClick={this.props.openSelector}
                           placeholder={"Season"}  />
                    { this.props.loading && <i className="fa fa-cog fa-spin"></i>}
                </div>
                {this.props.schedules && <div>
                    <div onClick={this.toggle}>Show schedule</div>
                </div>}
                {this.state.showSchedule && <div>
                    <Schedules schedules={this.props.schedules}/>
                </div>}
                {this.props.showAddNew && <div>
                    <div onClick={this.props.addSeason}>Add new season</div>
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
            seasons: [],
            schedules: {},
            showSearch : true
        };
    }

    componentDidMount () {
        ContentArena.Api.getSports().done( (sports ) => {
            ContentArena.Data.FullSports = sports;
        });
    }

    loadCategories (nextProps) {

        let sportId = nextProps.listingInfo.sports[0].external_id;

        if ( sportId === this.state.lastSportId ) return;

        this.setState({ loadingCategories : true });
        ContentArena.Api.getCategories(sportId).done( (categories ) => {
            ContentArena.Data.Categories = categories;
            this.setState({ lastSportId : sportId, loadingCategories : false });
        });
    }

    loadTournaments (nextProps) {

        let sportId = nextProps.listingInfo.sports[0].external_id;
        let categoryId = ( nextProps.listingInfo.sport_category ) ? nextProps.listingInfo.sport_category.external_id : null;

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

        let tournamentId = ( nextProps.listingInfo.tournament ) ? nextProps.listingInfo.tournament.external_id : null;

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

        nextProps.listingInfo.seasons.forEach(( season ) =>{
            if ( !_this.state.schedules[season.external_id] ){
                _this.setState({ loadingSchedule : true });
                ContentArena.Api.getSchedule(season.external_id).done( (schedules ) => {
                    /*ContentArena.Data.Seasons = seasons;*/
                    console.log(schedules);
                    _this.setState(function(prevState, props) {
                        let prevSchedules = prevState.schedules;
                        prevSchedules[season.external_id] = schedules;
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

        if (!this.props.listingInfo.seasons || !this.props.listingInfo.seasons[index] ) return [];

        return this.state.schedules[this.props.listingInfo.seasons[index].external_id];
    }

    componentWillReceiveProps(nextProps){
        if ( nextProps.listingInfo.sports.length > 0 ) this.loadCategories(nextProps);
        if ( nextProps.listingInfo.sports.length > 0 || nextProps.listingInfo.category ) this.loadTournaments(nextProps);
        if ( nextProps.listingInfo.tournament ){
            this.loadSeasons(nextProps);
        }
        if ( nextProps.listingInfo.seasons.length > 0 ) this.loadSchedule(nextProps);
    }

    updateContentValue = ( event, key ) =>{
        this.props.updateContentValue(key,event.target.value);
    };

    hasCustomTournament = () => {
        return this.props.listingInfo.newSport || this.props.listingInfo.newTournament
            || this.props.listingInfo.custom_tournament;
    };

    addNewSeason = () => {
        this.setState((prevState, props)=> ({
            seasonSelectors : [...prevState.seasonSelectors, 1]
        }))
    };

    toggleSearch = () => {
        this.setState((prevState, props) => ({
            showSearch: !prevState.showSearch
        }));
    };

    selectTournament = ( tournament ) =>{
        this.toggleSearch();
        this.props.selectTournament(tournament);
    };

    render() {
        let _this = this;

        if ( this.props.listingInfo.step !== 1) return (null);

        const inputProps = {
            sports: { value : "" },
            sport_category : { value : "" },
            tournament : { value : "" },
            seasons : [{ value : ""}]
        };

        if ( this.props.listingInfo.sports.length > 0 ) {
            inputProps.sports.value = this.props.listingInfo.sports[0].name;
        }
        if ( this.props.listingInfo.seasons.length > 0 ) {
            inputProps.seasons = [];
            this.props.listingInfo.seasons.forEach(( season )=>{
                inputProps.seasons.push({value: season.name})
            });
        }
        if ( this.props.listingInfo.sport_category ) inputProps.sport_category.value = this.props.listingInfo.sport_category.name;
        if ( this.props.listingInfo.tournament ) inputProps.tournament.value = this.props.listingInfo.tournament.name;

        return (
            <div className="step-content">

                {this.state.showSearch && <SearchCompetition close={this.toggleSearch} select={this.selectTournament} />}
                {!this.state.showSearch && <button onClick={this.toggleSearch}>Show search function</button>}

                {!this.state.showSearch && <div className="step-content-container">

                    <div className="step-item-description">
                        Please select the sport(s) and competition(s) covered by your content listing:
                    </div>
                    <div>
                        {!this.props.listingInfo.newSport && <input type="text"
                               {...inputProps.sports}
                               readOnly={true}
                               onClick={this.props.openSportSelector}
                               placeholder={"Sport"}  />}
                        {this.props.listingInfo.newSport && <NewSport onClick={this.props.removeNewSport } />}
                    </div>
                    <div>
                        {!this.props.listingInfo.newSport && <input type="text"
                               {...inputProps.sport_category}
                               readOnly={true}
                               disabled={this.state.loadingCategories}
                               onClick={this.props.openCategorySelector}
                               placeholder={"Country/Category"}  />}
                        {this.props.listingInfo.newSport && <NewCategory />}
                        { this.state.loadingCategories && <i className="fa fa-cog fa-spin"></i>}
                    </div>
                    <div>
                        {!this.hasCustomTournament() && <input type="text"
                               {...inputProps.tournament}
                               readOnly={true}
                               disabled={this.state.loadingTournaments}
                               onClick={this.props.openTournamentSelector}
                               placeholder={"Tournament"}  />}
                        { ( this.hasCustomTournament() )
                        && <NewTournament showClose={this.props.listingInfo.newTournament || this.props.listingInfo.custom_tournament}
                                          value={this.props.listingInfo.custom_tournament}
                                          onBlur={ (e) => this.updateContentValue(e, "custom_tournament")}
                                          onClick={this.props.removeNewTournament} />}

                        { this.state.loadingTournaments && <i className="fa fa-cog fa-spin"></i>}
                    </div>

                    {  this.state.seasons.length > 0 && this.state.seasonSelectors.length >0 &&
                    this.state.seasonSelectors.map( (season, i) => {
                        return <SeasonSelector
                            key={i}
                            season={season}
                            addSeason={this.addNewSeason}
                            inputProps={inputProps.seasons[i]}
                            schedules={this.getSchedules(i)}
                            loading={this.state.loadingSeasons}
                            showAddNew={this.state.seasonSelectors.length === i + 1}
                            openSelector={()=>this.props.openSeasonSelector(i)}/>
                    })}

                    <Description value={this.props.listingInfo.description} onBlur={ (e) => this.updateContentValue(e, "description")} />
                    <Website value={this.props.listingInfo.website} onBlur={ (e) => this.updateContentValue(e, "website")} />
                    <FileSelector target={"brochure"}/>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listingInfo : state.listingInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openSportSelector : () => dispatch({
            type : 'OPEN_SELECTOR',
            selectorItems : ContentArena.Data.FullSports,
            popularItems : ContentArena.Data.TopSports,
            selectorType : "sports",
            activeFilter : "popular",
            multiple : true,
            showNewSport : true,
            index : 0
        }),
        openCategorySelector : () => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Categories,
            selectorType: "sport_category",
            activeFilter : "ag"
        }),
        openTournamentSelector : () => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Tournaments,
            selectorType: "tournament",
            activeFilter : "ag",
            showNewTournament : true
        }),
        openSeasonSelector : (index) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Seasons,
            selectorType: "seasons",
            multiple: true,
            index: index
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
        removeNewSport : () => dispatch({ type: 'REMOVE_NEW_SPORT' }),
        removeNewTournament : () => dispatch({ type: 'REMOVE_NEW_TOURNAMENT' }),
        selectTournament : (tournament) => dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)