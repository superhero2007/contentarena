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
            selectedOption : 'single'
        };
    }

    componentDidMount () {
    }

    openModal = () => {
        this.setState({isOpen:true});
    };

    closeModal = () => {
        const {
            onSelect = true
        } = this.props;
        this.setState({isOpen:false});
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

    renderModal = () => {
        const {
            value
        } = this.props;

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
                <RegionCountrySelector value={value} ref="selector"/>
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
                <img className="territories-icon" src={filterIcon} onClick={this.openModal} />
            </div>
        )
    }
}

PopupCountrySelector.contextTypes = {
    t: PropTypes.func.isRequired
};

export default PopupCountrySelector;