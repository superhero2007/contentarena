import React from 'react';
import { connect } from "react-redux";
import store from '../../main/store';
import Modal from 'react-modal';
import { SelectorModalStyle } from "../styles/custom";
import {PropTypes} from "prop-types";

Modal.setAppElement('#home-wrapper');

const SelectorItem = ({label, selected, onClick, disabled}) => (
    <div className={"selector-item " + ((selected) ?"selector-item-selected ": "") + (disabled && "selector-item-disabled") } onClick={(!disabled) ? onClick : undefined}>
        {label}
    </div>
);


class Selector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            updated : false,
            filterUpdated : false,
            open : props.selector,
            prevCountries : new Map(),
            customCountry : false,
            selectorItems : props.selectorItems || [],
            popularItems : props.popularItems || [],
            filter : {
                "ag" : { type: "firstLetter", values: ["a",'b','c','d','e','f','g'] },
                "hn" : { type: "firstLetter", values: ["h",'i','j','k','l','m','n'] },
                "ot" : { type: "firstLetter", values: ["o",'p','q','r','s','t'] },
                "uz" : { type: "firstLetter", values: ["u",'v','w','x','y','z'] },
                "popular" : { type: "origin", value: "popularItems"},
                "international" : { type: "international", value: "international"},
            },
            activeFilter : props.activeFilter || "ag",
            selectedItems : new Map(),
            disabled : new Map(),
        };

        store.subscribe((a) => {
        });
    }

    componentWillReceiveProps(nextProps){

        let disabled = new Map(), selectedItems = new Map();

        if ( nextProps.disabled ) disabled = nextProps.disabled;
        if ( nextProps.selectedItems ) {
            nextProps.selectedItems.forEach(function(v, k) {
                let key = v.externalId ? v.externalId : "custom" + k;
                selectedItems.set(key, v);
            });
        }

        this.setState({
            disabled : disabled,
            selectedItems : selectedItems,
            selectorItems : nextProps.selectorItems
        });
    }

    openModal = () => {
        this.props.openSelector();
    };

    afterOpenModal = () => {
    };

    closeModal = () => {
        this.setState({ updated: false, filterUpdated : false, customCountry :false });
        this.props.closeSelector();
    };

    getActiveFilter = () => {
        let activeFilter = this.getActiveFilterName();
        return this.state.filter[activeFilter];
    };

    getActiveFilterName = () => {
        return ( this.props.activeFilter && !this.state.filterUpdated ) ? this.props.activeFilter : this.state.activeFilter;
    };

    shouldShowFilters = () =>{
        return this.state.selectorItems && this.state.selectorItems.length > 30
    };

    shouldShowInternationalFilter = () => {

        let show = false;

        this.state.selectorItems.some( ( item) => {
            show = item.name.match(/international/gi) !== null;
            return show;
        });

        return show;

    };

    setActiveFilter = ( filterName ) =>{
      this.setState({ activeFilter: filterName,filterUpdated : true})
    };

    applySelection = () => {

        let extended = false,
            selectedItems = this.state.selectedItems,
            prevCountries = this.state.prevCountries;

        if ( this.state.customCountry ){
            selectedItems.forEach((item)=>{
                if (!prevCountries.has(item.externalId)) {
                    item.extended = true;
                    extended = true;
                }
            });
        }

        if (extended){
            this.props.addNewSeason(0,[]);
        }

        this.setState({ updated: false, filterUpdated : false, customCountry : false });
        this.props.applySelection(
            this.props.selectorType,
            selectedItems,
            this.props.multiple,
            this.props.index,
            this.props.clean);
    };

    addNewSport = (index) => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewSport(index,this.props.clean);
        if (index===0) this.props.addNewSeason(index,[]);
        this.props.closeSelector();
    };

    addNewTournament = (index) => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewTournament(index,this.props.clean);
        this.props.addNewSeason(index,[]);
        this.props.closeSelector();
    };

    addNewSeason = (index) => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewSeason(index,this.props.clean);
        this.props.closeSelector();
    };

    addNewCategory = (index) => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewCategory(index,this.props.clean);
        this.props.addNewTournament(0,[]);
        this.props.addNewSeason(0,[]);
        this.props.closeSelector();
    };

    selectItem = ( item ) => {

        let _this = this;

        this.setState((prevState) => {

            if ( prevState.selectedItems.has(item.externalId)){
                if ( _this.props.multiple ) {
                    prevState.selectedItems.delete(item.externalId);
                }

            } else {

                if (  !_this.props.multiple ) {
                    prevState.selectedItems.clear();
                }

                prevState.selectedItems.set(item.externalId, item);

            }

            return {
                selectedItems : prevState.selectedItems,
                updated: true
            }
        });
    };

    isItemSelected = ( item ) => {
        return this.state.selectedItems.has(item.externalId);
    };

    isItemDisabled = ( item ) => {

        return this.state.disabled.has(item.externalId);
    };

    showAllCountries = () => {

        if ( !ContentArena.Data.Countries || ContentArena.Data.Countries.length ===0 ) return;

        this.setState((prevState) => ({
            prevCountries : new Map(prevState.selectorItems.map(i=>[i.externalId, i])) ,
            selectorItems : [...ContentArena.Data.Countries,{
                country_code: "INT",
                id: 10000,
                name: "International",
                regions: [],
                territoryId: 0,
            }],
            customCountry : true
        }));

    };

    filterLetter = (item) =>{
        let filter = this.getActiveFilter();
        return filter.values.indexOf(item.name[0].toLowerCase()) !== -1
    };

    filterInternational = (item) =>{
        return item.name.match(/international/gi) !== null
    };

    getItems = () =>{
        let filter = this.getActiveFilter();
        if ( filter.type === "origin" ){
            if (this.props[filter.value]) return this.props[filter.value];
            if ( !this.shouldShowFilters() ) return this.state.selectorItems;

            return this.state.selectorItems.filter(this.filterLetter);
        }

        if ( filter.type === "international" ) return this.state.selectorItems.filter(this.filterInternational);

        if ( filter.type === "firstLetter") {

            if ( !this.shouldShowFilters() ) return this.state.selectorItems;

            let filteredItems = this.state.selectorItems.filter(this.filterLetter);

            if ( filteredItems.length === 0 ) return this.state.selectorItems;

            return filteredItems;

        }
    };

    render() {
        let _this = this;
        return (
            <Modal
                isOpen={this.props.open}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                bodyOpenClassName={"selector"}
                style={SelectorModalStyle}
                className="ReactModal__Selector"
                contentLabel="Example Modal"
            >
                <div>
                    { this.props.popularItems &&
                    <button className={"selector-filter " + (this.getActiveFilterName() === "popular" && "selector-filter-active")}
                            onClick={()=>{ this.setActiveFilter("popular")}}>
                        {this.context.t("Popular")}
                    </button>}
                    { this.shouldShowFilters() && <button className={"selector-filter " + (this.getActiveFilterName() === "ag" && "selector-filter-active")}
                                                          onClick={()=>{ this.setActiveFilter("ag")}}>A-G</button>}
                    { this.shouldShowFilters() && <button className={"selector-filter " + (this.getActiveFilterName() === "hn" && "selector-filter-active")}
                                                          onClick={()=>{ this.setActiveFilter("hn")}}>H-N</button>}
                    { this.shouldShowFilters() && <button className={"selector-filter " + (this.getActiveFilterName() === "ot" && "selector-filter-active")}
                                                          onClick={()=>{ this.setActiveFilter("ot")}}>O-T</button>}
                    { this.shouldShowFilters() && <button className={"selector-filter " + (this.getActiveFilterName() === "uz" && "selector-filter-active")}
                                                          onClick={()=>{ this.setActiveFilter("uz")}}>U-Z</button>}
                    {  this.shouldShowInternationalFilter() &&
                    <button className={"selector-filter " + (this.getActiveFilterName() === "international" && "selector-filter-active")}
                            onClick={()=>{ this.setActiveFilter("international")}}>
                        {this.context.t("International")}
                    </button>}
                </div>
                <div className="selector-content">
                    { this.getItems().map(function(item, i){
                        return <SelectorItem key={i}
                                             label={item.name}
                                             onClick={ () => _this.selectItem(item)}
                                             selected={ _this.isItemSelected(item) }
                                             disabled={ _this.isItemDisabled(item) }
                        />;
                    })}
                </div>

                {this.props.showNewSport && <div className={"extras"}>
                    <button className={"standard-button link-button"} onClick={() => { this.addNewSport(this.props.index) } } >
                        {this.context.t("CL_STEP1_SELECTOR_ADD_SPORT")}
                    </button>
                </div>}

                {this.props.showNewSeason && <div className={"extras"}>
                    <button className={"standard-button link-button"} onClick={() => { this.addNewSeason(this.props.index) } } >
                        {this.context.t("CL_STEP1_SELECTOR_ADD_SEASON")}
                    </button>
                </div>}

                {this.props.showNewTournament && <div className={"extras"}>
                    <button className={"standard-button link-button"} onClick={ () => { this.addNewTournament(this.props.index ) } } >
                        {this.context.t("CL_STEP1_SELECTOR_ADD_TOURNAMENT")}
                    </button>
                </div>}

                {this.props.showAllCountries&& <div className={"extras"}>
                    <button className={"standard-button link-button"} onClick={this.showAllCountries } >
                        {this.context.t("CL_STEP1_SELECTOR_COUNTRIES_ALL")}
                    </button>
                </div>}

                <div className={"buttons"}>
                    <button className={"light-blue-button"} style={{backgroundColor: SelectorModalStyle.content.backgroundColor}} onClick={this.closeModal}>
                        {this.context.t("Cancel")}
                    </button>
                    <button className={"standard-button"} onClick={this.applySelection} disabled={!this.state.updated}>
                        {this.context.t("Apply")}
                    </button>
                </div>

            </Modal>
        );
    }
}
Selector.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => {
    return state.selector
};

const mapDispatchToProps = dispatch => {
    return {
        openSelector : () => dispatch({
            type : 'OPEN_SELECTOR'
        }),
        closeSelector : () => dispatch({
            type : 'CLOSE_SELECTOR'
        }),
        applySelection : (selectorType, selectedItems, multiple, index, clean) => dispatch({
            type : 'APPLY_SELECTION',
            selectorType : selectorType,
            selectedItems : selectedItems,
            multiple : multiple,
            index : index,
            clean : clean
        }),
        addNewSport : (index,clean) => dispatch({
            type : 'ADD_NEW',
            index : index,
            selectorType: "sports",
            clean : clean
        }),
        addNewCategory : (index, clean) => dispatch({
            type : 'ADD_NEW',
            index : index,
            selectorType: "sportCategory",
            clean : clean
        }),
        addNewTournament : (index, clean) => dispatch({
            type : 'ADD_NEW',
            index : index,
            selectorType: "tournament",
            clean : clean
        }),
        addNewSeason : (index, clean) => dispatch({
            type: 'ADD_NEW',
            index : index,
            selectorType: "seasons",
            clean : clean
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector)