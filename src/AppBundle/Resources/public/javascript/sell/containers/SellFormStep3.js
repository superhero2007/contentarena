import React from 'react';
import { connect } from "react-redux";
import CurrencySelector from "../components/CurrencySelector";
import FileSelector from '../../main/components/FileSelector';

class SellFormStep3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : "Step 3",
            name : ""
        };
    }

    componentDidMount () {
    }

    componentWillReceiveProps(nextProps) {
    }

    selectCurrency = ( currency ) => {
        this.props.updateContentValue("currency", currency);
    };

    updateName = ( e ) => {
        this.props.updateContentValue("name", e.target.value);
    };
    render() {
        const {step, name} = this.props;

        if ( step !== 3) return (null);

        return (
            <div className="step-content">
                <div className="step-content-container">
                    <div className="base-input">

                        <label>Listing name</label>
                        <input
                            type="text"
                            defaultValue={name}
                            onBlur={this.updateName}
                            placeholder=""/>
                    </div>

                    <CurrencySelector onClick={this.selectCurrency} selected={this.props.currency} />

                    <FileSelector label={"Listing image (opt.)"} target={"image"}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.content
};

const mapDispatchToProps = dispatch => {
    return {
        updateContentValue : (key, value) => dispatch({
            type: 'UPDATE_CONTENT_VALUE',
            key: key,
            value : value
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellFormStep3)