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

    render(){
        const {onClick, selected,onUpdate,vatPercentage} = this.props;
        return (
            <div className={"base-input"}>
                <label style={{flex: 7 }}>do you seek to apply VAT to buyers in company's place of jurisdiction?</label>

                <VatItem name={"yes"} onClick={()=>onClick("yes") } selected={selected === "yes"}/>
                {selected === "yes" && <div className={"currency-item"} >
                    <input
                        style={{textAlign: 'center', marginRight: 5}}
                        value={vatPercentage}
                        type="number"
                        min={0}
                        onChange={(e)=>{
                            onUpdate("vatPercentage", e.target.value)
                        }}/> %
                </div>}
                <VatItem name={"no"} onClick={()=>onClick("no") } selected={selected === "no"}/>
            </div>
        )
    }
}

export default VatSelector;