import React, { Component } from 'react';

class ProgramName extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name || ''
        }
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    };

    componentWillReceiveProps(nextProps) {
        this.setState({name: nextProps.name});
    }

    render(){
        return (
            <div className="base-input">
                <label>Enter program name</label>
                <input
                    type="text"
                    value={this.state.name}
                    disabled={this.props.showEdit}
                    onChange={this.handleChange}
                    placeholder="Program name"/>
                {this.props.showSave&&<button className={"standard-button"} onClick={() => this.props.onSave(this.props.index, this.state.name) }>
                    Save
                </button>}
                {this.props.showEdit&&<button className={"standard-button"} onClick={() => this.props.onEdit(this.props.index, this.state.name) }>
                    Edit
                </button>}
                {this.props.showRemove&&<button className={"standard-button"} onClick={() => this.props.onRemove(this.props.index)}>
                    Remove
                </button>}
                {this.props.showAdd&&<button className={"standard-button"} onClick={this.props.onAdd}>
                    Add
                </button>}
            </div>
        )
    }
}

export default ProgramName;
