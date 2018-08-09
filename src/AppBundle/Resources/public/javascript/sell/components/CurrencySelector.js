import React from 'react';
import cn from 'classnames';

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
                <div className='current'>{selected}</div>
                <div className='dropdown'>
                    <div
                        className={cn('currency-item', { 'hidden': selected === 'USD' })}
                        onClick={()=>onClick("USD") }
                    >
                        USD
                    </div>
                    <div
                        className={cn('currency-item', { 'hidden': selected === 'EUR' })}
                        onClick={()=>onClick("EUR") }
                    >
                        EUR
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrencySelector;