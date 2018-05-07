import React from 'react';

class SalesPackageForm extends React.Component {
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
            <div className={"sales-package-form"}>
                <div className="base-full-input">
                    <label>How would you like to sell?</label>
                    <div className={"content"}>
                        <div className={"item"} onClick={() => { this.update() } }>
                            {!this.props.sellAsPackage && <i className="fa fa-circle-thin"/>}
                            {this.props.sellAsPackage && <i className="fa fa-check-circle-o"/>}
                            <div className={"title"}>
                                Sell all/selected territories as bundle
                            </div>
                            <div className={"description"}>
                            </div>
                        </div>
                        <div className={"item"} onClick={() => { this.update() } }>
                            {this.props.sellAsPackage && <i className="fa fa-circle-thin"/>}
                            {!this.props.sellAsPackage && <i className="fa fa-check-circle-o"/>}
                            <div className={"title"}>
                                Sell territories individually
                            </div>
                            <div className={"description"}>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default SalesPackageForm;