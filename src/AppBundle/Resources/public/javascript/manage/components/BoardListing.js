import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import {goTo, limitText} from "../../main/actions/utils";
import {
    blueCheckIcon, clockRoundIcon, exclamationRoundIcon, expiredIcon, playIcon, soldIcon,
    yellowCheckIcon
} from "../../main/components/Icons";
import {SuperRightBoardLabels} from "../../sell/components/SuperRightDefinitions";

class BoardListing extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showOptions: false,
            showRemoveConfirm : false,
            showDeactivateConfirm : false
        };
        this.clockIcon = assetsBaseDir + "app/images/clock.png";
        this.exclamationIcon = assetsBaseDir + "app/images/exclamation_round.png";
        this.playIcon = assetsBaseDir + "app/images/play.png";
        this.bucketIcon = assetsBaseDir + "app/images/bucket_blue.png";
        this.editIcon = assetsBaseDir + "app/images/edit.png";
        this.duplicateIcon = assetsBaseDir + "app/images/duplicate.png";
        this.viewIcon = assetsBaseDir + "app/images/search.png";
        this.submitIcon = assetsBaseDir + "app/images/submit.png";
        this.dotsIcon = assetsBaseDir + "app/images/dots.png";
        this.deactivateIcon = assetsBaseDir + "app/images/close_red.png";
    }

    onSelect = () => {
      const {onSelect, customId} = this.props;

      if ( onSelect ) onSelect(customId);

    };

    toggleOptions = (e) => {
        this.setState({showOptions: !this.state.showOptions});
        e.stopPropagation();
    };

    edit = () => {
        const { customId } = this.props;
        goTo("managelistings/edit/" + customId)
    };

    submit = () => {
        const { customId } = this.props;
        goTo("managelistings/edit/" + customId + "/5")
    };

    view = () => {
        const { customId } = this.props;
        goTo("listing/" + customId, true);
    };

    hideOptions = (e) => {
        const {defaultAction} = this.props;
        const {showOptions} = this.state;
        this.setState({showOptions: false});
        if ( defaultAction && !showOptions ){
            if ( defaultAction === "EDIT"){
                this.edit()
            }

            if ( defaultAction === "VIEW"){
                this.view()
            }

            if ( defaultAction === "SUBMIT"){
                this.submit()
            }
        }

        e.stopPropagation();
    };

    render(){
        const {
            PROGRAM_NAME,
            name,
            customId,
            expiresAt,
            salesPackages,
            rightsPackage,
            tournament,
            seasons,
            className,
            showEdit,
            showRemove,
            showSubmit,
            showDuplicate,
            showDeactivate,
            showView,
            onRemove,
            onDuplicate,
            onDeactivate,
            lastAction,
            lastActionDate,
            lastActionUser,
            owner,
            status,
            onSubmit,
            style
        } = this.props;

        const {showOptions, showRemoveConfirm, showDeactivateConfirm, showStatusInfo} = this.state;

        return (
            <div className={className} style={style} onClick={this.hideOptions}>
                {showOptions && <div className="options-tooltip">
                    {showSubmit && <div className={"option"} onClick={this.submit}>
                        <img src={this.submitIcon} /> Submit
                    </div>}
                    {showEdit && <div className={"option"} onClick={this.edit}>
                        <img src={this.editIcon} /> Edit
                    </div>}
                    {showDuplicate && <div className={"option"} onClick={()=>{
                        this.setState({showOptions: false});
                        onDuplicate(customId);
                    }}>
                        <img src={this.duplicateIcon} /> Duplicate
                    </div>}
                    {showView && <div className={"option"} onClick={this.view}>
                        <img src={this.viewIcon} /> View
                    </div>}
                    {showRemove && <div className={"option"} onClick={()=>{
                        this.setState({showRemoveConfirm: true});
                    }}>
                        <img src={this.bucketIcon} /> Remove
                    </div>}
                    {showDeactivate && <div className={"option"} onClick={()=>{
                        this.setState({showDeactivateConfirm: true});
                    }}>
                        <img src={this.deactivateIcon} style={{width: 16}} /> Deactivate
                    </div>}

                    {lastAction && <div className="last-action">
                        Last action: {lastAction.description} {lastActionUser && "by " + lastActionUser.firstName + " " + lastActionUser.lastName } {lastActionDate && "on " + Moment(lastActionDate).format('HH:mm DD/MM/YYYY')}
                    </div>}

                    {owner && <div className="last-action">
                        Listing Owner: {owner.firstName + " " + owner.lastName }
                    </div>}
                </div>}

                {/*CONFIRM DEACTIVATE*/}
                {showDeactivateConfirm && <div className="confirmation-tooltip">
                    <div className={"confirmation-text"}>
                        Are you sure you want to deactivate the listing?
                    </div>
                    <button className={"button button-confirm"} onClick={(e)=>{
                        this.setState({showDeactivateConfirm: false});
                        onDeactivate();
                        e.stopPropagation();
                    }}>
                        Deactivate
                    </button>
                    <button className={"button"} onClick={(e)=>{
                        this.setState({showDeactivateConfirm: false});
                        e.stopPropagation();
                    }}>
                        Cancel
                    </button>
                </div>}


                {/*CONFIRM REMOVE*/}
                {showRemoveConfirm && <div className="confirmation-tooltip">
                    <div className={"confirmation-text"}>
                        Are you sure you want to remove the listing?
                    </div>
                    <button className={"button button-confirm"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        onRemove();
                        e.stopPropagation();
                    }}>
                        Remove
                    </button>
                    <button className={"button"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        e.stopPropagation();
                    }}>
                        Cancel
                    </button>
                </div>}

                {/*STATUS INFO*/}
                {showStatusInfo && <div className="status-tooltip">
                    <div className={"option"}>
                        {status.name === 'PENDING' && "Listing under review. Not visible in the marketplace yet."}
                        {status.name === 'INACTIVE' && "Listing is deactivated."}
                        {status.name === 'REJECTED' && "Listing rejected. Please edit or contact support."}
                        {status.name === 'EXPIRED' && "This listing has expired."}
                        {status.name === 'SOLD_OUT' && "All sales bundle of this listing were sold."}
                    </div>
                </div>}

                { (status.name !== 'DRAFT' && status.name !== 'APPROVED' && status.name !== 'EDITED' ) &&
                <div
                    className={"status-icon"}
                    onMouseOver={() => {this.setState({showStatusInfo : true})}}
                    onMouseLeave={() => {this.setState({showStatusInfo : false})}}>
                    {status.name === 'PENDING' && <img src={clockRoundIcon} />}
                    {status.name === 'INACTIVE' &&<img src={playIcon} />}
                    {status.name === 'REJECTED' && <img src={exclamationRoundIcon} />}
                    {status.name === 'EXPIRED' && <img src={expiredIcon} />}
                    {status.name === 'SOLD_OUT' && <img src={soldIcon} />}
                </div>}

                <div  className="menu-icon" onClick={this.toggleOptions}>
                    <img src={this.dotsIcon} />
                </div>
                <div className={"name"}>
                    { name }
                </div>
                <div className={"tournament"}>
                    {tournament && tournament.length === 1 && <div>{tournament[0].name}</div>}
                    {tournament && tournament.length === 0 && <div>General content</div>}
                    {seasons && seasons.length > 1 && <div>Multiple seasons</div>}
                    {seasons && seasons.length === 1 && <div>Season: {seasons[0].year}</div>}
                </div>
                <div className={"rights"}>
                    {rightsPackage && rightsPackage.map((rp,i,l) => {
                        return <span key={"rp-"+i}>
                            {!rp.exclusive &&
                            <img src={blueCheckIcon}/>}

                            {rp.exclusive &&
                            <img src={yellowCheckIcon}/>}

                            {SuperRightBoardLabels[rp.shortLabel]}
                            { rp.shortLabel === "PR" && PROGRAM_NAME &&
                            "Program: " + PROGRAM_NAME
                            }
                        </span>
                    })}
                </div>

                <div className={"expiry"}>
                    <div>{ salesPackages.length } sales bundle{ salesPackages.length > 1 && "s"}</div>
                    <div>Expiry: {Moment(expiresAt).format('DD/MM/YYYY')}</div>
                </div>

            </div>
        )
    }
}

export default BoardListing;
