import React, { useState, useEffect } from "react";
import Navi from "../components/Navi";
import { Link } from "react-router-dom";
import axios from "axios";

function Inference() {
  const [loading, setLoading] = useState(false);
  const [startinfer, setStartinfer] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInferenceComplete, setIsInferenceComplete] = useState(false);
  useEffect(() => {
    if (isInferenceComplete) {
      // กระบวนการเสร็จสิ้น, ทำอะไรก็ตามที่คุณต้องการหลังจากนั้น
      console.log("Inference complete!");
    }
  }, [isInferenceComplete]);
  const questions = [
    "This is one (y/n)",
    "This is two (y/n)",
    "This is three (y/n)",
    "This is four (y/n)",
    "This is five (y/n)",
  ];

  const handleResponse = (response) => {
    setResponses((prevResponses) => [
      ...prevResponses,
      `${questions[currentQuestionIndex]} ${response}`,
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsInferenceComplete(true);
    }
  };

  const inference = () => {
    setLoading(true);
    axios
      .get("http://localhost:5555/infer")
      .then((response) => {
        setStartinfer(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col w-screen fixed top-0 left-0">
      <Navi />
      <div className="bg-sky-200 w-60vw h-screen flex items-center flex-col px-32">
        <div className="w-full items-left">
          <p className="text-lg font-bold py-2">Inference by fact</p>
          <p className="text-base">
            Tp Insert a multiple fact use this systex to in put fact a,c,e in
            working memory
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => inference()}
          >
            Inference
          </button>
        </div>
        <div className="bg-black text-white w-full h-96 p-6 my-4 overflow-y-auto">
          {responses.map((response, index) => (
            <p key={index}>{response}</p>
          ))}
          {currentQuestionIndex < questions.length && (
            <div className="flex items-center">
              <p className="mr-2">{questions[currentQuestionIndex]}</p>
              <input
                type="text"
                className="bg-black text-white border-none p-2 focus:outline-none"
                placeholder="Type your response here..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const response = e.target.value.trim().toLowerCase();
                    if (response === "y" || response === "n") {
                      handleResponse(response);
                      e.target.value = "";
                    } else {
                      alert('Please enter either "y" or "n"');
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inference;
