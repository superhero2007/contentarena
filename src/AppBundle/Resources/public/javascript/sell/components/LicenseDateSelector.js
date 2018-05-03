import React from 'react';

const CurrencyItem = ({selected, onClick, name}) => (
    <div className={"currency-item"} onClick={onClick}>
        <div className={"currency-icon"}>
            {selected && <i className="fa fa-check-circle-o"/>}
        </div>
        {name}
    </div>
);

class LicenseDateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }


    update = (selected) => {
        this.setState({selected: selected});
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
                        <div className=" column right-item-content">Cable&amp; IPTV</div>
                        <div className="column right-item-selection"></div>
                    </div>
                    <div className="row bordered-row">
                        <div className=" column right-item-content">Satellite</div>
                        <div className="column right-item-selection"></div>
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
                        <div className=" column right-item-content">Satellite</div>
                        <div className="column right-item-selection"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LicenseDateSelector;