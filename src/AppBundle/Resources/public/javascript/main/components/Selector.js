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

const SelectorItem = ({label, selected, onClick}) => (
    <div className={"selector-item " + (selected && "selector-item-selected")} onClick={onClick}>
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
            items : props.items || [],
            popularItems : props.popularItems || [],
            filter : {
                "ag" : { type: "firstLetter", values: ["a",'b','c','d','e','f','g'] },
                "hn" : { type: "firstLetter", values: ["h",'i','j','k','l','k','n'] },
                "ot" : { type: "firstLetter", values: ["o",'p','q','r','s','t'] },
                "uz" : { type: "firstLetter", values: ["u",'v','w','x','y','z'] },
                "popular" : { type: "origin", value: "popularItems"}
            },
            activeFilter : props.activeFilter || "ag",
            selectedItem : {}
        };

        store.subscribe((a) => {
        });
    }

    componentDidMount = () =>{
    };

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
        return this.props.items && this.props.items.length > 30
    };

    setActiveFilter = ( filterName ) =>{
      this.setState({ activeFilter: filterName,filterUpdated : true})
    };

    applySelection = () => {
        this.setState({ updated: false, filterUpdated : false });
        this.props.applySelection(this.props.type, this.state.selectedItem, this.props.multiple);
    };

    selectItem = ( item ) => {
        this.setState({ selectedItem : item, updated: true });
    };

    isItemSelected = ( item ) => {

        if ( this.state.updated ){
            return this.state.selectedItem.external_id === item.external_id;
        } else {

            if (!this.props.selected) return false;

            return this.props.selected.length > 0 &&
                (this.props.multiple) ? this.props.selected[0].external_id === item.external_id
                : this.props.selected.external_id === item.external_id;
        }
    };

    filter = (item) =>{
        let filter = this.getActiveFilter();
        return filter.values.indexOf(item.name[0].toLowerCase()) !== -1
    };

    getItems = () =>{
        let filter = this.getActiveFilter();
        if ( filter.type === "origin" ) return this.props[filter.value];
        if ( filter.type === "firstLetter") {

            if ( !this.shouldShowFilters() ) return this.props.items;

            return this.props.items.filter(this.filter);
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
                </div>
                <div className="selector-content">
                    { this.getItems().map(function(item, i){
                        return <SelectorItem key={i}
                                             label={item.name}
                                             onClick={ () => _this.selectItem(item)}
                                             selected={ _this.isItemSelected(item) }/>;
                    })}
                </div>
                <div>
                    <button onClick={this.closeModal}>Cancel</button>
                    <button onClick={this.applySelection} disabled={!this.state.updated}>Apply</button>
                    <div>Can't find your sport in the list? </div>
                    <button>Add new Sport</button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        open : state.selectorInfo.open,
        items : state.selectorInfo.selectorItems,
        popularItems: state.selectorInfo.popularItems,
        type : state.selectorInfo.selectorType,
        activeFilter: state.selectorInfo.activeFilter,
        selected : state[state.selectorInfo.selectorType],
        multiple : state.selectorInfo.multiple
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openSelector : () => dispatch({
            type : 'OPEN_SELECTOR'
        }),
        closeSelector : () => dispatch({
            type : 'CLOSE_SELECTOR'
        }),
        applySelection : (selectorType, selectedItem, multiple) => dispatch({
            type : 'APPLY_SELECTION',
            selectorType : selectorType,
            selectedItem : selectedItem,
            multiple : multiple
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector)