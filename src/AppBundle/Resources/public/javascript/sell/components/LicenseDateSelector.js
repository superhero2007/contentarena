import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class LicenseDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleStartDate = (date) => {
        this.setState({
            startDate: date
        });

        this.props.onUpdate("startDate", date);
    };

    handleEndDate = (date) => {
        this.setState({
            endDate: date
        });
        this.props.onUpdate("endDate", date);
    };

    render(){
        return (
            <div className={"license-date-container"}>
                <div className="table-right">
                    <div className="row">
                        <div className="column right-name">Start of license period</div>
                        <div className="column right-package">All</div>
                    </div>
                    <div className="row bordered-row">
                        <div className=" column right-item-content">
                            With contract conclusion
                        </div>
                        <div className="column right-item-selection">
                            <div className="column right-item-selection">
                                {<i className="fa fa-check-circle-o" />}
                            </div>
                        </div>
                    </div>
                    <div className="row bordered-row">
                        <div className=" column right-item-content">
                            From selected date
                        </div>
                        <div className="column right-item-selection">
                            <DatePicker
                                className={"date-picker"}
                                selected={this.state.startDate}
                                onChange={this.handleStartDate}
                                placeholderText={"dd/mm/yyyy"}
                            />
                        </div>
                    </div>
                </div>

                <div className="table-right">
                    <div className="row">
                        <div className="column right-name">End of license period</div>
                        <div className="column right-package">All</div>
                    </div>
                    <div className="row bordered-row">
                        <div className=" column right-item-content">Until (X) days from contract
                            conclusion</div>
                        <div className="column right-item-selection">
                            <input type={"number"} placeholder={"Enter number"}/>
                        </div>
                    </div>
                    <div className="row bordered-row">
                        <div className=" column right-item-content">
                            Until selected date
                        </div>
                        <div className="column right-item-selection">
                            <DatePicker
                                className={"date-picker"}
                                selected={this.state.endDate}
                                onChange={this.handleEndDate}
                                placeholderText={"dd/mm/yyyy"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LicenseDateSelector;