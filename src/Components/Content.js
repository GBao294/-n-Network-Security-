import { onValue, ref } from "firebase/database";
import "../Styles/Content.css";
import { database } from "../firebase-config";

function Content() {
  let Images = [];
  
  //Lấy dữ liệu từ Database
  var getImage = ref(database, 'ImageInformation/Image');
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

    return (
      <div>
        <table id="infoTable">
        <thead>
          <tr>
            <th class="imgSrc">Ảnh</th>
            <th class="content">Nội dung</th>
          </tr>
        </thead>
        <tbody>
        {Images && Images.map((image, index) => (
            <tr key={index}>
              <td>
                <img className="picture" src={image?.imgSrc} alt="Ảnh" />
              </td>
              <td className="rowContent">{image?.content}</td>
            </tr>
          ))}
        </tbody>
       </table>
       <div className="space"></div>
      </div>
    );
}
export { Content };

