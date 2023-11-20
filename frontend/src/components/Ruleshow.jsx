import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function Ruledata({ knowledge }) {

  return (
    <>
    <div className="flex w-full h-full justify-center items-center mt-8">
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
          {knowledge.map((knowledge, index) => (
            <tr >
              <td>a</td>
              <td>a</td>
              <td>b</td>
              <td>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/editfact/`}>
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
    </div>
  </>
  );
}

export default Ruledata;
