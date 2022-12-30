import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { MdStayCurrentPortrait, MdOutlineStayCurrentLandscape, MdOutlineCropSquare } from 'react-icons/md';


const aspectRatios = [

  // { value: 9 / 16, text: "9/16" },
  { value: 4 / 5, text: "4/5" },
  { value: 1 / 1, text: "1/1" },
  { value: 16 / 9, text: "16/9" },
];

const ImageCropDialog = ({
  id,
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  resetImage,
  setImgFunc,
  index
}) => {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const value = e.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels, 0, setImgFunc,index);
    console.log(croppedImageUrl)
    setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
  };

  const onResetImage = () => {
    resetImage(id);
  };

  const a = (e) => {
    console.log(e.target.id)

    if (e.target.id === '4to5') {
      const value = 4 / 5;
      const ratio = aspectRatios.find((ratio) => ratio.value == value);
      console.log(aspect.value)
      setAspect(ratio);
    }
    else if (e.target.id === '1to1') {
      const value = 1 / 1;
      const ratio = aspectRatios.find((ratio) => ratio.value == value);
      console.log(aspect.value)

      setAspect(ratio);
    }
    else if (e.target.id === '16to9') {
      const value = 16 / 9;
      console.log(aspect.value)

      const ratio = aspectRatios.find((ratio) => ratio.value == value);
      setAspect(ratio);
    }
  }

  return (
    <div style={{ zIndex: 999 }}>
      <div className="backdrop"></div>
      <div className="crop-container">
        <Cropper
          image={imageUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspect.value}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            className="slider"
          ></input>
          {/* <BiRectangle color='white' />
          <IoTabletLandscapeOutline color='white' /> */}
          <MdStayCurrentPortrait size={20} onClick={a} value='b' id='4to5' style={{ marginLeft: "0.5rem" }}
            className={aspect.value == 0.8 ? 'activeRatio' : 'ratioBtn'} />
          <MdOutlineCropSquare size={20} id='1to1' onClick={a} style={{ marginLeft: "0.5rem" }} className={aspect.value == 1 ? 'activeRatio' : 'ratioBtn'} />
          <MdOutlineStayCurrentLandscape size={20} id='16to9' onClick={a} style={{ marginLeft: "0.5rem" }} className={aspect.value == 1.7777777777777777 ? 'activeRatio' : 'ratioBtn'} />

          {/* <select onChange={onAspectChange} multiple='multiple'  >
            {aspectRatios.map((ratio) => (
              <option
                key={ratio.text}
                value={ratio.value}
                selected={ratio.value === aspect.value}
              >
                {ratio.text}
              </option>
            ))}
          </select> */}
        </div>
        <div className="button-area">
          <button className="aspectBtn" onClick={onCancel}>Cancel</button>
          <button className="aspectBtn" onClick={onResetImage}>Reset</button>
          <button className="aspectBtn" onClick={onCrop}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropDialog;