import "../Styles/Settings.css";
import { database } from "../firebase-config";
import { ref, onValue, remove } from "firebase/database";
import { useState } from "react";

function Settings() {
  let Images = [];
  //Lấy dữ liệu từ Database
  var getImage = ref(database, 'ImageInformation/' + 'Image');
  onValue(getImage, (snapshot) =>{
    snapshot.forEach(childSnapshot => {
        let Key = childSnapshot.key;
        let data = childSnapshot.val();
        Images.push(
        {
            "id": Key,
            "imgSrc": data.imgSrc,
            "content": data.content 
        });
    })
   })
   
  //Xử lý download
  const handleDownload = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "image.jpg";
    link.target = "_blank";
    link.click();
  };

  //Xử lý delete
  const [imageList, setImageList] = useState(Images);
  const handleDelete = (id) => {
    const updatedList = [...imageList];
    updatedList.splice(id, 1);
    setImageList(updatedList);
    remove(ref(database, `ImageInformation/Image/${id}`));
  };

    return (
      <div>
        <table id="infoTable">
        <thead>
          <tr>
            <th class="imgSrc">Ảnh</th>
            <th class="content">Nội dung</th>
            <th className="settings"></th>
          </tr>
        </thead>
        <tbody>
        {Images && Images.map((image, index) => (
            <tr key={index}>
              <td>
                <img className="picture" src={image.imgSrc} alt="Ảnh" />
              </td>
              <td className="rowContent">{image.content}</td>
              <td>
                <button className="btnDownload" onClick={() => handleDownload(image?.imgSrc)}>Download</button>
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
export {Settings}