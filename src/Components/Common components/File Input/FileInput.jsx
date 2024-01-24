/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../Input/Input";
// eslint-disable-next-line react/prop-types

const FileInput = ({ id, name, callback, accept }) => {
  //useState to check if file selected
  const [selected, setStatus] = useState(false);

  // To handel File Input
  function handelFileInput(e) {
    e.target.files.length > 0 ? setStatus(e.target.files[0]) : setStatus(false);

    if (name === "Banner") {
      callback({ type: "BANNER", payLoad: e.target.files[0] });
    } else if (name === "Small") {
      callback({ type: "SMALL", payLoad: e.target.files[0] });
    } else if (name === "Audio") {
      callback({ type: "AUDIO", payLoad: e.target.files[0] });
    }
    else if(name === "Profile"){
      callback({ type: "PROFILE", payLoad: e.target.files[0]})
    }
  }

  return (
    <>
      <label htmlFor={id} className="Input-Label">
        {!selected && name === "Banner" ? `Select a ${name} image` : ""}
        {!selected && name === "Small" ? `Select a ${name} image` : ""}
        {!selected && name === "Audio" ? `Select an ${name} file` : ""}
        {!selected && name === "Profile" ? `Select a ${name} image` : ""}
        {selected ? `File ${selected.name} was selected` : ""}
      </label>

      <Input
        type={"file"}
        id={id}
        accept={accept}
        style={{ display: "none" }}
        onInput={handelFileInput}
      />
    </>
  );
};

export default FileInput;
