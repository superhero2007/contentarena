import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import {goTo, limitText} from "../../main/actions/utils";
import {clockRoundIcon, exclamationRoundIcon, playIcon} from "../../main/components/Icons";

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
        goTo("listing/" + customId)
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
                </div>}

                {/*CONFIRM DEACTIVATE*/}
                {showDeactivateConfirm && <div className="options-tooltip">
                    <div className={"option"}>
                        Are you sure you want to deactivate the listing?
                    </div>
                    <div className={"option"} onClick={(e)=>{
                        this.setState({showDeactivateConfirm: false});
                        onDeactivate();
                        e.stopPropagation();
                    }}>
                        Yes
                    </div>
                    <div className={"option"} onClick={(e)=>{
                        this.setState({showDeactivateConfirm: false});
                        e.stopPropagation();
                    }}>
                        Cancel
                    </div>
                </div>}


                {/*CONFIRM REMOVE*/}
                {showRemoveConfirm && <div className="options-tooltip">
                    <div className={"option"}>
                        Are you sure you want to remove the listing?
                    </div>
                    <div className={"option"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        onRemove();
                        e.stopPropagation();
                    }}>
                        Yes
                    </div>
                    <div className={"option"} onClick={(e)=>{
                        this.setState({showRemoveConfirm: false});
                        e.stopPropagation();
                    }}>
                        Cancel
                    </div>
                </div>}

                {/*STATUS INFO*/}
                {showStatusInfo && <div className="status-tooltip">
                    <div className={"option"}>
                        {status.name === 'PENDING' && "Listing under review. Not visible in the marketplace yet."}
                        {status.name === 'INACTIVE' && "Listing is deactivated."}
                        {status.name === 'REJECTED' && "Listing rejected. Please edit or contact support."}
                    </div>
                </div>}

                { (status.name === 'REJECTED' || status.name === 'INACTIVE' || status.name === 'PENDING' ) &&
                <div
                    className={"status-icon"}
                    onMouseOver={() => {this.setState({showStatusInfo : true})}}
                    onMouseLeave={() => {this.setState({showStatusInfo : false})}}>
                    {status.name === 'PENDING' && <img src={clockRoundIcon} />}
                    {status.name === 'INACTIVE' &&<img src={playIcon} />}
                    {status.name === 'REJECTED' && <img src={exclamationRoundIcon} />}
                </div>}

                <div  className="menu-icon" onClick={this.toggleOptions}>
                    <img src={this.dotsIcon} />
                </div>
                <div className={"name"}>
                    { limitText(name) }
                </div>
                <div className={"tournament"}>
                    {tournament && <div>{tournament.name}</div>}
                    {tournament && tournament.length === 0 && <div>General content</div>}
                    {seasons && seasons.length > 1 && <div>Multiple seasons</div>}
                    {seasons && seasons.length === 1 && <div>Season: {seasons[0].year}</div>}
                </div>
                <div className={"rights"}>
                    {rightsPackage && rightsPackage.map((rp,i,l) => {
                        return <span key={"rp-"+i}>
                            {rp.name}
                            { rp.shortLabel === "PR" && PROGRAM_NAME &&
                            "Program: " + PROGRAM_NAME
                            }
                            {i<l.length -1 && ", "}
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
