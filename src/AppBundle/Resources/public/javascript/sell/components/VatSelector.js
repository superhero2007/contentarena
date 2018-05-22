import React from 'react';

const VatItem = ({selected, onClick, name}) => (
    <div className={"currency-item"} onClick={onClick}>
        <div className={"currency-icon"}>
            {selected && <i className="fa fa-check-circle-o"/>}
        </div>
        {name}
    </div>
);

class VatSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    update = (selected) => {
        this.setState({selected: selected});
    };

    render(){
        return (
            <div className={"base-input"}>
                <label style={{flex: 7 }}>do you seek to apply VAT to buyers in company's place of jurisdiction?</label>
                <VatItem name={"yes"} onClick={()=>this.props.onClick("yes") } selected={this.props.selected === "yes"}/>
                <VatItem name={"no"} onClick={()=>this.props.onClick("no") } selected={this.props.selected === "no"}/>
            </div>
        )
    }
}

export default VatSelector;