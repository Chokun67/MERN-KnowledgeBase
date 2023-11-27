import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Modal from '../components/Editmodal';

function Ruledata({ knowledge }) {
  const [loading, setLoading] = useState(false);
  const [selectedrule, setSelectedrule] = useState(null);
  const navigate = useNavigate();

  const handleDeleteBook = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/rules/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/rules');
        window.location.reload(); // รีโหลดหน้าเว็บ
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        console.log(error);
      });
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = (index) => {
    setSelectedrule(knowledge[index]);
    setModalOpen(true);
    console.log(selectedrule);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <div className="flex w-full h-full justify-center items-center mt-8">
      <Modal isOpen={isModalOpen} onClose={closeModal} ruleData={selectedrule}/>
    <div className='w-9/12'>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Cause</th>
            <th>opCause</th>
            <th>Conclude</th>
            <th>opConclude</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {knowledge.map((knowledge, index) => (
            <tr key={knowledge._id}>
              <td>{index + 1}</td>
              <td>{knowledge.causeFacts.map((fact, index) => (
                <React.Fragment key={index}>
                  {fact.fact}{index !== knowledge.causeFacts.length - 1 && <br />}
                </React.Fragment>))}
              </td>
              <td>{knowledge.operatorCause}</td>
              <td>{knowledge.concludeFacts.map((fact,index) => (
                fact.fact))}</td>
              <td>{knowledge.operatorConclude}</td>
              <td>
                <div className='flex justify-center gap-x-4'>
                  <AiOutlineEdit className='text-2xl text-yellow-600 cursor-pointer' onClick={()=>openModal(index)}/>
                  <MdOutlineDelete className='text-2xl text-red-600 cursor-pointer' onClick={() => handleDeleteBook(knowledge._id)}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </>
  );
}

export default Ruledata;
