import { onValue, ref } from "firebase/database";
import "../Styles/Content.css";
import { database } from "../firebase-config";

function Content() {
  let Images = [];
  //Lấy dữ liệu từ Database
<<<<<<< HEAD
  // eslint-disable-next-line no-useless-concat
  var getImage = ref(database, 'ImageInformation/Image');

=======
  var getImage = ref(database, 'ImageInformation/Image');
>>>>>>> 2a6e247fc361a446b26ea2f53128bd98a46a6efb
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
<<<<<<< HEAD
export { Content };

=======
export {Content}
>>>>>>> 2a6e247fc361a446b26ea2f53128bd98a46a6efb
