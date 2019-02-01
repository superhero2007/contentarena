import React from 'react';
import { connect } from "react-redux";
import {
    IconYellowCircle, pencilIcon, reloadIcon, trashIconWhite
} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import cn from "classnames";

class DefinitionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing : props.editing ||false,
            value : props.content || "",
            name : props.name || "",
            restoreValue : props.content || "",

        };
    }

    componentDidMount () { }

    handleChange = ( e ) => {
        this.setState({value:e.target.value})
    };

    handleName = ( e ) => {
        this.setState({name:e.target.value})
    };

    onUpdate = (  ) => {
        const {onUpdate} = this.props;
        const {value, name} = this.state;
        if (onUpdate) onUpdate(value, name);
        this.setState({editing: false})
    };

    restore = (  ) => {
        const {onUpdate} = this.props;
        const {restoreValue} = this.state;
        if (onUpdate) onUpdate(restoreValue);
    };

    render () {

        const { custom, content, editable, onRemove } = this.props;
        const { editing,value, name, showRemoveConfirm } = this.state;

        return (
            <div className="terms-edit-item">
                <div className={cn("terms-edit-item-name", {"terms-edit-item-disabled" : !editable, "terms-edit-item-editing": editing })}>
                    {(!editing || !custom)&& name}
                    {editing && custom && <textarea  value={name} onChange={this.handleName}/>}
                </div>
                <div className={cn("terms-edit-item-content", {"terms-edit-item-disabled" : !editable, "terms-edit-item-editing": editing })}>
                    {!editing && content}
                    {editing && <textarea  value={value} onChange={this.handleChange}/>}
                </div>
                <div className="terms-edit-item-actions" >
                    {!editing && editable && <IconYellowCircle icon={pencilIcon} onClick={() => this.setState({editing: true})} />}
                    {!editing && !custom && editable && <IconYellowCircle icon={reloadIcon} onClick={this.restore} />}
                    {!editing && custom && <IconYellowCircle icon={trashIconWhite} onClick={() => this.setState({showRemoveConfirm: true})}/>}

                    {editing && editable && <i className="fa fa-check-circle" onClick={this.onUpdate} style={{color: 'green'}} />}
                    {editing && editable && <i className="fa fa-times-circle" onClick={() => this.setState({editing: false})} style={{color: 'red'}} />}

                </div>
                {showRemoveConfirm && <div className="confirmation-tooltip">
                    <div className={"confirmation-text"}>
                        {this.context.t("TERMS_DEFINITIONS_REMOVE_CONFIRMATION")}
                    </div>
                    <button className={"button button-confirm"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        if (onRemove) onRemove();
                        e.stopPropagation();
                    }}>
                        {this.context.t("MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM")}
                    </button>
                    <button className={"button"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        e.stopPropagation();
                    }}>
                        {this.context.t("MANAGE_LISTINGS_REMOVE_BUTTON_CANCEL")}
                    </button>
                </div>}
            </div>
        )
    }
}

DefinitionItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default DefinitionItem;