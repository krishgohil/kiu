import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";
import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";


const initData = [

  {
    id: 1,
    imageUrl: "images/car1.jfif",
    croppedImageUrl: null,
  },
  {
    id: 2,
    imageUrl: "images/car2.png",
    croppedImageUrl: null,
  },
  {
    id: 3,
    imageUrl: "images/car3.png",
    croppedImageUrl: null,
  },
  {
    id: 4,
    imageUrl: "images/car4.png",
    croppedImageUrl: null,
  },
];

const ImageCropMain = ({ img, id, setImgFunc, index, seteditingImg, setdraggable_id, name }) => {


  // when data is not not null set editing to true and set the drag and drop functionality to false



  let init_data = [
    {
      id: id,
      imageUrl: URL.createObjectURL(img),
      croppedImageUrl: null,
    }
  ]

  const [cars, setCars] = useState(init_data);
  const [data, setdata] = useState(null)

  const onCancel = () => {
    setdata(null);
    seteditingImg(false)
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newCarsList = [...cars];
    const carIndex = cars.findIndex((x) => x.id === id);
    const car = cars[carIndex];
    const newCar = { ...car, croppedImageUrl, crop, zoom, aspect };
    newCarsList[carIndex] = newCar;
    setCars(newCarsList);
    setdata(null);
    setdraggable_id(name)
    seteditingImg(false)

  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
    seteditingImg(false)

  };

  const a = (e) => {
    // console.log(e.attr('src'))
    let b = document.getElementById('img')
    let c = (b.getAttribute('src'))
    console.log(URL.createObjectURL(img))
    console.log(c)
    let temp_data = {
      id: c,
      imageUrl: c,
      croppedImageUrl: null,
    }
    setdata(temp_data)
    seteditingImg(true)

  }



  useEffect(() => {
    console.log('rendered', img)
    console.log(cars)
    console.log(cars[0].imageUrl)
    // setImgFunc(cars[0].imageUrl)
  }, [img])


  return (
    <>
      <div style={{ zIndex: 999 }} >
        {data ? (
          <ImageCropDialog
            id={data.id}
            imageUrl={data.imageUrl}
            cropInit={data.crop}
            zoomInit={data.zoom}
            aspectInit={data.aspect}
            onCancel={onCancel}
            setCroppedImageFor={setCroppedImageFor}
            resetImage={resetImage}
            setImgFunc={setImgFunc}
            index={index}
          />
        ) : null}

        {cars.map((car, i) => (
          <>
            <div className="imageCard" key={i}>
              <img alt="img"
                style={{ borderRadius: '0.5rem', width: "10rem" }}
                src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}


              />

            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.2rem' }}>
              <button className="editPostImg"
                onClick={() => { console.log(car); setdata(car); seteditingImg(true) }} style={{ border: 'none', padding: '0.5rem', fontSize: '0.8rem ', paddingLeft: '1rem', paddingRight: '1rem', color: 'white', borderRadius: '1rem', backgroundColor: 'black', fontFamily: 'monospace', fontWeight: 'bold' }}>Edit</button>

              <div
                onClick={() => { console.log(car); setdata(car); seteditingImg(true) }}
                className="editPostImgIcon" style={{ border: 'none', padding: '0.5rem', fontSize: '0.8rem ', paddingLeft: '1rem', paddingRight: '1rem', color: 'white', borderRadius: '1rem', backgroundColor: 'black', fontFamily: 'monospace', fontWeight: 'bold' }}>
                <FaRegEdit size={20} />

              </div>
            </div>

          </>

        ))}

        {/* <div className="imageCard" >
          <img alt="img"
            src={URL.createObjectURL(img)}
            
            onClick={a} id="img"
          // onClick={() => {
          //   console.log(car);
          //   setdata(car);
          // }}
          />

        </div> */}


        {/* <img alt="img" src={URL.createObjectURL(img)} className="imageCard" onClick={a} id ="img"/>  */}
      </div>
    </>

  );
}

export default ImageCropMain;