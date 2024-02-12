import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Addrule({ facts }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [opcause, setopCause] = useState("");
  const [opconclude, setopConclude] = useState("");
  const [cause, setCause] = useState([]);
  const [conclude, setConclude] = useState([]);

  const handleSelect = (event) => {
    const selectedValue =  facts.find(option => option._id === event.target.value);
    console.log(selectedValue)
    setSelectedOption(selectedValue);
  };

  const handleAddData = () => {
    if (selectedOption) {
      setCause((prevCause) => [...prevCause, selectedOption]);
      setSelectedOption("");
    }
  };
  const handleAddConclude = () => {
    if (selectedOption) {
      setConclude((prevCause) => [...prevCause, selectedOption]);
      setSelectedOption2("");
    }
  };
 
  const handleOptionChange = (event) => {
    setopCause(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setopConclude(event.target.value);
  };

  const handleAddRule = () =>{
    const causeIds = cause.map((item) => item._id);
    const concludeIds = conclude.map((item) => item._id);
    const data = {
      cause: causeIds,
      operatorCause :opcause,
      conclude :concludeIds,
      operatorConclude :opconclude
    };
    console.log(data);
    axios.post("http://localhost:5555/rules", data)
    .then(() => {
      // navigate("/rules");
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
    <div className="flex w-full h-full ">
      <div className="flex flex-col flex-1 px-8">
        <label htmlFor="dropdown">เลือก Facts:</label>
        <div className="flex w-full max-h-8">
          <select className="flex-1 rounded" id="dropdown" onChange={handleSelect} value={selectedOption._id}>
          {facts.map((option, index) => (<option key={index + 1} value={option._id}>{option.fact}</option>))}
          </select>
          <button className="flex-4 ml-2 rounded-lg border border-solid border-gray-400 px-4 text-lg" onClick={handleAddData}>
            เพิ่ม
          </button>
        </div>
        <div className="h-28 overflow-auto bg-gray-100 m-2 p-2h-60">
          {cause.map((item, index) => (
            <p key={index+1}>{item.fact}</p>
          ))}
        </div>
        <div className="flex w-full space-x-4">
          <label className="inline-flex items-center">
            <input type="radio"className="form-radio text-red-500"name="radio-option" value="and" checked={opcause === 'and'}
            onChange={handleOptionChange}/>
            <span className="ml-2">And</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio"className="form-radio text-red-500"name="radio-option"value="or" checked={opcause === 'or'}
            onChange={handleOptionChange}/>
            <span className="ml-2">Or</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio"className="form-radio text-red-500"name="radio-option" value="none" checked={opcause === 'none'}
            onChange={handleOptionChange}/>
            <span className="ml-2">None</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col flex-1 px-8">
        <label htmlFor="dropdown">เลือก Conclusion:</label>
        <div className="flex w-full max-h-8">
          <select className="flex-1 rounded" id="dropdown" onChange={handleSelect} value={selectedOption._id}>
          {facts.map((option, index) => (<option key={index + 1} value={option._id}>{option.fact}</option>))}
          </select>
          <button className="flex-4 ml-2 rounded-lg border border-solid border-gray-400 px-4 text-lg" onClick={handleAddConclude}>
            เพิ่ม
          </button>
        </div>
        <div className="h-28 overflow-auto bg-gray-100 m-2 p-2h-60 ">
          {conclude.map((item, index) => (
            <p key={index}>{item.fact}</p>
          ))}
        </div>
        <div className="flex w-full space-x-4">
          <label className="inline-flex items-center">
            <input type="radio"className="form-radio text-red-500"name="radio-option2"value="and" checked={opconclude === 'and'}
            onChange={handleOptionChange2}/>
            <span className="ml-2">And</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio"className="form-radio text-red-500"name="radio-option2"value="or" checked={opconclude === 'or'}
            onChange={handleOptionChange2}/>
            <span className="ml-2">Or</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio"className="form-radio text-red-500"name="radio-option2" value="none" checked={opconclude === 'none'}
            onChange={handleOptionChange2}/>
            <span className="ml-2">None</span>
          </label>
        </div>
      </div>
    </div>
    <button className="flex-4 ml-2 rounded-lg border border-solid border-gray-400 px-4 text-lg" onClick={handleAddRule}>
    เพิ่มข้อมูลกฏ
  </button>
  </>
  );
}

export default Addrule;