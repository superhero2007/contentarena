import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";

class LicenseDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen : props.isOpen,
            startDate : props.startDate
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isOpen: nextProps.isOpen, startDate : nextProps.startDate});
    }

    handleStartDate = (date) => {
        this.props.onUpdate("startDate", date);
    };

    handleEndDate = (date) => {
        this.props.onUpdate("endDate", date);
    };

    handleEndDateLimit = (e) => {
        this.props.onUpdate("endDateLimit", e.target.value);
    };

    render(){
        const { startDateMode, startDate, onClose, endDate, onUpdate,endDateLimit, endDateMode } = this.props;
        return (
            <Modal
                isOpen={this.state.isOpen}
                bodyOpenClassName={"selector"}
                style={customStyles}
            >

                <div className="modal-title">
                    Edit license period
                    <i className="fa fa-times-circle-o" onClick={onClose}/>
                </div>

                <div className="step-content">
                    <div className="step-content-container">
                        <div className="modal-input">
                            <label>Start of license period</label>
                            <div className="row">
                                <div className="column">
                                    <input type="checkbox"
                                        checked={startDateMode === "LICENSE"}
                                        onChange={ (e) => {
                                           onUpdate("startDateMode", "LICENSE");
                                        }}
                                        id={"license-start-contract"}
                                        className="package-selector"
                                    />
                                    <label htmlFor={"license-start-contract"}/>
                                    With contract conclusion
                                </div>
                                <div className="column">
                                    <input type="checkbox"
                                        checked={startDateMode === "DATE"}
                                        onChange={ (e) =>{
                                           onUpdate("startDateMode", "DATE");
                                        }}
                                        id={"license-start"}
                                        className="package-selector"
                                    />
                                    <label htmlFor={"license-start"}/>

                                    <DatePicker
                                        className={"date-picker"}
                                        selected={(startDate)? moment(startDate): undefined}
                                        disabled={startDateMode!=="DATE"}
                                        onChange={this.handleStartDate}
                                        placeholderText={"dd/mm/yyyy"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-input">
                            <label>End of license period</label>
                            <div className="row">
                                <div className="column">
                                    <input type="checkbox"
                                           checked={endDateMode==="LIMITED"}
                                           onChange={ (e) =>{
                                               onUpdate("endDateMode", "LIMITED");
                                           }}
                                           id={"license-end-input"}
                                           className="package-selector"
                                    />
                                    <label htmlFor={"license-end-input"}/>
                                    <input
                                        type={"number"}
                                        disabled={endDateMode!=="LIMITED"}
                                        value={endDateLimit}
                                        onChange={this.handleEndDateLimit}
                                        placeholder={"Enter number"}/>
                                    <span className={"small-label"}>days from contract conclusion</span>
                                </div>
                                <div className="column">
                                    <input type="checkbox"
                                           checked={endDateMode==="DATE"}
                                           onChange={ (e) =>{
                                               onUpdate("endDateMode", "DATE");
                                           }}
                                           id={"license-end"}
                                           className="package-selector"
                                    />
                                    <label htmlFor={"license-end"}/>
                                    <DatePicker
                                        className={"date-picker"}
                                        selected={(endDate)? moment(endDate): undefined}
                                        disabled={endDateMode!=="DATE"}
                                        onChange={this.handleEndDate}
                                        placeholderText={"dd/mm/yyyy"}
                                    />
                                </div>
                                <div className="column">
                                    <input type="checkbox"
                                           checked={endDateMode==="UNLIMITED"}
                                           onChange={ (e) =>{
                                               onUpdate("endDateMode", "UNLIMITED");
                                           }}
                                           id={"license-end-unlimited"}
                                           className="package-selector"
                                    />
                                    <label htmlFor={"license-end-unlimited"}/>
                                    <span style={{padding: '12px 0'}}>Unlimited</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"buttons"}>
                    <button
                        className={"standard-button"}
                        onClick={onClose}>Ok</button>
                </div>

            </Modal>
        )
    }
}

export default LicenseDateSelector;