import React from 'react';
import { connect } from "react-redux";

const Description = ({value, onBlur}) => (
    <div>
        <div className="step-item-description">
            Provide a short description of your content listing
        </div>
        <textarea onBlur={onBlur} value={value}></textarea>
    </div>
);

const Website = ({}) => ();

class SellFormStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "Step 1 - Event selection",
            lastSportId : null,
            lastCategoryId : null,
            loadingCategories : false,
            loadingTournaments : false,
        };
    }

    componentDidMount () {
        ContentArena.Api.getSports().done( (sports ) => {
            ContentArena.Data.FullSports = sports;
        });
    }

    loadCategories (nextProps) {

        let sportId = nextProps.sports[0].external_id;

        if ( sportId === this.state.lastSportId ) return;

        this.setState({ loadingCategories : true });
        ContentArena.Api.getCategories(sportId).done( (categories ) => {
            ContentArena.Data.Categories = categories;
            this.setState({ lastSportId : sportId, loadingCategories : false });
        });
    }

    loadTournaments (nextProps) {

        let sportId = nextProps.sports[0].external_id;
        let categoryId = ( nextProps.sport_category ) ? nextProps.sport_category.external_id : null;

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

    componentWillReceiveProps(nextProps){
        if ( nextProps.sports.length > 0 ) this.loadCategories(nextProps);
        if ( nextProps.sports.length > 0 || nextProps.category ) this.loadTournaments(nextProps);
    }

    updateContentValue = ( event, key ) =>{
        this.props.updateContentValue(key,event.target.value);
    };

    render() {
        let _this = this;

        if ( this.props.step !== 1) return (null);

        const inputProps = {
            sports: { value : "" },
            sport_category : { value : "" },
            tournament : { value : "" }
        };

        if ( this.props.sports.length > 0 ) {
            inputProps.sports.value = this.props.sports[0].name;
        }

        if ( this.props.sport_category ) inputProps.sport_category.value = this.props.sport_category.name;
        if ( this.props.tournament ) inputProps.tournament.value = this.props.tournament.name;

        return (
            <div className="step-content">
                <div className="step-title">
                    { this.state.title }
                </div>
                <div className="step-content-container">
                    <div className="step-item-description">
                        Please enter the name of the competition for which you would like to sell content. In case you can't find your competition, please follow the steps below
                    </div>
                    <div>
                        <input type="text"
                            id="search-sport"
                            placeholder="Enter competition name (e.g. Bundesliga)" />
                    </div>

                    <div className="step-item-description">
                        Please select the sport(s) and competition(s) covered by your content listing:
                    </div>
                    <div>
                        <input type="text"
                               {...inputProps.sports}
                               readOnly={true}
                               onClick={this.props.openSportSelector}
                               placeholder={"Sport"}  />
                    </div>
                    <div>
                        <input type="text"
                               {...inputProps.sport_category}
                               readOnly={true}
                               disabled={this.state.loadingCategories}
                               onClick={this.props.openCategorySelector}
                               placeholder={"Country/Category"}  />
                        { this.state.loadingCategories && <i className="fa fa-cog fa-spin"></i>}
                    </div>
                    <div>
                        <input type="text"
                               {...inputProps.tournament}
                               readOnly={true}
                               disabled={this.state.loadingTournaments}
                               onClick={this.props.openTournamentSelector}
                               placeholder={"Tournament"}  />
                        { this.state.loadingTournaments && <i className="fa fa-cog fa-spin"></i>}
                    </div>

                    <Description value={this.props.description} onBlur={ (e) => this.updateContentValue(e, "description")} />


                    <div>
                        <button>Upload File</button>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        step : state.step,
        sports: state.sports,
        sport_category: state.sport_category,
        tournament: state.tournament,
        description : state.description
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
            multiple : true
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
            activeFilter : "ag"
        }),
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep1)