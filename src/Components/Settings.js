import { onValue, ref, remove, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useState, useContext } from "react";
import { database } from "../firebase-config";
import "../Styles/Settings.css";
import { UserContext } from './UserContext';

function Settings() {
  // const { user } = useContext(UserContext);
  const [imageList, setImageList] = useState([]);
  const LogDatabase = ref(database, 'LogHistory/Log');
  const auth = getAuth();
  const {uid} = auth.currentUser;
  let images = [];

    const getImage = ref(database, 'ImageInformation/Image');
    onValue(getImage, (snapshot) => {
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key;
        let data = childSnapshot.val();
        images.push({
          "id": key,
          "imgSrc": data.imgSrc,
          "content": data.content
        });
    })
   })

  //Xử lý download
  const handleDownload = (imageSrc, id) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image.jpg";
    link.target = "_blank";
    link.click();

    //Lưu hành động vào log
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
    const newAction = {
      time: formattedTime,
      action: `Tải 1 ảnh về máy. ID của ảnh được tải: ${id}`,
      user: uid,
    };
    push(LogDatabase, newAction);
  };

  // Xử lý delete
  const handleDelete = (id) => {
    const updatedList = imageList.filter(image => image.id !== id);
      setImageList(updatedList);
    remove(ref(database, `ImageInformation/Image/${id}`));

    //Lưu hành động vào log
    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
    const newAction = {
      time: formattedTime,
      action: `Xóa 1 ảnh khỏi database. ID ảnh bị xóa: ${id}`,
      user: uid,
    };
    push(LogDatabase, newAction);
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
          {images.map((image, index) => (
            <tr key={index}>
              <td>
                <img className="picture" src={image.imgSrc} alt="Ảnh" />
              </td>
              <td className="rowContent">{image.content}</td>
              <td>
                <button className="btnDownload" onClick={() => handleDownload(image.imgSrc,image?.id)}>Download</button>
                <button className="btnDelete" onClick={() => handleDelete(image.id)}>Delete</button>
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
