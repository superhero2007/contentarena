const CurrencyItem = ({selected, onClick, name}) => (
    <div className={"currency-item"} onClick={onClick}>
        <div className={"currency-icon"}>
            {selected && <i className="fa fa-check-circle-o"/>}
        </div>
        {name}
    </div>
);

import React from 'react';

class CurrencySelector extends React.Component {
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
            <div className={"base-input"}>
                <label style={{flex: 7 }}>In which currency would you like to sell your content?</label>
                <CurrencyItem name={"EUR"} onClick={()=>this.props.onClick("EUR") } selected={this.props.selected === "EUR"}/>
                <CurrencyItem name={"USD"} onClick={()=>this.props.onClick("USD") } selected={this.props.selected === "USD"}/>
            </div>
        )
    }
}

export default CurrencySelector;