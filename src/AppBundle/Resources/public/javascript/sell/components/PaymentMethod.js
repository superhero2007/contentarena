import React from 'react';
import DatePicker from '@components/DatePicker';
import moment from 'moment';

class PaymentMethod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.instant = "INSTANT";
        this.installments = "INSTALLMENTS";
    }

    render(){
        return (
            <div className="base-full-input">
                <label>How would you like to sell your content?</label>
                <div className={"content"}>
                    <div className={"item"} onClick={() => { this.props.onUpdate(this.instant) } }>
                        {this.props.paymentMethod !== this.instant && <i className="fa fa-circle-thin"/>}
                        {this.props.paymentMethod === this.instant && <i className="fa fa-check-circle-o"/>}
                        <div className={"title"}>
                            Use instant payment and get paid directly via PayPal.
                        </div>
                        <div className={"description"}>
                            In this case, the maximum transaction value must not exceed 5000 USD/EUR. Also, it is
                            not possible to sell content viabidding process (for now). Further, the buyer can not be
                            granted the right to request contractual changes.
                        </div>
                    </div>
                    <div className={"item"} onClick={() => { this.props.onUpdate(this.installments) } }>
                        {this.props.paymentMethod !== this.installments && <i className="fa fa-circle-thin"/>}
                        {this.props.paymentMethod === this.installments && <i className="fa fa-check-circle-o"/>}
                        <div className={"title"}>
                            Use installment-based payment and get paid after uploading the invoice.
                        </div>
                        <div className={"description"}>
                            In this case, there is no maximum transaction value. Also, you can offer territories for
                            sale via bidding process. Further, you may grant the buyer the right to ewquest contrac-
                            tual changes. This means, that the buyer may edit the term sheet and place a conditional
                            offer based upon these changes. Then, you are informed on the changes and can accept,
                            decline or propose a counter offer

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentMethod;