import React, { Component } from 'react';
import Moment from "moment/moment";
import ContentListingEventDetails from "../../buy/components/ContentListingEventDetails";
import {goTo, limitText} from "../../main/actions/utils";

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

    hideOptions = (e) => {
        this.setState({showOptions: false});
        e.stopPropagation();
    };

    render(){
        const {
            name,
            customId,
            expiresAt,
            salesPackages,
            programs,
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
            onSubmit,
            style
        } = this.props;

        const {showOptions, showRemoveConfirm, showDeactivateConfirm} = this.state;

        return (
            <div className={className} style={style} onClick={this.hideOptions}>
                {showOptions && <div className="options-tooltip">
                    {showSubmit && <div className={"option"} onClick={()=>{
                        goTo("managelistings/edit/" + customId + "/4")
                    }}>
                        <img src={this.submitIcon} /> Submit
                    </div>}
                    {showEdit && <div className={"option"} onClick={()=>{
                        goTo("managelistings/edit/" + customId)
                    }}>
                        <img src={this.editIcon} /> Edit
                    </div>}
                    {showDuplicate && <div className={"option"} onClick={()=>{
                        this.setState({showOptions: false});
                        onDuplicate(customId);
                    }}>
                        <img src={this.duplicateIcon} /> Duplicate
                    </div>}
                    {showView && <div className={"option"} onClick={()=>{
                        goTo("listing/" + customId)
                    }}>
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
                </div>}

                {/*CONFIRM DEACTIVATE*/}
                {showDeactivateConfirm && <div className="options-tooltip">
                    <div className={"option"}>
                        Are you sure you want to deactivate the listing?
                    </div>
                    <div className={"option"} onClick={()=>{
                        this.setState({showDeactivateConfirm: false});
                        onDeactivate();
                    }}>
                        Yes
                    </div>
                    <div className={"option"} onClick={()=>{
                        this.setState({showDeactivateConfirm: false});
                    }}>
                        Cancel
                    </div>
                </div>}


                {/*CONFIRM REMOVE*/}
                {showRemoveConfirm && <div className="options-tooltip">
                    <div className={"option"}>
                        Are you sure you want to remove the listing?
                    </div>
                    <div className={"option"} onClick={()=>{
                        this.setState({showRemoveConfirm: false});
                        onRemove();
                    }}>
                        Yes
                    </div>
                    <div className={"option"} onClick={()=>{
                        this.setState({showRemoveConfirm: false});
                    }}>
                        Cancel
                    </div>
                </div>}

                <div  className={"menu-icon"} onClick={this.toggleOptions}>
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
                            { rp.shortLabel === "PR" && programs[0] && programs[0].name &&
                            "Program: " + programs[0].name
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
