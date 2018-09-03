import React, { Component } from 'react';
import {PropTypes} from "prop-types";
import HeaderBar from "./HeaderBar";

const FileItem = ({item, onClick}) => (
    <div style={{
        border: '1px solid lightgray',
        padding: 10,
        marginTop: 5,
        cursor : 'normal'
    }}>
        {item.name} <img style={{ right: 10, position: 'absolute', cursor: 'pointer'}} src={assetsBaseDir + "app/images/cancel.png"} onClick={onClick}/>
    </div>
);

const InvalidFileItem = ({item, onClick}) => (
    <div style={{
        border: '1px solid red',
        padding: 10,
        marginTop: 5,
        cursor : 'normal',
        color: "red"
    }}>
        {item} has an invalid format <img style={{ right: 10, position: 'absolute', cursor: 'pointer'}} src={assetsBaseDir + "app/images/cancel.png"} onClick={onClick}/>
    </div>
);

const imageStyle = {
    maxHeight: 250,
    marginBottom: 5,
    marginTop: 10
};

class FileSelector extends Component {

    constructor (props) {
        super(props);

        let form = new FormData();

        this.state = {
            failed: [],
            form : form,
            uploading : false,
            accept : props.accept || [".png", ".jpg"]
        }
    };

    handleUploadFile = (event) => {
        const {isImage, onSelect, target, tmp} = this.props;
        let _this = this;

        this.state.form.append(event.target.files[0].size, event.target.files[0]);
        this.setState({
            form : this.state.form
        });

        if ( tmp ) {
            this.setState({ uploading : true});

            ContentArena.ContentApi.saveTmpFile(event.target.files).then((response)=>{

                if (response.success){
                    if( onSelect ) onSelect( response  );
                    this.setState({ uploading : false});
                } else {
                    this.setState((prev) => {
                        return {
                            failed : [...prev.failed, response.name],
                            uploading : false
                        }
                    });
                }
            });

        }

        if ( isImage ) {
            this.getBase64(event.target.files[0], (response) => {
                _this.setState({
                    image : response
                });

                if( onSelect ) {
                    onSelect(target, response);
                    onSelect("image", null);
                }

            })
        }
    };

    getItems = () => {
        let list = [];
        for (let value of this.state.form.values()) {
            list.push( value );
        }
        return list;
    };

    remove = (name) => {
        this.state.form.delete(name);
        this.setState({form:this.state.form});
    };

    removeFailed = (index) => {
        this.setState((prev) =>{
            prev.failed.splice(index, 1);

            return {
                failed : prev.failed
            }
        });
    };

    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    render() {

        const {label, isImage, previousImage, selected, onRemove} = this.props;
        const {image, uploading, failed} = this.state;

        return (
            <div className="base-input custom-selector" style={{flexDirection: 'column'}}>
                <div style={{display: 'flex'}}>
                    <label>{(label)?label:"Files"}</label>
                    <button
                        className="standard-button"
                        disabled={uploading}
                        onClick={()=>{ $("#input-" + this.props.target).trigger("click")  }}>
                        {this.context.t("Upload")}
                    </button>
                    <input
                        className="is-hidden"
                        onChange={this.handleUploadFile}
                        accept={this.state.accept.join(", ")}
                        id={"input-" + this.props.target}
                        type="file"
                        name={this.props.target + "[]"} />
                    {uploading && <i className="fa fa-cog fa-spin"/>}
                </div>
                <div>
                    { failed && failed.map((item, i)=>{
                        return <InvalidFileItem key={"failed" +i} item={item} onClick={ () => this.removeFailed(i)} />
                    })}

                    {
                        selected && selected.length > 0 && selected.map((s, i ) => {
                            return <FileItem key={"key-" + i} item={{name: s.name}} onClick={onRemove} />
                        })
                    }

                    {
                        isImage && image &&
                        <img src={image} style={imageStyle}/>
                    }

                    {
                        previousImage &&
                        <img src={assetsBaseDir + "../"  + previousImage}
                             style={imageStyle}/>
                    }
                </div>
            </div>
        )
    }
}

FileSelector.contextTypes = {
    t: PropTypes.func.isRequired
};


export default FileSelector;
