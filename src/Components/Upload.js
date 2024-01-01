import '../Styles/Upload.css';
import { useState } from "react";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { database } from '../firebase-config';
import { ref as dbRef, push } from 'firebase/database';
import { app } from '../firebase-config';

function Upload() {
  const storage = getStorage(app)
  const [selectedImage, setSelectedImage] = useState(null);
  const imgDatabase = dbRef(database, 'ImageInformation/Image');
  const [content, setContent] = useState('');

  //Chọn file ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUpload = document.querySelector('.imgUpload');
      imgUpload.src = event.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  //Lấy dữ liệu nội dung ảnh
  const handleContent = (event) => {
    setContent(event.target.value);
  };

 //Đăng ảnh và nội dung
 const handleUpload = () => {
    if (selectedImage) {
      const imageName = selectedImage.name;
      const storageRef = ref(storage, `IMG-netsec/${imageName}`);
      
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => {
          alert("Tệp tin đã được tải lên thành công!");
          getDownloadURL(storageRef)
            .then((url) => {
                const newImg = {
                    imgSrc: url,
                    content: content,
                };
                push(imgDatabase, newImg);
            })
            .catch((error) => {
                console.log("Lỗi khi lấy đường dẫn tới ảnh:", error);
            });
        })
        .catch((error) => {
            alert("Lỗi trong quá trình tải lên tệp tin:", error);
        });
    }
  };

  return (
    <div id="uploadMain">
      <div className="imgContainer">
        <img className="imgUpload" />
      </div>
      <input className='imgChosen' type="file" required onChange={handleImageUpload} />
      <p className='uploadtxt'>Nội dung ảnh</p>
      <input className='contentInput' type='text' required onChange={handleContent} />
      <button className='uploadBtn' onClick={() => handleUpload()}>UPLOAD</button>
    </div>
  );
}

export { Upload };