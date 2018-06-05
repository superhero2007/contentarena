import React, { Component } from 'react';

const FileItem = ({item, onClick}) => (
    <div>
        {item.name} <i onClick={onClick} className="fa fa-close"></i>
    </div>
);

class FileSelector extends Component {

    constructor (props) {
        super(props);
        this.state = {
            form : new FormData()
        }
    };

    handleUploadFile = (event) => {
        const {isImage, onSelect} = this.props;
        let _this = this;

        this.state.form.append(event.target.files[0].size, event.target.files[0]);
        this.setState({
            form : this.state.form
        });


        if ( isImage ) {
            this.getBase64(event.target.files[0], (response) => {
                _this.setState({
                    image : response
                });

                if( onSelect ) onSelect("image", response);
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

        const {label, isImage} = this.props;
        const {image} = this.state;

        return (
            <div className="base-input">
                <label>{(label)?label:"Files"}</label>
                <button className="standard-button" onClick={()=>{ $("#input-" + this.props.target).trigger("click")  }}>Upload</button>
                <input
                    className="is-hidden"
                    onChange={this.handleUploadFile}
                    accept=".png,.jpg, .pdf, .doc, .docx"
                    id={"input-" + this.props.target}
                    type="file"
                    name={this.props.target + "[]"} />
                { !isImage && this.getItems().map((item, i)=>{
                    return <FileItem key={i} item={item} onClick={ () => this.remove(item.size)} />
                })}

                {
                    isImage && image &&
                        <img src={image} style={{width: 80, maxHeight: 48, marginLeft: 5}}/>
                }
            </div>
        )
    }
}

export default FileSelector;
