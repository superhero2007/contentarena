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
        this.state.form.append(event.target.files[0].size, event.target.files[0]);
        this.setState({
            form : this.state.form
        })
        // '/files' is your node.js route that triggers our middleware
        /* axios.post('/files', data).then((response) => {
             console.log(response); // do something with the response
         });*/
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

    render() {
        return (<div>
            <button onClick={()=>{ $("#input-" + this.props.target).trigger("click")  }}>Upload File</button>
            <input className="is-hidden"
                   onChange={this.handleUploadFile}
                   accept=".png,.jpg, .pdf, .doc, .docx"
                   id={"input-" + this.props.target}
                   type="file"  name={this.props.target + "[]"} />
                { this.getItems().map((item, i)=>{
                    return <FileItem key={i} item={item} onClick={ () => this.remove(item.size)} />
                })}
        </div>
        )
    }
}

export default FileSelector;
