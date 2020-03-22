import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  }
}));

const Uploader = () => {
  const classes = useStyles();
  const { handleSubmit, register, control, reset, errors } = useForm();

  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [loading, setloading] = useState(false);
  const [submitted, setsubmitted] = useState(false);

  const handleChange = (event) => {
    console.log(
      "FileUpload.handleChange event.target.files",
      event.target.files
    );

    // this.setState({ file: event.target.files[0], submitted: false });
    setFile(event.target.files[0]);
    setsubmitted(false);
  };

  const handleSubmit2 = async (data2) => {
    // console.log("FileUpload.handleSubmit this.state.file", file);

    const data = new FormData();
    data.append("files", data2.image[0]);

    const upload_res = await axios({
      method: "POST",
      url: "http://localhost:1337/upload",
      data
    });
    // console.log(data2.image[0]);

    console.log("FileUpload.handleSubmit upload_res", upload_res);
    reset();
  };

  return (
    <div>
      <div className="FileUpload">
        <form onSubmit={handleSubmit(handleSubmit2)}>
          {/* <input name="image" type="file" ref={register({ required: true })} /> */}

          <Controller
            placeholder="Email"
            as={
              <DropzoneArea
                acceptedFiles={["application/pdf"]}
                showPreviewsInDropzone={true}
                maxFileSize={20000000}
              />
            }
            name="image"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.image && (
            <span style={{ color: "red" }}>Image is required</span>
          )}
          <hr />
          <input
            name="firstName"
            ref={register({ required: true, maxLength: 20 })}
          />

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Uploader;
