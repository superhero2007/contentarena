import React from 'react';
import {IconYellowCircle, trashIconWhite, pencilIcon, reloadIcon} from "../../main/components/Icons";
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

    handleChange = ( e ) => {
        this.setState({value:e.target.value})
    };

    onUpdate = (  ) => {
        const {onUpdate} = this.props;
        const {value} = this.state;
        if (onUpdate) onUpdate(value, true);
        this.setState({editing: false})
    };

    restore = (  ) => {
        const {onUpdate} = this.props;
        const {restoreValue} = this.state;
        if (onUpdate) onUpdate(restoreValue, false);
    };

    render () {

        const { position, content, termPosition, editable, onRemove, edited } = this.props;
        const { editing,value, showRemoveConfirm } = this.state;

        return (
            <React.Fragment>
                {!editable && <div className="terms-edit-non-editable">
                    * {this.context.t("TERMS_EDIT_NON_EDITABLE")}
                </div>}
                <div className="terms-edit-item">
                    <div className={cn("terms-edit-item-content", {"terms-edit-item-disabled" : !editable, "terms-edit-item-editing": editing, "edited": edited })}>
                        {!editing && <strong>{termPosition}.{position}</strong>} {!editing && content}
                        {editing && <textarea  value={value} onChange={this.handleChange}/>}
                    </div>
                    <div className="terms-edit-item-actions" >
                        {!editing && editable && <IconYellowCircle icon={pencilIcon} onClick={() => this.setState({editing: true})} />}
                        {!editing && editable && <IconYellowCircle icon={reloadIcon} onClick={this.restore} />}
                        {!editing && editable && <IconYellowCircle icon={trashIconWhite} onClick={() => this.setState({showRemoveConfirm: true})}/>}
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
            </React.Fragment>
        )
    }
}

TermItem.contextTypes = {
    t: PropTypes.func.isRequired
};

export default TermItem;