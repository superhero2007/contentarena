import React from 'react';
import { connect } from "react-redux";
import FileSelector from '../../main/components/FileSelector'
import SearchCompetition from '../../main/components/SearchCompetition'
const Description = ({value, onBlur}) => (
    <div>
        <div className="step-item-description">
            Provide a short description of your content listing
        </div>
        <textarea onBlur={onBlur} defaultValue={value}/>
    </div>
);

const Website = ({value, onBlur}) => (
    <div>
        <input
            className="website"
            type="text"
            onBlur={onBlur}
            defaultValue={value}
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

class NewSeason extends React.Component{
    constructor(props){
        super(props);

        let currentYear = Number((new Date()).getFullYear());
        let years = [];

        for (let i =0; i < 10;i++ ){ years.push(currentYear+i)}

        this.state = {
            startDate : null,
            endDate : null,
            years : years
        }
    }

    getEndOptions = () => {
        let value;

        if ( this.state.startDate ){

            value = Number(this.state.startDate)+1;

            return (
                <option value={value}>{value}</option>
            )
        }

        return (<option/>)
    };

    setStartDate = (e) => {
        this.setState({ startDate : e.target.value});
    };

    render(){
        return (
            <div>
                <div>
                    <input
                        className="new-season"
                        type="text"
                        onBlur={this.props.onBlur}
                        defaultValue={this.props.value}
                        placeholder="Enter season name"/>
                    { this.props.showClose && <i onClick={this.props.onClick} className="fa fa-close"/>}
                </div>
                <div>
                    From
                    <select onChange={this.setStartDate}>
                        <option/>
                        {this.state.years.map((year,i)=>(<option key={i} value={year}>{year}</option>))}
                    </select>
                    To
                    <select disabled={!this.state.startDate}>
                        {this.getEndOptions()}
                        <option value={0}>Not applicable</option>
                    </select>
                </div>
            </div>
        )
    }
}


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
            selected : false,
            matches : false
        };

        this.child = [];
    }

    toggle = (e) => {
        e.stopPropagation();
        this.setState((prevState) => ({
            selected: !prevState.selected
        }));

        this.child.forEach( (item) => item.update( !this.state.selected) );
    };

    toggleMatches = () => {
        this.setState((prevState) => ({
            matches: !prevState.matches
        }));
    };

    render(){
        return (
            <div>
                <div className={"matchday " + ( (this.state.selected) ? "selected" : "" )} onClick={this.toggleMatches}>
                    Matchday {this.state.round}
                    {!this.state.selected && <span onClick={this.toggle}>Select matchday</span>}
                    {this.state.selected && <span onClick={this.toggle}>Unselect</span>}
                </div>
                {this.state.matches && <div>
                    {this.state.schedule.length > 0 && this.state.schedule.map((item, i) => {
                        return <Match match={item} key={i} selected={this.state.selected} onRef={ref => {
                            if ( ref ) {
                                this.child.push(ref)
                            } else {
                                this.child = [];
                            }
                        }}/>
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
            selected : props.selected || false
        };
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    toggle = () => {
        this.setState((prevState) => ({
            selected: !prevState.selected
        }));
    };

    update = (selected) => {
        this.setState({selected: selected});
    };

    render(){
        const competitorsLen = this.props.match.competitors.length;
        return (
            <div className={"match " + ( (this.state.selected) ? "selected" : "" )} onClick={this.toggle}>
                {this.props.match.competitors.map(( competitor, i)=>{
                    return <span key={i}>{competitor.name} {(competitorsLen !== i + 1) && " vs " }</span>
                })}
                {this.state.selected && <span className={"select"}>Unselect</span>}
                {!this.state.selected && <span className={"select"}>Select match</span>}
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
        this.setState((prevState) => ({
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
                    { this.props.loading && <i className="fa fa-cog fa-spin"/>}
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

class SportSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <input type="text"
                       {...this.props.inputProps}
                       readOnly={true}
                       onClick={this.props.onClick}
                       placeholder={"Sport"}  />
                {this.props.showClose && <i onClick={this.props.remove} className="fa fa-close"/>}
                {this.props.showAddNew && <div>
                    <button onClick={this.props.addNewSport}>Add new sport</button>
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
    }

    loadCategories (nextProps) {

        let sportId = nextProps.listingInfo.sports[0].externalId;

        if ( sportId === this.state.lastSportId ) return;

        this.setState({ loadingCategories : true });
        ContentArena.Api.getCategories(sportId).done( (categories ) => {
            ContentArena.Data.Categories = categories;
            this.setState({ lastSportId : sportId, loadingCategories : false });
        });
    }

    loadTournaments (nextProps) {

        let sportId = nextProps.listingInfo.sports[0].externalId;
        let categoryId = ( nextProps.listingInfo.sportCategory ) ? nextProps.listingInfo.sportCategory.externalId : null;

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

        let tournamentId = ( nextProps.listingInfo.tournament ) ? nextProps.listingInfo.tournament.externalId : null;

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
            if ( !_this.state.schedules[season.externalId] ){
                _this.setState({ loadingSchedule : true });
                ContentArena.Api.getSchedule(season.externalId).done( (schedules ) => {
                    _this.setState(function(prevState, props) {
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

        if (!this.props.listingInfo.seasons || !this.props.listingInfo.seasons[index] ) return false;

        return this.state.schedules[this.props.listingInfo.seasons[index].externalId];
    }

    componentWillReceiveProps(nextProps){
        if ( nextProps.listingInfo.sports.length === 1 ){
            this.loadCategories(nextProps);
            this.setState((prevState) => ({
                showSearch: false
            }));
        }

        if ( nextProps.listingInfo.sports.length === 1 || nextProps.listingInfo.category ) this.loadTournaments(nextProps);
        if ( nextProps.listingInfo.tournament ){
            this.loadSeasons(nextProps);
        }
        if ( nextProps.listingInfo.seasons.length > 0 ) this.loadSchedule(nextProps);
    }

    updateContentValue = ( event, key ) =>{
        this.props.updateContentValue(key,event.target.value);
    };

    hasCustomTournament = () => {
        return this.props.listingInfo.newSport
            || this.props.listingInfo.newTournament
            || this.props.listingInfo.customTournament;
    };

    hasCustomSeason = () => {
        return this.props.listingInfo.newSport
            || this.props.listingInfo.newTournament
            || this.props.listingInfo.customTournament
            || this.props.listingInfo.newSeason;
    };

    addSeason = () => {
        this.setState((prevState)=> ({
            seasonSelectors : [...prevState.seasonSelectors, 1]
        }))
    };

    addSport = () => {
        this.setState((prevState)=> ({
            sportSelectors : [...prevState.sportSelectors, 1]
        }))
    };

    removeSport = (i) => {
        this.setState((prevState)=> {
            prevState.sportSelectors.splice(i,1);
            return {
                sportSelectors : prevState.sportSelectors
            }
        });

        this.props.removeFromMultiple(i, "sports");
    };

    removeSeason = (i) => {
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
        if ( this.props.listingInfo.step !== 1) return (null);

        const inputProps = {
            sports: [{ value : "" }],
            sportCategory : { value : "" },
            tournament : { value : "" },
            seasons : [{ value : ""}]
        };

        if ( this.props.listingInfo.sports.length > 0 ) {
            inputProps.sports = [];
            this.props.listingInfo.sports.forEach(( sport )=>{
                inputProps.sports.push({value: sport.name})
            });
        }
        if ( this.props.listingInfo.seasons.length > 0 ) {
            inputProps.seasons = [];
            this.props.listingInfo.seasons.forEach(( season )=>{
                inputProps.seasons.push({value: season.name})
            });
        }
        if ( this.props.listingInfo.sportCategory ) inputProps.sportCategory.value = this.props.listingInfo.sportCategory.name;
        if ( this.props.listingInfo.tournament ) inputProps.tournament.value = this.props.listingInfo.tournament.name;

        return (
            <div className="step-content">

                {this.state.showSearch && <SearchCompetition close={this.toggleSearch} select={this.selectTournament} />}
                {!this.state.showSearch && <button onClick={this.toggleSearch}>Show search function</button>}

                {!this.state.showSearch && <div className="step-content-container">

                    <div className="step-item-description">
                        Please select the sport(s) and competition(s) covered by your content listing:
                    </div>

                    {!this.props.listingInfo.newSport &&
                        this.state.sportSelectors.map((item, i)=>{
                            return <SportSelector key={i}
                                                  remove={() => this.removeSport(i) }
                                                  showAddNew={this.state.sportSelectors.length > 1 && this.state.sportSelectors.length === i + 1}
                                                  showClose={i > 0}
                                                  addNewSport={this.addSport}
                                                  onClick={() => { this.props.openSportSelector(i) } }
                                                  inputProps={inputProps.sports[i]}  />
                        })
                    }

                    <div>
                        {this.props.listingInfo.newSport &&
                            <NewSport onClick={this.props.removeNewSport } />}
                    </div>
                    { this.state.sportSelectors.length === 1 && <div>
                        Your content covers multiple sports? <button onClick={this.addSport}>Please click here</button>
                    </div>}


                    {this.state.sportSelectors.length === 1 && <div>
                        {!this.props.listingInfo.newSport && <input type="text"
                               {...inputProps.sportCategory}
                               readOnly={true}
                               disabled={this.state.loadingCategories}
                               onClick={this.props.openCategorySelector}
                               placeholder={"Country/Category"}  />}
                        {this.props.listingInfo.newSport && <NewCategory />}
                        { this.state.loadingCategories && <i className="fa fa-cog fa-spin"/>}
                    </div>}
                    {this.state.sportSelectors.length === 1 && <div>
                        {!this.hasCustomTournament() && <input type="text"
                               {...inputProps.tournament}
                               readOnly={true}
                               disabled={this.state.loadingTournaments}
                               onClick={() => {
                                   this.props.removeNewTournament();
                                   this.props.openTournamentSelector();
                               }}
                               placeholder={"Tournament"}  />}
                        { ( this.hasCustomTournament() )
                        && <NewTournament showClose={this.props.listingInfo.newTournament || this.props.listingInfo.customTournament}
                                          value={this.props.listingInfo.customTournament}
                                          onBlur={ (e) => this.updateContentValue(e, "customTournament")}
                                          onClick={this.props.removeNewTournament} />}

                        { this.state.loadingTournaments && <i className="fa fa-cog fa-spin"/>}
                    </div>}

                    { !this.hasCustomSeason() && this.state.sportSelectors.length === 1 && this.state.seasons.length > 0 && this.state.seasonSelectors.length >0 &&
                    this.state.seasonSelectors.map( (season, i) => {
                        return <SeasonSelector
                            key={i}
                            season={season}
                            addSeason={this.addSeason}
                            inputProps={inputProps.seasons[i]}
                            schedules={this.getSchedules(i)}
                            loading={this.state.loadingSeasons}
                            showAddNew={this.state.seasonSelectors.length === i + 1}
                            openSelector={()=>this.props.openSeasonSelector(i)}/>
                    })}

                    { ( this.hasCustomSeason() )
                    && <NewSeason showClose={this.props.listingInfo.newSeason || this.props.listingInfo.customSeason}
                                      value={this.props.listingInfo.customSeason}
                                      onBlur={ (e) => this.updateContentValue(e, "customSeason")}
                                      onClick={this.props.removeNewSeason} />}

                    { this.state.loadingSeasons && <i className="fa fa-cog fa-spin"/>}

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
        openSportSelector : (index) => dispatch({
            type : 'OPEN_SELECTOR',
            selectorItems : ContentArena.Data.FullSports,
            popularItems : ContentArena.Data.TopSports,
            selectorType : "sports",
            activeFilter : "popular",
            clean: ["tournament", "seasons", "sportCategory"],
            multiple : true,
            showNewSport : true,
            index : index
        }),
        openCategorySelector : () => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Categories,
            selectorType: "sportCategory",
            activeFilter : "ag",
            clean: ["tournament", "seasons"]
        }),
        openTournamentSelector : () => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Tournaments,
            selectorType: "tournament",
            activeFilter : "ag",
            showNewTournament : true,
            clean: ["seasons"]
        }),
        openSeasonSelector : (index) => dispatch({
            type: 'OPEN_SELECTOR',
            selectorItems: ContentArena.Data.Seasons,
            selectorType: "seasons",
            multiple: true,
            index: index,
            showNewSeason : true,
            clean : []
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
        removeNewSport : () => dispatch({ type: 'REMOVE_NEW_SPORT' }),
        removeNewTournament : () => dispatch({ type: 'REMOVE_NEW_TOURNAMENT' }),
        removeNewSeason : () => dispatch({ type: 'REMOVE_NEW_SEASON' }),
        selectTournament : (tournament) => dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)