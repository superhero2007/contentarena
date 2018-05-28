import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {RightItemsDefinitions} from "./RightItemsDefinitions";
import {LanguageSelector} from "../../main/components/LanguageSelector";

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
        console.log("PopupRight - props",props);
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
        let isOpen = !this.state.isOpen;
        this.setState({isOpen});
    };

    updateSelection = (val, id,rightPackage) => {

        const rightsPackage = this.state.rightsPackage;
        rightPackage.selectedRights[id] = val;
        rightsPackage.set(rightPackage.id, rightPackage);

        this.props.onUpdate(rightsPackage);

    };

    getSelection = (id,  superRights) =>{

        let custom = false, selected;

        superRights.forEach( ( superRight ) => {
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
        const {name, multiple, options, id,  superRights, showTextArea, rightsPackage} = this.props;

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
                            {options.map((option)=> {
                                return <div className="column">
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
                                {options.map((option)=> {
                                    return <div className="column">
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
                                        {RightItemsDefinitions[option].textField && <input className="text-field" type="text"/>}
                                    </div>
                                })}
                            </div>
                        })}

                        {showTextArea && this.hasSelection(id, showTextArea, rightsPackage) && <textarea></textarea>}


                    </div>
                </div>
            </div>

            <div className={"buttons"}>
                <button
                    className={"standard-button"}
                    onClick={this.togglePopup}>Ok</button>
            </div>

        </Modal>
    };

    render(){

        const {name, id,  rightsPackage} = this.props;
        const custom = this.getSelection(id,  rightsPackage);
        const selected = (rightsPackage.length > 0 ) ? RightItemsDefinitions[rightsPackage[0].selectedRights[id]].label: "" ;
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