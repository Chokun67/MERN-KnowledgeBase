import React, { useState, useEffect } from "react";
import Navi from "../components/Navi";
import { Link } from "react-router-dom";
import axios from "axios";

function Inference() {
  const [loading, setLoading] = useState(false);
  const [startinfer, setStartinfer] = useState([]);
  const [questionrule, setQuestionrule] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [workmemo_F, setWorkmemo_F] = useState([]);
  const [workmemo_T, setWorkmemo_T] = useState([]);
  const [inputValue, setInputValue] = useState(""); // สร้าง state เพื่อเก็บค่าจากช่องกรอกข้อมูล

  const handleResponse = async (response) => {
    setResponses((prevResponses) => [
      ...prevResponses,
      `${questionrule[currentQuestionIndex].fact} : ${response}`,
    ]);

    if (response == "y") {
      setWorkmemo_T((prevResponses) => [
        ...prevResponses,
        questionrule[currentQuestionIndex]._id,
      ]);
      setQuestionrule([]);
      setCurrentQuestionIndex(0);
    } else {
      setWorkmemo_F((prevResponses) => [
        ...prevResponses,
        questionrule[currentQuestionIndex]._id,
      ]);
      setQuestionrule([]);
      setCurrentQuestionIndex(0);
    }
  };
  useEffect(() => {
    if (workmemo_T.length > 0 || workmemo_F.length > 0) {
      Inferengine2();
    }
  }, [workmemo_T, workmemo_F]);

  const Inferengine2 = () => {
    setLoading(true);
    const requestData = {
      workmemo_F: workmemo_F,
      workmemo_T: workmemo_T,
    };
    axios
      .post("http://localhost:5555/infer/test2", requestData)
      .then((response) => {
        if (response.data && response.data.fact) {
          setQuestionrule([response.data]);
          setLoading(false);
        } else if (response.data && response.data.answerfinal) {
          if (response.data.answerfinal.length < 1) {
            setQuestionrule([]);
            setResponses((prevResponses) => [
              ...prevResponses,
              "result not found",
            ]);
          } else {
            setQuestionrule([]);
            setResponses((prevResponses) => [
              ...prevResponses,
              `result is ${response.data.answerfinal
                .map((obj) => obj.fact)
                .join(", ")}`,
            ]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // อัปเดต state ของช่องกรอกข้อมูลเมื่อมีการเปลี่ยนแปลง
  };

  const handleButtonClick = () => {
    setLoading(true);
    setResponses([]);
    setQuestionrule([]);
    if (inputValue.trim() !== "") {
      const valuesArray = inputValue.split(",").map((value) => value.trim());
      // เพิ่มค่าใหม่ลงในอาร์เรย์เมื่อคลิกปุ่ม
      // setInputValue(''); // ล้างค่าในช่องกรอกข้อมูล
      const queryParams = valuesArray.join("&data[]=");
      axios
        .get(`http://localhost:5555/infer/check?data[]=${queryParams}`)
        .then((response) => {
          // Inferengine2();
          console.log(response.data);
          const _idArray = response.data.foundRules.map((item) => item._id);
          setWorkmemo_T(_idArray);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      Inferengine2();
    }
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
          <div className="flex items-center space-x-4 w-full">
            <div className="my-4 w-full">
              <input
                type="text"
                id="username"
                name="username"
                value={inputValue}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleButtonClick()}
            >
              Inference
            </button>
          </div>
        </div>
        <div className="bg-black text-white w-full h-96 p-6 my-4 overflow-y-auto">
          {responses.map((response, index) => (
            <p key={index}>{response}</p>
          ))}
          {currentQuestionIndex < questionrule.length && (
            <div className="flex items-center">
              <p className="mr-2">
                {questionrule[currentQuestionIndex].fact} :
              </p>
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
