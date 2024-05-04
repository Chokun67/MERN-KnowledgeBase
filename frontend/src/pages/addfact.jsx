// import React, { useState,useEffect } from "react";
// import Navi from "../components/Navi";
// import { useNavigate ,useParams} from "react-router-dom";
// import swalactive from "../components/swalfire";
// import { factAPI } from "../controllers/factController";

// function addfact() {
//   const [fact, setfact] = useState("");
//   const [descliption, setdescliption] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [picture, setPicture] = useState(null);
//   const navigate = useNavigate();
//   const {id} = useParams();

//   const handleSaveFact = () => {
//     const formData = new FormData();
//     formData.append('fact', fact);
//     formData.append('descliption', descliption);
//     formData.append('file', picture);
//     formData.append('category_id', id);

//     setLoading(true);
//       try {
//       factAPI.add_fact(formData)
//         .then(() => {
//           setLoading(false);
//           navigate("/data");
//           swalactive("success","Successfully added information");
//         })
//       } catch (error) {
//         setLoading(false);
//         console.log(error);
//         swalactive("error","Failed to add information")
//       }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0]; // รับไฟล์ที่ผู้ใช้เลือก
//     setPicture(file);
//   };

 
//   return (
//     <div className="flex flex-col w-screen h-screen fixed top-0 left-0">
//       <Navi />
//       <div className="w-full h-full flex justify-center items-center bg-[#3F6C94]">
//         <div className="boxcenter">
//           <div className="login-container">
//             <h1 className="text-3xl flex-column">Create Book</h1>
//             <form className="login-form" >
//               <label className="text-xl mr-4 text-gray-500">fact</label>
//               <input
//                 type="text"
//                 value={fact}
//                 onChange={(e) => setfact(e.target.value)}
//                 className="border-2 border-gray-500 px-4 py-2 w-full"
//               />

//               <label className="text-xl mr-4 text-gray-500">descliption</label>
//               <input
//                 type="text"
//                 value={descliption}
//                 onChange={(e) => setdescliption(e.target.value)}
//                 className="border-2 border-gray-500 px-4 py-2  w-full "
//               />
//               <div className="flex-part1">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="inputStyle"
//                   name="file"
//                 />
//                 <div>
      
//                     {/* <img
//                       src={`http://localhost:5555/static/test.png`}
//                       alt="รูปภาพ"
//                     />
//              */}
//                 </div>
//                 {/* {selectedFile && (
//                   <div>
//                     <p>ไฟล์ที่เลือก: {selectedFile.name}</p>
//                     <img className=" w-12 h-12" src={URL.createObjectURL(selectedFile)} alt="รูปภาพ" /> 
//                   </div>
//                 )} */}
//               </div>
//               <div>
//                 <div className="flex w-full justify-center ">
//                   <button
//                     type="submit"
//                     className="bg-purple-300 rounded-lg border border-solid px-4 py-2"
//                     onClick={handleSaveFact}
//                   >
//                     save
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default addfact;
