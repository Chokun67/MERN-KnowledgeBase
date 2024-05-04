import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { factAPI } from "../controllers/factController";
import Swal from "sweetalert2";
import FactmodalEdit from "./FactmodalEdit";
FactmodalEdit

const Fact = ({ facts ,onReceiveValue}) => {
  const [loading, setLoading] = useState(false);
  const [factId, setFactId] = useState("");
  const navigate = useNavigate();

  const handleDeleteFact = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        factAPI.delete_fact(id)
          .then(() => {
            setLoading(false);
            navigate("/data");
            onReceiveValue(new Date());
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    });
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = (fact_id) => {
    setFactId(fact_id)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleReceiveFact=(value) =>{
    onReceiveValue(value)
  }
  
  return (
    <div className="w-9/12 min-h-96 h-96 bg-white overflow-auto">
      <FactmodalEdit
          isOpen={isModalOpen}
          onClose={closeModal}
          factid={factId}
          onReceiveValue={handleReceiveFact}
        />
      {facts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Facts</th>
              <th>Descliption</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {facts.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.fact}</td>
                <td>{book.descliption}</td>
                <td>
                  <div className="flex justify-center gap-x-4">
                    {/* <Link to={`/editfact/${book._id}`}> */}
                      <AiOutlineEdit className="text-2xl text-yellow-600" 
                      onClick={()=>openModal(book._id)}/>
                    {/* </Link> */}
                    <MdOutlineDelete
                      className="text-2xl text-red-600 cursor-pointer"
                      onClick={() => handleDeleteFact(book._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-full w-full flex flex-col">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Facts</th>
                <th>Descliption</th>
                <th>Edit</th>
              </tr>
            </thead>
          </table>
          <div className="h-full flex justify-center items-center text-lg">
            Plese select category
          </div>
        </div>
      )}
    </div>
  );
};

export default Fact;
