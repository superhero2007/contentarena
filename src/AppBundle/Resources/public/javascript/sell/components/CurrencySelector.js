import React from 'react';
import cn from 'classnames';

const CURRENCIES = ['USD', 'EUR'];

class CurrencySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        const { onClick, selected } = this.props;

        return (
            <div className='select-currency'>
                <div className='select-text'>Currency</div>
                <div className='currency-selector'>
                    <div className='current'>{selected}</div>
                    <div className='dropdown'>
                        {CURRENCIES.filter(currency => currency !== selected).map((currency) => {
                            return (
                                <div className={cn('currency-item')} onClick={() => onClick(currency)}>
                                    {currency}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrencySelector;