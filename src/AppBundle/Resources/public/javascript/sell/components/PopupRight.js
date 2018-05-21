import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../../main/styles/custom";
import {RightItemsDefinitions} from "./RightItemsDefinitions";
import {LanguageSelector} from "../../main/components/LanguageSelector";

class PopupRight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rightPackages: props.rightPackages || [],
            isOpen : false,
            selected : props.selected,
            custom : false
        };
    }

    componentWillReceiveProps(props){
        console.log("PopupRight - props",props);
        this.setState({
            rightPackages: props.rightPackages
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

    updateSelection = () => {
      this.setState({custom: true})
    };

    renderModal = () => {
        const {name, multiple, options, id,  superRights} = this.props;
        const {selected} = this.state;

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
                                            <input defaultChecked={selected === option}
                                                   onChange={this.updateSelection}
                                                    type="checkbox"
                                                    id={rightPackage.shortLabel + "_" + option}/>}
                                        {multiple &&
                                            <label htmlFor={rightPackage.shortLabel + "_" + option}/>}
                                        {!multiple &&
                                        <input
                                            defaultChecked={selected === option}
                                            type="radio"
                                            onChange={this.updateSelection}
                                            name={rightPackage.shortLabel + "_" + id} value={option}/>}

                                        {RightItemsDefinitions[option].language && <LanguageSelector/>}
                                        {RightItemsDefinitions[option].textField && <input className="text-field" type="text"/>}
                                    </div>
                                })}
                            </div>
                        })}
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

        const {name, selected} = this.props;
        const {custom} = this.state;
        return (
            <div className="base-input" style={{width: "49%"}}>
                <label>{name}</label>
                <input
                    type="text"
                    readOnly={true}
                    value={(custom) ? "Custom!" : RightItemsDefinitions[selected].label }
                    className={(custom) ? "custom" : undefined}
                    placeholder={"Select"}  />
                <i className="fa fa-edit" onClick={this.togglePopup} />
                { this.renderModal() }
            </div>
        )
    }
}

export default PopupRight;