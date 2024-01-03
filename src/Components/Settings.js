import { onValue, ref, remove } from "firebase/database";
import React, { useContext, useEffect, useState } from 'react';
import "../Styles/Settings.css";
import { database } from "../firebase-config";
import { UserContext } from './UserContext';

function Settings() {
  const { user } = useContext(UserContext);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const getImage = ref(database, 'ImageInformation/Image');
    onValue(getImage, (snapshot) => {
      const images = [];
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key;
        let data = childSnapshot.val();
        images.push({
          "id": key,
          "imgSrc": data.imgSrc,
          "content": data.content
        });
      });
      setImageList(images);
    });
  }, []);

  // Function to decode user.key into UID and role
  const decodeUserKey = (key) => {
    const decodedKey = atob(key);
    const [uid, role] = decodedKey.split('-');
    return { uid, role };
  };

  // Xử lý download
  const handleDownload = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image.jpg";
    link.target = "_blank";
    link.click();
  };

  // Xử lý delete
  const handleDelete = (id) => {
    const updatedList = imageList.filter(image => image.id !== id);
    setImageList(updatedList);
    remove(ref(database, `ImageInformation/Image/${id}`));
  };

  return (
    <div>
      <table id="infoTable">
        <thead>
          <tr>
            <th className="imgSrc">Ảnh</th>
            <th className="content">Nội dung</th>
            <th className="settings"></th>
          </tr>
        </thead>
        <tbody>
          {imageList.map((image, index) => (
            <tr key={index}>
              <td>
                <img className="picture" src={image.imgSrc} alt="Ảnh" />
              </td>
              <td className="rowContent">{image.content}</td>
              <td>
                <button className="btnDownload" onClick={() => handleDownload(image.imgSrc)}>Download</button>
                {user && user.key && (
                  // Decode user.key and check role
                  <button className="btnDelete" onClick={() => {
                    const { role } = decodeUserKey(user.key);
                    if (role === 'admin') {
                      handleDelete(image.id);
                    } else {
                      alert("You don't have permission to delete.");
                    }
                  }}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space"></div>
    </div>
  );
}

export { Settings };
