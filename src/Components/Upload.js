import { ref as dbRef, push } from 'firebase/database';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { useState } from "react";
import '../Styles/Upload.css';
import { app, database } from '../firebase-config';

function Upload() {
  const storage = getStorage(app)
  const [selectedImage, setSelectedImage] = useState(null);
  const imgDatabase = dbRef(database, 'ImageInformation/Image');
  const LogDatabase = dbRef(database, 'LogHistory/Log');
  const auth = getAuth();
  const {uid} = auth.currentUser;
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
        .then(() => {
          if(content !== ""){
          alert("Tệp tin đã được tải lên thành công!");
          getDownloadURL(storageRef)
          .then((url) => {
                const newImg = {
                    imgSrc: url,
                    content: content,
                };
                push(imgDatabase, newImg);

                //Lưu hành động vào log
                const currentTime = new Date();
                const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
                const newAction = {
                  time: formattedTime,
                  action: `Đăng tải 1 ảnh lên database.`,
                  user: uid,
                };
                push(LogDatabase, newAction);
          })
          }else{
            alert("Vui lòng nhập nội dung cho ảnh!");
          }
        })
        .catch((error) => {
            alert("Lỗi trong quá trình tải lên tệp tin:", error);
        });
    }
  };

  return (
    <div id="uploadMain">
      <div className="imgContainer">
      <img className="imgUpload" alt="" />
      </div>
      <input className='imgChosen' type="file" required onChange={handleImageUpload} />
      <p className='uploadtxt'>Nội dung ảnh</p>
      <input className='contentInput' type='text' required onChange={handleContent} />
      <button className='uploadBtn' onClick={() => handleUpload()}>UPLOAD</button>
    </div>
  );
}

export { Upload };
