import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ruleAPI } from "../controllers/ruleController";
import { factAPI } from "../controllers/factController";
import swalactive from "./swalfire";

function Editmodal({ isOpen, onClose, ruleData, categoryData ,onReceiveValue}) {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  // const [selectedOption2, setSelectedOption2] = useState("");
  const [opcause, setopCause] = useState("");
  const [opconclude, setopConclude] = useState("");
  const [cause, setCause] = useState([]);
  const [conclude, setConclude] = useState([]);
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    setLoading(true);
    factAPI.getAllType_fact(categoryData)
      .then((response) => {
        setFacts(response.data.data);
        setCause(ruleData.causeFacts);
        setConclude(ruleData.concludeFacts);
        setopCause(ruleData.operatorCause);
        setopConclude(ruleData.operatorConclude);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSelect = (event) => {
    const selectedValue = facts.find(
      (option) => option._id === event.target.value
    );
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

  const handleEditRule = () => {
    const causeIds = cause.map((item) => item._id);
    const concludeIds = conclude.map((item) => item._id);
    const data = {
      cause: causeIds,
      operatorCause: opcause,
      conclude: concludeIds,
      operatorConclude: opconclude,
    };
    console.log(data);
    ruleAPI
      .edit_rule(ruleData._id, data)
      .then(() => {
        onClose();
        onReceiveValue(new Date());
        swalactive("success", "Successfully added information");
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div
    className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className=" transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="flex w-full h-full ">
                  <div className="flex flex-col flex-1 px-8">
                    <label htmlFor="dropdown">เลือก Facts:</label>
                    <div className="flex w-full max-h-8">
                      <select
                        className="flex-1 rounded bg-gray-200"
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
                  <div className="flex flex-col flex-1 px-8">
                    <label htmlFor="dropdown">เลือก Conclusion:</label>
                    <div className="flex w-full max-h-8">
                      <select
                        className="flex-1 rounded bg-gray-200"
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
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={handleEditRule}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white 
                shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 
              py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editmodal;
