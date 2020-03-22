import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";

class MuiUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files) {
    this.setState({
      files: files
    });
    console.log(this.state.files);
  }

  handleSend = (e) => {
    e.preventDefault();
    console.log("SENT");
    console.log(this.state.files[0]);
  };

  handleSubmit2 = async (data2) => {
    // console.log("FileUpload.handleSubmit this.state.file", file);
    data2.preventDefault();
    const data = new FormData();
    data.append("files", this.state.files[0]);

    const upload_res = await axios({
      method: "POST",
      url: "http://localhost:1337/upload",
      data
    });

    console.log("FileUpload.handleSubmit upload_res", upload_res);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit2}>
        <div>
          <DropzoneArea onChange={this.handleChange.bind(this)} />
        </div>
        <button style={{ margin: "100px" }} type="submit">
          Send
        </button>
      </form>
    );
  }
}

export default MuiUploader;
