import React, { useState,useEffect } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Fact = ({ facts }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBook = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/facts/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/data');
        window.location.reload(); // รีโหลดหน้าเว็บ
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        console.log(error);
      });
  };
  return (
    <div className='w-9/12'>
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
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/editfact/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <MdOutlineDelete className='text-2xl text-red-600' onClick={() => handleDeleteBook(book._id)}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fact;

