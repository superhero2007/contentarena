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
            activeFilter : props.activeFilter || "popular",
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
        this.setState({ updated: false });
        this.props.closeSelector();
    };

    getActiveFilter = () => {
      return this.state.filter[this.state.activeFilter];
    };

    setActiveFilter = ( filterName ) =>{
      this.setState({ activeFilter: filterName})
    };

    applySelection = () => {
        this.props.applySelection(this.props.type, this.state.selectedItem);
    };

    selectItem = ( item ) => {
        this.setState({ selectedItem : item, updated: true });
    };

    isItemSelected = ( item ) => {

        if ( this.state.updated ){
            return this.state.selectedItem.external_id === item.external_id;
        } else {
            return this.props.selected[0].external_id === item.external_id;
        }
    };

    filter = (item) =>{
        let filter = this.getActiveFilter();
        return filter.values.indexOf(item.name[0].toLowerCase()) !== -1
    };

    getItems = () =>{
        let filter = this.getActiveFilter();
        if ( filter.type === "origin" ) return this.props[filter.value];
        if ( filter.type === "firstLetter") return this.props.items.filter(this.filter);
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
                    <button onClick={()=>{ this.setActiveFilter("popular")}}>Popular</button>
                    <button onClick={()=>{ this.setActiveFilter("ag")}}>A-G</button>
                    <button onClick={()=>{ this.setActiveFilter("hn")}}>H-N</button>
                    <button onClick={()=>{ this.setActiveFilter("ot")}}>O-T</button>
                    <button onClick={()=>{ this.setActiveFilter("uz")}}>U-Z</button>
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
                    <button  onClick={this.applySelection}>Apply</button>
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
        selected : state[state.selectorInfo.selectorType]
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
        applySelection : (selectorType, selectedItem) => dispatch({
            type : 'APPLY_SELECTION',
            selectorType : selectorType,
            selectedItem : selectedItem
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector)





