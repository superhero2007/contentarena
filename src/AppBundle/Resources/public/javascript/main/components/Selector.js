import React from 'react';
import { connect } from "react-redux";
import store from '../../sell/store';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#sell-form-container');

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
                "hn" : { type: "firstLetter", values: ["h",'i','j','k','l','k','n'] },
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

    componentDidMount = () =>{
    };

    componentWillReceiveProps(nextProps){

        let disabled = new Map(), selectedItems = new Map();

        if ( nextProps.disabled ) disabled = nextProps.disabled;
        if ( nextProps.selectedItems ) {
            nextProps.selectedItems.forEach(function(v, k) {
                selectedItems.set(v.externalId, v);
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

        let selectedItems = this.state.selectedItems,
            prevCountries = this.state.prevCountries;

        if ( this.state.customCountry ){
            selectedItems.forEach((item)=>{
                if (!prevCountries.has(item.externalId)) item.extended = true;
            });
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
        this.props.closeSelector();
    };

    addNewTournament = (index) => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewTournament(index,this.props.clean);
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
            selectorItems : ContentArena.Data.Countries,
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
        if ( filter.type === "origin" ) return this.props[filter.value];

        if ( filter.type === "international" ) return this.state.selectorItems.filter(this.filterInternational);

        if ( filter.type === "firstLetter") {

            if ( !this.shouldShowFilters() ) return this.state.selectorItems;

            return this.state.selectorItems.filter(this.filterLetter);
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
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
                <div>
                    { this.props.popularItems &&
                    <button className={"selector-filter " + (this.getActiveFilterName() === "popular" && "selector-filter-active")}
                            onClick={()=>{ this.setActiveFilter("popular")}}>Popular</button>}
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
                            onClick={()=>{ this.setActiveFilter("international")}}>International</button>}
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
                <div>
                    <button onClick={this.closeModal}>Cancel</button>
                    <button onClick={this.applySelection} disabled={!this.state.updated}>Apply</button>
                    <div>Can't find your sport in the list? </div>
                    {this.props.showNewSport && <button onClick={() => { this.addNewSport(this.props.index) } } >Add new Sport</button>}
                    {this.props.showNewTournament && <button onClick={ () => { this.addNewTournament(this.props.index ) } } >Add new Tournament</button>}
                    {this.props.showNewSeason && <button onClick={() => { this.addNewSeason(this.props.index) } } >Add new Season</button>}
                    {this.props.showAllCountries && <button onClick={this.showAllCountries } >Show all countries</button>}
                    {this.props.showNewCategory && <button onClick={() => { this.addNewCategory(this.props.index) } } >Add new Category</button>}
                </div>
            </Modal>
        );
    }
}

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