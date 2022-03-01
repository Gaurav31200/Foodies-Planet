import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";

import Button from "../Button/Button";

export default function ImageUpload(props) {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const imageRef = useRef();
  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result); //Execute after ls 19
    };
    fileReader.readAsDataURL(image);
  }, [image]);
  const imageHandler = () => {
    imageRef.current.click();
  };
  const pickedHandler = (event) => {
    let pickedImage;
    let imageIsValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedImage = event.target.files[0];
      setImage(pickedImage);
      setIsValid(true);
      imageIsValid = true;
    } else {
      setIsValid(false);
      imageIsValid = false;
    }
    props.onInput(props.id, pickedImage, imageIsValid);
  };
  return (
    <div className="form-control">
      <input
        ref={imageRef}
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Select an Image</p>}
        </div>
        <Button type="button" onClick={imageHandler}>
          Add Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}
