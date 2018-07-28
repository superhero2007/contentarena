import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {RightItemsDefinitions} from "./RightItemsDefinitions";
import {LanguageSelector} from "../../main/components/LanguageSelector";
import {SuperRightProductionDetailsLabels} from "./SuperRightDefinitions";

const numberFieldStyle = { width: '30px', paddingLeft: '10px'};

class PopupRight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rightsPackage : new Map(props.rightsPackage.map((i) => [i.id, i])),
            isOpen : false,
            selected : props.selected,
            custom : false,
            productionLabels : SuperRightProductionDetailsLabels
        };
    }

    componentWillReceiveProps(props){
        //console.log("PopupRight - props",props);
        this.setState({
            rightsPackage : new Map(props.rightsPackage.map((i) => [i.id, i]))
        });
    }

    toggleAll = (rightItem) => {
        let selection = this.state.selection;

        if (selection.get(rightItem).has(0)){
            selection.get(rightItem).clear();
        }  else {
            this.state.activePackages.forEach((rightPackage)=>{
                selection.get(rightItem).set(rightPackage.id, true);
            });

            selection.get(rightItem).set(0, true);
        }

        this.setState({selection: selection});
    };

    select = (rightItem, rightPackage) => {
        let selection = this.state.selection;

        if ( !this.state.activePackages.has(rightPackage)) return false;

        if ( !this.props.data.multiple ) {

            selection.forEach((item, key) => {
                if ( key !== rightItem ) item.clear()
            })
        }
        selection.get(rightItem).set(rightPackage, true);
        this.setState({selection});
    };

    unselect = (rightItem, rightPackage) =>{
        let selection = this.state.selection;
        selection.get(rightItem).delete(rightPackage);
        selection.get(rightItem).delete(0);
        this.setState({selection:selection});
    };

    toggle = (rightItem, rightPackage) =>{
        let selection = this.state.selection;
        if ( selection.get(rightItem).has(rightPackage) ) {
            this.unselect(rightItem,rightPackage);
        } else {
            this.select(rightItem,rightPackage);
        }
    };

    isSelected = (rightItem, rightPackage) => {
        let selection = this.state.selection;
        return selection.get(rightItem).has(rightPackage);
    };


    packageIsActive = ( id ) => {
        return this.state.activePackages.has( id ) && this.state.availablePackages.has( id );
    };

    setDate = (date, rightItem, rightPackage) => {
        let selection = this.state.selection;

        if ( !this.state.activePackages.has(rightPackage)) return false;

        selection.get(rightItem).set(rightPackage, date);
        this.setState({selection});
    };

    togglePopup = () => {

        const {onProgram, id} = this.props;

        if ( id === "PROGRAM") {
            onProgram();
            return;
        }

        let isOpen = !this.state.isOpen;
        this.setState({isOpen});
    };

    updateSelection = (val, id,rightPackage) => {

        const rightsPackage = this.state.rightsPackage;
        rightPackage.selectedRights[id] = val;
        rightsPackage.set(rightPackage.id, rightPackage);

        this.props.onUpdate(rightsPackage);

    };

    updateMultipleSelection = (val, id,rightPackage) => {

        const rightsPackage = this.state.rightsPackage;
        let index = rightPackage.selectedRights[id].indexOf(val);
        let all = RightItemsDefinitions[val].all;
        let alls = RightItemsDefinitions

        if ( index === -1 ){

            if ( all ){
                rightPackage.selectedRights[id] = [val];
            } else {
                rightPackage.selectedRights[id] = [...rightPackage.selectedRights[id], val];

                rightPackage.selectedRights[id].forEach(function(item, index, object) {
                    let m = item.match(/_ALL/g);
                    if (m) {
                        object.splice(index, 1);
                    }
                });

            }

        } else {
            if (rightPackage.selectedRights[id].length > 1) rightPackage.selectedRights[id].splice(index, 1);
        }

        rightsPackage.set(rightPackage.id, rightPackage);

        this.props.onUpdate(rightsPackage);

    };

    updateSelectionInAllPackages = (val, id) => {

        const rightsPackage = this.state.rightsPackage;
        rightsPackage.forEach((rightPackage )=>{
            rightPackage.selectedRights[id] = val;
        });
        this.props.onUpdate(rightsPackage);

    };

    getSelection = (id,  superRights) =>{

        let custom = false, selected;

        superRights.forEach( ( superRight ) => {

            if ( !superRight.selectedRights) return false;

            let current = superRight.selectedRights[id];

            if ( selected === undefined ){
                selected = current;
                return false;
            }

            if ( current !== selected ){
                custom = true;
                return true;
            }


        });
        return custom;

    };

    hasSelection = (id, value, superRights) =>{

        let has = false;

        superRights.forEach( ( superRight ) => {
            if ( superRight.selectedRights[id] === value ) has = true;
        });

        return has;

    };

    renderModalRow = (rightPackage) => {
        const {
            multiple,
            options,
            id,
            productionLabel,
            rightsPackage
        } = this.props;
        const { productionLabels } = this.state;
        let packagesAvailable = rightsPackage.map(rp =>rp.shortLabel);
        return <div className="row">
            <div className="column" style={{justifyContent:"flex-start", flex: 3}}>
                {!productionLabel && rightPackage.name}
                {productionLabel && productionLabels[rightPackage.shortLabel]}
            </div>
            {options.map((option, i ,list)=> {

                let flex = (list.length > 2 ) ? 2 : 3;
                let disabled = false;
                let definition = RightItemsDefinitions[option];
                if (RightItemsDefinitions[option].language) flex = flex+ 2;
                if (definition.hideIf && definition.hideIf.filter(sl=>{return packagesAvailable.indexOf(sl) !== -1}).length > 0) return null;
                if (definition.disabledIf && definition.disabledIf.indexOf(rightPackage.shortLabel) !== -1 ) disabled = true;
                return <div className="column" style={{ flex: flex }}>
                    {multiple &&
                    <input checked={rightPackage.selectedRights[id].indexOf(option) !== -1 }
                           onChange={(e) => { this.updateMultipleSelection(option, id,rightPackage)} }
                           type="checkbox"
                           id={rightPackage.shortLabel + "_" + option}/>}
                    {multiple &&
                    <label htmlFor={rightPackage.shortLabel + "_" + option}/>}
                    {!multiple &&
                    <input
                        defaultChecked={rightPackage.selectedRights[id] === option}
                        type="radio"
                        className="ca-radio"
                        disabled={disabled}
                        onChange={(e) => { this.updateSelection(e.target.value, id,rightPackage)} }
                        name={rightPackage.shortLabel + "_" + id} value={option}/>}

                    {RightItemsDefinitions[option].language &&
                    <LanguageSelector
                        onChange={(value) => { this.updateSelection(value, id+ "_LANGUAGES",rightPackage)}}
                        value={rightPackage.selectedRights[id+ "_LANGUAGES"]}/>}
                    {RightItemsDefinitions[option].textField &&
                    <input
                        onChange={(e) => { this.updateSelection(e.target.value, id+ "_TEXT",rightPackage)}}
                        value={rightPackage.selectedRights[id+ "_TEXT"]}
                        className="text-field"
                        type="text"/>
                    }
                    {
                        RightItemsDefinitions[option].numberField &&
                        <input
                            className="text-field"
                            style={numberFieldStyle}
                            type="number"
                            onChange={(e) => { this.updateSelection(e.target.value,RightItemsDefinitions[option].numberFieldValue,rightPackage)}}
                            value={rightPackage.selectedRights[RightItemsDefinitions[option].numberFieldValue]}
                            min={0}/>
                    }
                    {RightItemsDefinitions[option].bigTextField && <textarea style={{minHeight: "50px", margin: "5px 0px"}}/>}
                </div>
            })}
        </div>
    };

    renderModal = () => {
        const {
            name,
            options, id,  superRights, showTextArea, rightsPackage, technicalFee,
            checkContentDelivery,
            global,
            language,
            languages,
            onUpdateListing
        } = this.props;

        let packagesAvailable = rightsPackage.map(rp =>rp.shortLabel);
        let deliveryViaLiveFeed = rightsPackage.filter(rp =>rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE");

        return <Modal
            isOpen={this.state.isOpen}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div className="modal-title">
                Edit {name}
                {this.showOkButton() && <i className="fa fa-times-circle-o" onClick={this.togglePopup}/>}
            </div>

            <div className="step-content">
                <div className="step-content-container">
                    <div className="modal-table">
                        <div className="row row-header">
                            {!global && <div className="column" style={{justifyContent:"flex-start", flex: 3}}/>}
                            {global && language && <div className="column" style={{ flex: 3 }}>Licensed languages</div>}
                            {options.map((option, i , list)=> {
                                let flex = (list.length > 2 ) ? 2 : 3;

                                let definition = RightItemsDefinitions[option];
                                if (definition.language) flex = flex+ 2;
                                let label = definition.label;

                                if (definition.hideIf && definition.hideIf.filter(sl=>{return packagesAvailable.indexOf(sl) !== -1}).length > 0) return null;

                                return <div className="column" style={{ flex: flex }}>
                                    {label && label}
                                </div>
                            })}
                        </div>
                        {global && language &&
                        <LanguageSelector
                            onChange={(value) => { onUpdateListing("LICENSED_LANGUAGES", value) }}
                            value={languages}/>}

                        {deliveryViaLiveFeed.length > 0 && id !== "CONTENT_DELIVERY" && packagesAvailable.indexOf("LT") === -1 && checkContentDelivery
                        && <div className="row">
                            <div className="column" style={{justifyContent:"flex-start", flex: 3}}>
                                Live Transmission
                            </div>
                            {options.map((option, i ,list)=> {
                                let flex = (list.length > 2 ) ? 2 : 3;
                                let disabled = false;
                                let definition = RightItemsDefinitions[option];
                                if (definition.language) flex = flex+ 2;
                                if (definition.hideIf && definition.hideIf.filter(sl=>{return packagesAvailable.indexOf(sl) !== -1}).length > 0) return null;

                                let customId = "LIVE_FEED_" + id;
                                let customProp = rightsPackage[0].selectedRights[customId];
                                return <div className="column" style={{ flex: flex }}>
                                    <input
                                        defaultChecked={customProp === option}
                                        type="radio"
                                        className="ca-radio"
                                        disabled={disabled}
                                        onChange={(e) => { this.updateSelection(e.target.value, customId,rightsPackage[0])} }
                                        name={customId + "_" + id} value={option}/>

                                    {definition.language &&
                                    <LanguageSelector
                                        onChange={(value) => { this.updateSelection(value, customId+ "_LANGUAGES",rightsPackage[0])} }
                                        value={rightsPackage[0].selectedRights[customId+ "_LANGUAGES"]}/>}
                                    {definition.textField &&
                                    <input
                                        onChange={(e) => { this.updateSelection(e.target.value, customId+ "_TEXT",rightsPackage[0])} }
                                        value={rightsPackage[0].selectedRights[customId+ "_TEXT"]}
                                        className="text-field"
                                        type="text"/>
                                    }
                                    {
                                        definition.numberField &&
                                        <input
                                            className="text-field"
                                            style={numberFieldStyle}
                                            type="number"
                                            onChange={(e) => { this.updateSelection(e.target.value, customId+ "_NUMBER",rightsPackage[0])} }
                                            value={rightsPackage[0].selectedRights[customId+ "_NUMBER"]}
                                            min={0}/>
                                    }
                                </div>
                            })}
                            </div>}

                        {!global && rightsPackage.map((rightPackage)=>{
                            if ( superRights.length > 0 && superRights.indexOf(rightPackage.shortLabel) === -1 ) return;

                            if (checkContentDelivery
                                    && id !== "CONTENT_DELIVERY"
                                    && ( rightPackage.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_NON_DEDICATED" ||
                                    rightPackage.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE" )
                                    //&& packagesAvailable.indexOf("LT") === -1
                            ){
                                return;
                            }
                            return this.renderModalRow(rightPackage)
                        })}
                        {showTextArea && ( showTextArea === "ALL" || this.hasSelection(id, showTextArea, rightsPackage)) &&
                        <textarea
                            placeholder={"Enter text to proceed"}
                            onChange={(e) => { this.updateSelectionInAllPackages(e.target.value, id+ "_TEXTAREA")}}
                            value={rightsPackage[0].selectedRights[id+ "_TEXTAREA"]}/>}

                        {showTextArea && showTextArea === "FURTHER_DETAILS" && rightsPackage && rightsPackage.length > 0 &&
                            <div>
                                <div style={{ fontWeight: 600, padding: "15px 0 5px"}}>Further details</div>
                                <textarea

                                    onChange={(e) => { this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE_DETAILS")}}
                                    value={rightsPackage[0].selectedRights["TECHNICAL_FEE_DETAILS"]}/>
                            </div>
                        }

                        {technicalFee && this.hasSelection(id, technicalFee, rightsPackage) && <div>
                            <div style={{ fontWeight: 600, padding: "15px 0 5px"}}>Technical fee</div>
                            <div>
                                <input
                                    style={{ width: '20px'}}
                                    defaultChecked={rightsPackage[0].selectedRights["TECHNICAL_FEE"]=== "INCLUDED"}
                                    type="radio"
                                    className="ca-radio"
                                    value={"INCLUDED"}
                                    onChange={(e) => { this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE")} }
                                    name="TECHNICAL_FEE"/> Technical fee included in license fee
                            </div>
                            <div>
                                <input
                                    style={{ width: '20px'}}
                                    checked={rightsPackage[0].selectedRights["TECHNICAL_FEE"] === "ON_TOP"}
                                    type="radio"
                                    className="ca-radio"
                                    value={"ON_TOP"}
                                    onChange={(e) => { this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE")} }
                                    name="TECHNICAL_FEE"/>
                                Technical fee charged on top of license fee
                                <input
                                    style={{ width: '40px', margin: '1px 10px'}}
                                    onChange={(e) => { this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE_PERCENTAGE")} }
                                    value={ rightsPackage[0].selectedRights["TECHNICAL_FEE_PERCENTAGE"] }
                                    type="number"
                                    max={100}
                                    min={0}
                                    onFocus={(e) => { this.updateSelectionInAllPackages("ON_TOP", "TECHNICAL_FEE")} }/>
                                % technical fee
                            </div>
                        </div>}


                    </div>
                </div>
            </div>

            <div className={"buttons"}>
                {this.showOkButton() && <button
                    className={"standard-button"}
                    onClick={this.togglePopup}>Ok</button>}
                {!this.showOkButton() && <button
                    className={"standard-button"}
                    disabled>Ok</button>}
            </div>

        </Modal>
    };

    showOkButton=()=>{
        const {name, multiple, options, id,  superRights, showTextArea, rightsPackage, technicalFee, global,
            language,
            languages} = this.props;

        let response = true;
        let contentDeliveryCounter = 0;

        if ( global && language ){
            return languages.length > 0
        }

        if ( showTextArea ){
            if (( showTextArea === "ALL" || this.hasSelection(id, showTextArea, rightsPackage))){
                if (!rightsPackage[0].selectedRights[id+ "_TEXTAREA"] || rightsPackage[0].selectedRights[id+ "_TEXTAREA"] === "" ) return false;
            }
        }

        if ( id === "CONTENT_DELIVERY"){
            rightsPackage.forEach(rp => {
                if ( rp.selectedRights[id] === "CONTENT_DELIVERY_NON_DEDICATED" ) contentDeliveryCounter++;
            })
            if ( rightsPackage.length === contentDeliveryCounter ) response = false;

        }

        if (rightsPackage && rightsPackage[0] && rightsPackage[0].selectedRights){
            rightsPackage.forEach(right => {
                if(RightItemsDefinitions[right.selectedRights[id]] &&
                    RightItemsDefinitions[right.selectedRights[id]].language ){
                    if  ( !right.selectedRights[id+ '_LANGUAGES']
                        || right.selectedRights[id+ '_LANGUAGES'].length === 0 ) {
                        response = false;
                    }
                }
            });

            rightsPackage.forEach(right => {
                if(RightItemsDefinitions[right.selectedRights[id]] &&
                    RightItemsDefinitions[right.selectedRights[id]].textField ){
                    if  ( !right.selectedRights[id+ '_TEXT']
                        || right.selectedRights[id+ '_TEXT'].length === 0 ) {
                        response = false;
                    }
                }
            });

        }
        return response;
    };

    render(){

        const {name, rightsPackage,programName, global, languages, checkContentDelivery} = this.props;
        let id = this.props.id;
        let custom = this.getSelection(id,  rightsPackage);
        let selected =  "";
        let packagesAvailable = rightsPackage.map(rp =>rp.shortLabel);
        let deliveryViaLiveFeed = rightsPackage.filter(rp =>rp.selectedRights.CONTENT_DELIVERY === "CONTENT_DELIVERY_LIVE");

        if ( deliveryViaLiveFeed.length > 0 && id !== "CONTENT_DELIVERY" && packagesAvailable.indexOf("LT") === -1 && checkContentDelivery ) id = "LIVE_FEED_" + id;

        if (rightsPackage.length > 0 ){
            if (id === "PROGRAM") {
                if (programName) {
                    selected = programName;
                }
            } else if (id === "CAMERA"){
                custom = custom || this.getSelection("CAMERAS",  rightsPackage);
                if (!custom) {

                    if ( rightsPackage[0].selectedRights[id] === "CAMERA_MINIMUM"){
                        selected = "Minimum cameras: " + rightsPackage[0].selectedRights["CAMERAS"];
                    } else {
                        selected = RightItemsDefinitions[rightsPackage[0].selectedRights[id]].label;
                    }
                }
            } else if (id === "EXPLOITATION_FORM" || id === "TRANSMISSION_MEANS"){

                if ( rightsPackage[0].selectedRights[id].length > 1 ) {
                    custom = true;
                } else {
                    selected = RightItemsDefinitions[rightsPackage[0].selectedRights[id][0]].label
                }

            }
            /*else if (id === "TECHNICAL_DELIVERY"){

                let programPackage = rightsPackage.filter(rp=>rp.shortLabel === "PR")[0];

                if ( rightsPackage.length > 1 ) {

                    if ( packagesAvailable.indexOf("PR") !== -1 ) {
                        if ( distributionMethod !== programPackage.selectedRights[id]){
                            custom = true;
                        } else {
                            selected = RightItemsDefinitions[distributionMethod].label
                        }
                    } else {
                        selected = RightItemsDefinitions[distributionMethod].label
                    }
                } else {
                    if ( packagesAvailable.indexOf("PR") !== -1 ) {
                        selected = RightItemsDefinitions[programPackage.selectedRights[id]].label
                    } else {
                        selected = RightItemsDefinitions[distributionMethod].label
                    }

                }

            }*/
            else if (global){

                if ( languages.length > 0 ) {
                    custom = true;
                } else {
                }

            }else {
                if (rightsPackage[0].selectedRights && RightItemsDefinitions[rightsPackage[0].selectedRights[id]]) {
                    selected = RightItemsDefinitions[rightsPackage[0].selectedRights[id]].label
                }
            }
        }

        return (
            <div className="base-input" style={{width: "49%"}}>
                <label>{name}</label>
                <input
                    type="text"
                    readOnly={true}
                    value={(custom) ? "Custom!" : selected }
                    className={(custom) ? "custom" : undefined}
                    placeholder={"Select"}
                    onClick={this.togglePopup}
                />
                <i className="fa fa-edit" onClick={this.togglePopup} />
                { this.renderModal() }
            </div>
        )
    }
}


export default PopupRight;