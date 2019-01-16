import React from 'react';
import { connect } from "react-redux";
import { Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import cn from "classnames";

class TermItem extends React.Component {
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

        const { position, content, termPosition, editable } = this.props;
        const { editing,value } = this.state;

        return (
            <React.Fragment>
                {!editable && <div className="terms-edit-non-editable">
                    * {this.context.t("TERMS_EDIT_NON_EDITABLE")}
                </div>}
                <div className="terms-edit-item">
                    <div className={cn("terms-edit-item-content", {"terms-edit-item-disabled" : !editable, "terms-edit-item-editing": editing })}>
                        {!editing && <strong>{termPosition}.{position}</strong>} {!editing && content}
                        {editing && <textarea  value={value} onChange={this.handleChange}/>}
                    </div>
                    <div className="terms-edit-item-actions" >
                        {!editing && editable && <i className="fa fa-pencil" onClick={() => this.setState({editing: true})} />}
                        {!editing && editable && <i className="fa fa-refresh" onClick={this.restore} />}
                        {!editing && editable && <i className="fa fa-minus-circle" onClick={this.clear} />}
                        {editing && editable && <i className="fa fa-check-circle" onClick={this.onUpdate} />}
                        {editing && editable && <i className="fa fa-times-circle" onClick={() => this.setState({editing: false})} />}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

TermItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TermItem;