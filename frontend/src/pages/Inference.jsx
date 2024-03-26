import React, { useState, useEffect } from "react";
import Navi from "../components/Navi";
import { Link } from "react-router-dom";
import Category from "../components/category";
import axios from "axios";

function Inference() {
  const [loading, setLoading] = useState(false);
  const [questionrule, setQuestionrule] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [workmemo_F, setWorkmemo_F] = useState([]);
  const [workmemo_T, setWorkmemo_T] = useState([]);
  const [inputValue, setInputValue] = useState(""); // สร้าง state เพื่อเก็บค่าจากช่องกรอกข้อมูล
  const [responsesY, setResponsesY] = useState([]); // result form user what day chose
  const [finalresult, setFinalresult] = useState([]); // ตัวรับข้อมูลจาก response
  const [categoryValue, setcategoryValue] = useState(null); //select category
  const handleResponse = async (response) => {
    setResponses((prevResponses) => [
      ...prevResponses,
      `${questionrule[currentQuestionIndex].fact} : ${response}`,
    ]);
    setResponsesY((preRes) => [...preRes, response]);

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
      .post("http://localhost:5555/infer/test3", requestData)
      .then((response) => {
        if (response.data && response.data.fact) {
          setQuestionrule([response.data]);
          console.log("test555", response.data);
          setLoading(false);
        } else if (response.data && response.data.answerfinal) {
          if (response.data.answerfinal.length < 1) {
            setQuestionrule([]);
            setFinalresult(["R"]);
            setWorkmemo_F([]);
            setWorkmemo_T([]);
          } else {
            setQuestionrule([]);
            setFinalresult(response.data.answerfinal);
            console.log(response.data.answerfinal);
            setWorkmemo_F([]);
            setWorkmemo_T([]);
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
    setWorkmemo_F([]);
    setWorkmemo_T([]);
    setFinalresult([]);
    setResponses([]);
    setQuestionrule([]);
    setResponsesY([]);

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

  const handleReceiveValue = (value) => {
    setcategoryValue(value);
  };

  return (
    <div className="flex flex-col w-screen h-full fixed top-0 left-0 overflow-auto">
      <Navi />
      <div className="bg-sky-200 h-full flex items-center flex-col px-8 lg:px-0">
      <Category onReceiveValue={handleReceiveValue} />
        <div className="w-full items-left max-w-6xl">
          <p className="text-lg font-bold py-2">Inference by fact</p>
          <p className="text-base">
            To Insert a multiple fact use this systex to in put fact a,c,e in
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
        <div className="bg-gray-200 text-black w-full h-[460px] p-6 my-4 max-w-6xl overflow-y-auto">
          {responses.map((response, index) => (
            <div className="flex justify-center items-center mb-2 bg-white border border-gray-300 rounded-md">
              <div className="text-lg p-4 ">
                <p>{response}</p>
              </div>
              <div className="flex ml-4">
                {responsesY[index] == "y" ? (
                  <button className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                    ใช่
                  </button>
                ) : (
                  <button className="ml-2 py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600">
                    ไม่ใช่
                  </button>
                )}
              </div>
            </div>
          ))}
          {finalresult.length != 0 ? (
            finalresult[0]!="R"  ? (
              <div className="flex justify-center items-center bg-white border border-gray-300 rounded-md flex-col">
                <div className="text-lg p-4 ">
                  <p>
                    Result is {finalresult.map((obj) => obj.fact).join(", ")}
                  </p>
                </div>
                {finalresult.map((obj) => (
                  <div
                    key={obj._id}
                    className="bg-gray-200 w-3/4 p-4 m-4 rounded-md"
                  >
                    <p className="text-lg">Fact: {obj.fact}</p>
                    <p className="text-lg">Description: {obj.descliption}</p>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center w-48 h-48">
                        <img
                          src={`http://localhost:5555/static/${obj.picture}`}
                          alt="รูปภาพ"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center bg-white border border-gray-300 rounded-md flex-col">
                <div className="text-lg p-4 ">
                  <p>Result not found</p>
                </div>
              </div>
            )
          ) : (
            <div></div>
          )}
          {currentQuestionIndex < questionrule.length && (
            <div className="w-full flex flex-col items-center">
              <div className="flex justify-center items-center w-full bg-white border border-gray-300 rounded-md">
                <div className="text-lg p-4 ">
                  {questionrule[currentQuestionIndex].fact}
                </div>
                <div className="flex ml-4">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    onClick={() => handleResponse("y")}
                  >
                    ใช่
                  </button>
                  <button
                    className="ml-2 py-2 px-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                    onClick={() => handleResponse("n")}
                  >
                    ไม่ใช่
                  </button>
                </div>
              </div>
              {questionrule[currentQuestionIndex].picture != null ? (
                <div className=" w-11/12 bg-white border border-gray-300 rounded-md">
                  <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center w-48 h-48">
                      <img
                        src={`http://localhost:5555/static/${questionrule[currentQuestionIndex].picture}`}
                        alt="รูปภาพ"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inference;
