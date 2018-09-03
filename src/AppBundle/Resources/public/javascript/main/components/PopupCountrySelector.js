import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../styles/custom";
import {cancelIcon, filterIcon} from "./Icons";
import {PropTypes} from "prop-types";
import RegionCountrySelector from "./RegionCountrySelector";

class PopupCountrySelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            value : props.value,
            selectedOption : props.includeAllCountries ? 'multiple' : 'single'
        };
    }


    openModal = () => {
        this.setState({isOpen:true});
    };

    closeModal = () => {
        const {
            onSelect = true
        } = this.props;
        this.setState({
            isOpen:false,
            value: []
        });
        onSelect(this.refs.selector.state.selection);
    };

    cancelModal = () => {
        this.setState({isOpen:false});
    };

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleCountryChange = (value) => {
        this.setState({ value});
    };

    renderModal = () => {
        const {
            value
        } = this.state;

        return <Modal
            isOpen={this.state.isOpen}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div className="modal-title">
                {this.context.t("Country Selector")}
                <div className="close" onClick={this.cancelModal}>X</div>
            </div>

            <div className="step-content">
                <RegionCountrySelector
                    value={value}
                    ref="selector"
                    worldwide={true}
                    onChange={this.handleCountryChange}
                />
            </div>

            <div style={{
                display: "flex",
                margin: 20,

            }}>
                <input type="radio"
                       value="single"
                       className="ca-radio"
                       style={{ height: '20px', width: 20, marginRight: 15}}
                       defaultChecked={true}
                       checked={this.state.selectedOption === 'single'}
                       onChange={this.handleOptionChange}
                />
                <span style={{color:'black', marginRight: 30, fontSize: '14px'}}>
                    {this.context.t("List offers for at least one selected territory")}
                </span>

                <input type="radio"
                       value="multiple"
                       className="ca-radio"
                       style={{ height: '20px', width: 20, marginRight: 15}}
                       checked={this.state.selectedOption === 'multiple'}
                       onChange={this.handleOptionChange}
                />
                <span style={{color:'black', fontSize: '14px'}}>
                    {this.context.t("List offers for all selected territories")}
                </span>
            </div>

            <div className={"buttons"}>
                <button
                    disabled={!value || value.length === 0}
                    className={"standard-button"}
                    onClick={this.closeModal}>Ok</button>

            </div>

        </Modal>
    };


    render(){
        const {
            showTerritories = true
        } = this.props;

        const {territories, activeTerritory} = this.state;

        return (
            <div className="popup-country-selector">
                { this.renderModal() }
                <div className="filter-btn">
                    <i className="fa fa-sliders" aria-hidden="true" onClick={this.openModal} />
                </div>
            </div>
        )
    }
}

PopupCountrySelector.contextTypes = {
    t: PropTypes.func.isRequired
};

export default PopupCountrySelector;