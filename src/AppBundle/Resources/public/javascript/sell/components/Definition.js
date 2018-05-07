import React from 'react';

class Definition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable :false
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    editContent = () =>{
        let _this = this;
        this.setState({editable:true});
        this._input.focus();
        setTimeout(function(){_this._input.focus();}, 1000)
    };

    saveContent = () =>{
        this.setState({editable:false})
    };

    render(){
        return (
            <div className={"definition"}>
                <div className={"definition-container"}>
                    <label>{this.props.label}</label>
                    <input
                        disabled={!this.state.editable}
                        type={"text"}
                        ref={(_input) => this._input = _input}
                        defaultValue={this.props.defaultValue}/>
                </div>
                { !this.state.editable && <button onClick={this.editContent}>Edit</button>}
                { this.state.editable && <button onClick={this.saveContent}>Save</button>}
            </div>
        )
    }
}

export default Definition;