import React from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import {
  IconYellowCircle, trashIconWhite, pencilIcon, reloadIcon,
} from "../../main/components/Icons";
import Loader from "../../common/components/Loader/Loader";

class TermItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      content: props.content || "",
      restoreValue: props.content || "",
      updating: false,
    };
  }

    handleChange = (e) => {
      this.setState({ content: e.target.value });
    };

    onUpdate = () => {
      const { id } = this.props;
      const { content } = this.state;

      const term = {
        content,
        id,
      };

      this.setState({ updating: true, editing: false });

      ContentArena.Api.updateTerm(term).done((response) => {
        this.setState({
          updating: false,
          edited: true,
          content: response.success ? response.term.content : content,
        });
      });
    };

    restore = () => {
      const { restoreValue } = this.state;
      this.setState({ content: restoreValue });
    };

    render() {
      const {
        position, termPosition, editable, onRemove, edited,
      } = this.props;
      const {
        editing, showRemoveConfirm, updating, content,
      } = this.state;

      return (
        <React.Fragment>
          {!editable && (
          <div className="terms-edit-non-editable">
                    *
            {" "}
            {this.context.t("TERMS_EDIT_NON_EDITABLE")}
          </div>
          )}
          <div className="terms-edit-item">
            <div className={cn("terms-edit-item-content", { "terms-edit-item-disabled": !editable, "terms-edit-item-editing": editing, edited })}>
              {!editing && (
                <strong>
                  {termPosition}
.
                  {position}
                </strong>
              )}
              {" "}
              {!editing && content}
              {editing && <textarea value={content} onChange={this.handleChange} />}
            </div>
            <div className="terms-edit-item-actions">
              {!updating && !editing && editable && <IconYellowCircle icon={pencilIcon} onClick={() => this.setState({ editing: true })} />}
              {!updating && !editing && editable && <IconYellowCircle icon={reloadIcon} onClick={this.restore} />}
              {!updating && !editing && editable && <IconYellowCircle icon={trashIconWhite} onClick={() => this.setState({ showRemoveConfirm: true })} />}
              {!updating && editing && editable && <i className="fa fa-check-circle" onClick={this.onUpdate} style={{ color: "green" }} />}
              {!updating && editing && editable && <i className="fa fa-times-circle" onClick={() => this.setState({ editing: false })} style={{ color: "red" }} />}
              {updating && <Loader loading={updating} xSmall /> }
            </div>
            {showRemoveConfirm && (
              <div className="confirmation-tooltip">
                <div className="confirmation-text">
                  {this.context.t("TERMS_DEFINITIONS_REMOVE_CONFIRMATION")}
                </div>
                <button
                  className="button button-confirm"
                  onClick={(e) => {
                    this.setState({ showRemoveConfirm: false });
                    if (onRemove) onRemove();
                    e.stopPropagation();
                  }}
                >
                  {this.context.t("MANAGE_LISTINGS_REMOVE_BUTTON_CONFIRM")}
                </button>
                <button
                  className="button"
                  onClick={(e) => {
                    this.setState({ showRemoveConfirm: false });
                    e.stopPropagation();
                  }}
                >
                  {this.context.t("MANAGE_LISTINGS_REMOVE_BUTTON_CANCEL")}
                </button>
              </div>
            )}
          </div>
        </React.Fragment>
      );
    }
}

TermItem.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default TermItem;
