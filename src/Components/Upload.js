import { ref as dbRef, push } from 'firebase/database';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useState } from 'react';
import '../Styles/Upload.css';
import { app, database } from '../firebase-config';
import { UserContext } from './UserContext';

function Upload() {
  const { user } = useContext(UserContext);
  const storage = getStorage(app)
  const [selectedImage, setSelectedImage] = useState(null);
  const imgDatabase = dbRef(database, 'ImageInformation/Image');
  const [content, setContent] = useState('');

  // Function to decode user.key into UID and role
  const decodeUserKey = (key) => {
    const decodedKey = atob(key);
    const [uid, role] = decodedKey.split('-');
    return { uid, role };
  };

  // Chọn file ảnh
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

  // Lấy dữ liệu nội dung ảnh
  const handleContent = (event) => {
    setContent(event.target.value);
  };

  // Đăng ảnh và nội dung
  const handleUpload = () => {
    if (selectedImage) {
      const imageName = selectedImage.name;
      const storageRef = ref(storage, `IMG-netsec/${imageName}`);
      uploadBytes(storageRef, selectedImage)
        .then(() => {
          if (content !== "") {
            alert("Tệp tin đã được tải lên thành công!");
            getDownloadURL(storageRef)
              .then((url) => {
                // Decode user.key and check role
                const {role } = decodeUserKey(user.key);
                if (role === 'admin') {
                  const newImg = {
                    imgSrc: url,
                    content: content,
                  };
                  push(imgDatabase, newImg);
                } else {
                  alert("Bạn không có quyền truy cập tính năng này.");
                }
              })
          } else {
            alert("Vui lòng nhập nội dung cho ảnh!");
          }
        })
        .catch((error) => {
          alert("Lỗi trong quá trình tải lên tệp tin:", error);
        });
    }
  };
  if (!user || decodeUserKey(user.key).role !== 'admin') {
    return (
      <div>
        <p>Chỉ có admin mới có quyền truy cập tính năng này.</p>
        {/* {user && <p>User Key: {user.key}</p>}
        {user && <p>User Role: {decodeUserKey(user.key).role}</p>} */}
      </div>
    );
  } else {
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
}

export { Upload };
