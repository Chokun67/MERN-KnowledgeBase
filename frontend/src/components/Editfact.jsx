// import React ,{useState,useEffect}from 'react'
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import Navi from './Navi';
// import { factAPI } from '../controllers/factController';

// function Editfact() {
//     const [fact, setfact] = useState('');
//     const [descliption, setdescliption] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [picture, setPicture] = useState(null);
//     const navigate = useNavigate();
//     const { id } = useParams();
  
//     useEffect(() => {
//       setLoading(true);
//       factAPI.getById_fact(id)
//       .then((response) => {
//           setdescliption(response.data.descliption);
//           setfact(response.data.fact)
//           setLoading(false);
//         }).catch((error) => {
//           setLoading(false);
//           alert('An error happened. Please Chack console');
//           console.log(error);
//         });
//     }, [])
    
//     const handleEditBook = () => {
//       const formData = new FormData();
//     formData.append('fact', fact);
//     formData.append('descliption', descliption);
//     formData.append('file', picture);
//       setLoading(true);
//       factAPI.edit_fact(id,formData)
//         .then(() => {
//           setLoading(false);
//           enqueueSnackbar('Book Edited successfully', { variant: 'success' });
//           navigate('/data');
//         })
//         .catch((error) => {
//           setLoading(false);
//           // alert('An error happened. Please Chack console');
//           enqueueSnackbar('Error', { variant: 'error' });
//           console.log(error);
//         });
//     };

//     const handleFileChange = (event) => {
//       const file = event.target.files[0]; // รับไฟล์ที่ผู้ใช้เลือก
//       setPicture(file);
//     };

//   return (
//     <div className="flex flex-col w-screen h-screen fixed top-0 left-0">
//       <Navi />
//       <div className="w-full h-full flex justify-center items-center bg-[#3F6C94]">
//       <div className="boxcenter">
//         <div className="login-container">
//         <h1 className="text-3xl flex-column">Edit fact</h1>
//         <form className="login-form">
//           <label className="text-xl mr-4 text-gray-500">fact</label>
//           <input
//             type="text"
//             value={fact}
//             onChange={(e) => setfact(e.target.value)}
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//           />

//           <label className="text-xl mr-4 text-gray-500">descliption</label>
//           <input
//             type="text"
//             value={descliption}
//             onChange={(e) => setdescliption(e.target.value)}
//             className="border-2 border-gray-500 px-4 py-2  w-full "
//           />
//           <div className="flex-part1">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="inputStyle"
//                   name="file"
//                 />
//           </div>
//           <button
//             type="submit"
//             className="login-button"
//             onClick={handleEditBook}>
//             save
//           </button>
//         </form>
//         </div>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default Editfact