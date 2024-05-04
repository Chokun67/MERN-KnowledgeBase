import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swalactive from "./swalfire";
import { ruleAPI } from "../controllers/ruleController";

function Addrule({ facts, category_id, onReceiveValue, addRuleControl }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [opcause, setopCause] = useState("");
  const [opconclude, setopConclude] = useState("");
  const [cause, setCause] = useState([]);
  const [conclude, setConclude] = useState([]);

  const handleSelect = (event) => {
    const selectedValue = facts.find(
      (option) => option._id === event.target.value
    );
    console.log(selectedValue);
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
      setSelectedOption("");
    }
  };

  const handleOptionChange = (event) => {
    setopCause(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setopConclude(event.target.value);
  };

  const handleAddRule = () => {
    if(category_id==null){
      swalactive("warning","Plese selected catrgory")
      return
    }
    const causeIds = cause.map((item) => item._id);
    const concludeIds = conclude.map((item) => item._id);
    const data = {
      cause: causeIds,
      operatorCause: opcause,
      conclude: concludeIds,
      operatorConclude: opconclude,
      category_id: category_id,
    };
    console.log(data);
    ruleAPI.add_rule(data)
      .then(() => {
        // navigate("/rules");
        // window.location.reload();
        // ทำสิ่งที่ต้องการกับค่าที่ได้รับ เช่น ส่งกลับไปยังคอมโพเนนต์หลัก
        
        handleSelectCategory(addRuleControl);
        handleStart();
        swalactive("success","Successfully added information")
      })
      .catch((error) => {
        console.log(error);
        swalactive("error","Failed to add information")
      });
  };

  const handleStart = () => {
    setCause([]);
    setConclude([]);
    setopCause("");
    setopConclude("");
  };
  const handleSelectCategory = (value) => {
    // ทำสิ่งที่ต้องการกับค่าที่ได้รับ เช่น ส่งกลับไปยังคอมโพเนนต์หลัก
    console.log(value);
    if (value == 0) {
      onReceiveValue(value + 1);
    } else {
      onReceiveValue(value - 1);
    }
  };

  const handleRemoveCause = (index) => {
    // สร้างรายการ cause ใหม่โดยลบสมาชิกที่มีดัชนีเป็น index ออกไป
    const updatedCause = cause.filter((item, idx) => idx !== index);
    setCause(updatedCause);
  };
  const handleRemoveConclude = (index) => {
    const updatedConclude = conclude.filter((item, idx) => idx !== index);
    setConclude(updatedConclude);
  };

  return (
    <>
      <div className="flex w-full h-full max-w-6xl flex-col lg:flex-row">
        <div className="flex flex-col flex-1 px-2">
          <label htmlFor="dropdown">เลือก Facts:</label>
          <div className="flex w-full max-h-8">
            <select
              className="flex-1 rounded"
              id="dropdown"
              onChange={handleSelect}
              value={selectedOption._id}
            >
              {facts.map((option, index) => (
                <option key={index + 1} value={option._id}>
                  {option.fact}
                </option>
              ))}
            </select>
            <button
              className="flex-4 ml-2 rounded-lg border border-solid border-gray-400 px-4 text-lg"
              onClick={handleAddData}
            >
              เพิ่ม
            </button>
          </div>
          <div className="h-28 overflow-auto bg-gray-100 m-2">
            {cause.map((item, index) => (
              <div
                key={index + 1}
                className="flex items-center justify-between border-b py-2"
              >
                <p>{item.fact}</p>
                <button
                  onClick={() => handleRemoveCause(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex w-full space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="radio-option"
                value="and"
                checked={opcause === "and"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">And</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="radio-option"
                value="or"
                checked={opcause === "or"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">Or</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="radio-option"
                value="none"
                checked={opcause === "none"}
                onChange={handleOptionChange}
              />
              <span className="ml-2">None</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col flex-1 px-2">
          <label htmlFor="dropdown">เลือก Conclusion:</label>
          <div className="flex w-full max-h-8">
            <select
              className="flex-1 rounded"
              id="dropdown"
              onChange={handleSelect}
              value={selectedOption._id}
            >
              {facts.map((option, index) => (
                <option key={index + 1} value={option._id}>
                  {option.fact}
                </option>
              ))}
            </select>
            <button
              className="flex-4 ml-2 rounded-lg border border-solid border-gray-400 px-4 text-lg"
              onClick={handleAddConclude}
            >
              เพิ่ม
            </button>
          </div>
          <div className="h-28 overflow-auto bg-gray-100 m-2">
            {conclude.map((item, index) => (
              <div
                key={index + 1}
                className="flex items-center justify-between border-b py-2"
              >
                <p>{item.fact}</p>
                <button
                  onClick={() => handleRemoveConclude(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex w-full space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="radio-option2"
                value="and"
                checked={opconclude === "and"}
                onChange={handleOptionChange2}
              />
              <span className="ml-2">And</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="radio-option2"
                value="or"
                checked={opconclude === "or"}
                onChange={handleOptionChange2}
              />
              <span className="ml-2">Or</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-500"
                name="radio-option2"
                value="none"
                checked={opconclude === "none"}
                onChange={handleOptionChange2}
              />
              <span className="ml-2">None</span>
            </label>
          </div>
        </div>
      </div>
      <button
        className="flex-4 ml-2 rounded-lg border border-solid border-gray-600 px-4 text-lg bg-blue-400"
        onClick={handleAddRule}
      >
        เพิ่มข้อมูลกฏ
      </button>
    </>
  );
}

export default Addrule;
