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
    <div className={"selector-item " + ((selected) ?"selector-item-selected ": "") + (disabled && "selector-item-disabled") } onClick={!disabled && onClick}>
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
            selectedItem : {},
            disabled : []
        };

        store.subscribe((a) => {
        });
    }

    componentDidMount = () =>{
    };

    componentWillReceiveProps(nextProps){

        let disabled;

        if ( nextProps.multiple && nextProps.index > 0 ){

            disabled = nextProps.selected.filter((item,i)=>{
                return i !== nextProps.index
            }).map((item)=>{
                return item.externalId
            });

            this.setState({ disabled : disabled});
        } else {
            this.setState({ disabled : []});
        }
    }

    openModal = () => {
        this.props.openSelector();
    };

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    };

    closeModal = () => {
        this.setState({ updated: false, filterUpdated : false });
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
        return this.props.selectorItems && this.props.selectorItems.length > 30
    };

    shouldShowInternationalFilter = () => {

        let show = false;

        this.props.selectorItems.some( ( item) => {
            show = item.name.match(/international/gi) !== null;
            return show;
        });

        return show;

    };

    setActiveFilter = ( filterName ) =>{
      this.setState({ activeFilter: filterName,filterUpdated : true})
    };

    applySelection = () => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.applySelection(
            this.props.selectorType,
            this.state.selectedItem,
            this.props.multiple,
            this.props.index,
            this.props.clean);
    };

    addNewSport = () => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewSport();
        this.props.closeSelector();
    };

    addNewTournament = () => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewTournament();
        this.props.closeSelector();
    };

    addNewSeason = () => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.addNewSeason();
        this.props.closeSelector();
    };

    selectItem = ( item ) => {
        this.setState({ selectedItem : item, updated: true });
    };

    isItemSelected = ( item ) => {

        if ( this.state.updated ){
            return this.state.selectedItem.externalId === item.externalId;
        } else {

            if (!this.props.selected) return false;

            return this.props.selected.length > 0 &&
                (this.props.multiple && this.props.selected[this.props.index]) ? this.props.selected[this.props.index].externalId === item.externalId
                : this.props.selected.externalId === item.externalId;
        }
    };

    isItemDisabled = ( item ) => {

        if (this.state.disabled.length === 0) return false;
        return this.state.disabled.indexOf(item.externalId) !== -1;
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

        if ( filter.type === "international" ) return this.props.selectorItems.filter(this.filterInternational);

        if ( filter.type === "firstLetter") {

            if ( !this.shouldShowFilters() ) return this.props.selectorItems;

            return this.props.selectorItems.filter(this.filterLetter);
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
                    {this.props.showNewSport && <button onClick={this.addNewSport} >Add new Sport</button>}
                    {this.props.showNewTournament && <button onClick={this.addNewTournament} >Add new Tournament</button>}
                    {this.props.showNewSeason && <button onClick={this.addNewSeason} >Add new Season</button>}
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ( state ) => {
    return state.selectorInfo
};

const mapDispatchToProps = dispatch => {
    return {
        openSelector : () => dispatch({
            type : 'OPEN_SELECTOR'
        }),
        closeSelector : () => dispatch({
            type : 'CLOSE_SELECTOR'
        }),
        applySelection : (selectorType, selectedItem, multiple, index, clean) => dispatch({
            type : 'APPLY_SELECTION',
            selectorType : selectorType,
            selectedItem : selectedItem,
            multiple : multiple,
            index : index,
            clean : clean
        }),
        addNewSport : () => dispatch({
            type : 'ADD_NEW_SPORT',
        }),
        addNewTournament : () => dispatch({
            type : 'ADD_NEW_TOURNAMENT',
        }),
        addNewSeason : () => dispatch({
            type: 'ADD_NEW_SEASON'
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector)