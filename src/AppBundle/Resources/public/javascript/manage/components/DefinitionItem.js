import React from 'react';
import { connect } from "react-redux";
import { Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import cn from "classnames";

class DefinitionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing : false,
            value : props.content || "",
            restoreValue : props.content || "",
        };
    }

    componentDidMount () { }

    handleChange = ( e ) => {
        this.setState({value:e.target.value})
    };

    onUpdate = (  ) => {
        const {onUpdate} = this.props;
        const {value} = this.state;
        if (onUpdate) onUpdate(value);
        this.setState({editing: false})
    };

    restore = (  ) => {
        const {onUpdate} = this.props;
        const {restoreValue} = this.state;
        if (onUpdate) onUpdate(restoreValue);
    };

    clear = (  ) => {
        const {onUpdate} = this.props;
        if (onUpdate) onUpdate("");
    };

    render () {

        const { position, content, editable,name } = this.props;
        const { editing,value } = this.state;

        return (
            <div className="terms-edit-item">
                <div className={cn("terms-edit-item-name", {"terms-edit-item-disabled" : !editable, "terms-edit-item-editing": editing })}>
                    {name}
                </div>
                <div className={cn("terms-edit-item-content", {"terms-edit-item-disabled" : !editable, "terms-edit-item-editing": editing })}>
                    {!editing && content}
                    {editing && <textarea  value={value} onChange={this.handleChange}/>}
                </div>
                <div className="terms-edit-item-actions" >
                    {!editing && editable && <i className="fa fa-pencil" onClick={() => this.setState({editing: true})} />}
                    {!editing && editable && <i className="fa fa-refresh" onClick={this.restore} />}
                    {!editing && editable && <i className="fa fa-minus-circle"onClick={this.clear} />}
                    {editing && editable && <i className="fa fa-check-circle" onClick={this.onUpdate} />}
                    {editing && editable && <i className="fa fa-times-circle" onClick={() => this.setState({editing: false})} />}

                </div>

            </div>
        )
    }
}

DefinitionItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default DefinitionItem;