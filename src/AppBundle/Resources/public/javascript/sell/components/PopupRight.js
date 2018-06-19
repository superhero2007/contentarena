import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {RightItemsDefinitions} from "./RightItemsDefinitions";
import {LanguageSelector} from "../../main/components/LanguageSelector";

const numberFieldStyle = { width: '30px', paddingLeft: '10px'};

class PopupRight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rightsPackage : new Map(props.rightsPackage.map((i) => [i.id, i])),
            isOpen : false,
            selected : props.selected,
            custom : false,
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

    getProgramsName = () => {
        return this.props.programs.filter(program =>(program.saved)).map(program => (program.name));
    };

    showProgramColumns = (rightPackage) => {
        return (rightPackage.shortLabel!=="PR"|| ( rightPackage.shortLabel==="PR" && this.getProgramsName().length === 0 ));
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

    renderModal = () => {
        const {name, multiple, options, id,  superRights, showTextArea, rightsPackage, technicalFee} = this.props;

        return <Modal
            isOpen={this.state.isOpen}
            bodyOpenClassName={"selector"}
            style={customStyles}
        >

            <div className="modal-title">
                Edit {name}
                <i className="fa fa-times-circle-o" onClick={this.togglePopup}/>
            </div>

            <div className="step-content">
                <div className="step-content-container">
                    <div className="modal-table">
                        <div className="row row-header">
                            <div className="column" style={{justifyContent:"flex-start", flex: 3}}/>
                            {options.map((option, i , list)=> {
                                let flex = (list.length > 2 ) ? 2 : 3;
                                if (RightItemsDefinitions[option].language) flex = flex+ 2;
                                return <div className="column" style={{ flex: flex }}>
                                    {RightItemsDefinitions[option].label && RightItemsDefinitions[option].label}
                                </div>
                            })}
                        </div>

                        {this.props.rightsPackage.map((rightPackage)=>{

                            if ( superRights.length > 0 && superRights.indexOf(rightPackage.shortLabel) === -1 ) return;

                            return <div className="row">
                                <div className="column" style={{justifyContent:"flex-start", flex: 3}}>
                                    {rightPackage.name}
                                </div>
                                {options.map((option, i ,list)=> {

                                    let flex = (list.length > 2 ) ? 2 : 3;
                                    if (RightItemsDefinitions[option].language) flex = flex+ 2;

                                    return <div className="column" style={{ flex: flex }}>
                                        {multiple &&
                                            <input defaultChecked={rightPackage.selectedRights[id] === option}
                                                   onChange={(e) => { this.updateSelection(option, id,rightPackage)} }
                                                    type="checkbox"
                                                    id={rightPackage.shortLabel + "_" + option}/>}
                                        {multiple &&
                                            <label htmlFor={rightPackage.shortLabel + "_" + option}/>}
                                        {!multiple &&
                                        <input
                                            defaultChecked={rightPackage.selectedRights[id] === option}
                                            type="radio"
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
                                    value={"INCLUDED"}
                                    onChange={(e) => { this.updateSelectionInAllPackages(e.target.value, "TECHNICAL_FEE")} }
                                    name="TECHNICAL_FEE"/> Technical fee included in license fee
                            </div>
                            <div>
                                <input
                                    style={{ width: '20px'}}
                                    checked={rightsPackage[0].selectedRights["TECHNICAL_FEE"] === "ON_TOP"}
                                    type="radio"
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
        const {name, multiple, options, id,  superRights, showTextArea, rightsPackage, technicalFee} = this.props;

        let response = true;

        if ( showTextArea ){
            if (( showTextArea === "ALL" || this.hasSelection(id, showTextArea, rightsPackage))){
                if (!rightsPackage[0].selectedRights[id+ "_TEXTAREA"] || rightsPackage[0].selectedRights[id+ "_TEXTAREA"] === "" ) return false;
            }
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

        const {name, id,  rightsPackage,programs} = this.props;
        let custom = this.getSelection(id,  rightsPackage);
        let selected =  "";

        if (rightsPackage.length > 0 ){
            if (id === "PROGRAM") {
                if (programs.length > 0) {
                    selected = programs[0].name;
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
            }else {
                if (rightsPackage[0].selectedRights) {
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
                    placeholder={"Select"}  />
                <i className="fa fa-edit" onClick={this.togglePopup} />
                { this.renderModal() }
            </div>
        )
    }
}


export default PopupRight;