import React, { useState, useEffect } from "react";
import Navi from "../components/Navi";
import { Link } from "react-router-dom";
import axios from "axios";

function Inference() {
  const [loading, setLoading] = useState(false);
  const [startinfer, setStartinfer] = useState([]);
  const [inferrule, setInferrule] = useState([]);
  const [questionrule, setQuestionrule] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [isInferenceComplete, setIsInferenceComplete] = useState(false);

  const handleResponse = (response) => {
    setResponses((prevResponses) => [
      ...prevResponses,
      `${questionrule[currentQuestionIndex][factIndex]} ${response}`,
    ]);

    if (response == "y") {
      if (inferrule[currentQuestionIndex].operatorCause == "and" && factIndex < questionrule[currentQuestionIndex].length-1) {
        setFactIndex((prevIndex) => prevIndex + 1);//and = anothercheck
        return;
      }
      console.log(inferrule[currentQuestionIndex].conclude);
      Inferengine(inferrule[currentQuestionIndex].conclude);
      setQuestionrule([]);
      setCurrentQuestionIndex(0);
      setFactIndex(0);
    } else {
      if (inferrule[currentQuestionIndex].operatorCause == "or" && factIndex <= questionrule[currentQuestionIndex].length-1) {
        setFactIndex((prevIndex) => prevIndex + 1);//or = anothercheck
        return;
      }
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const inference = () => {
    setLoading(true);
    axios
      .get("http://localhost:5555/infer")
      .then((response) => {
        Inferengine(response.data);
        setStartinfer(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const Inferengine = (respara) => {
    axios
      .get("http://localhost:5555/infer/check", {
        params: {
          data: respara,
        },
      })
      .then((response) => {
        if (response.data.message) {
          setResponses((prevResponses) => [
            ...prevResponses,
            `result is : ${inferrule[currentQuestionIndex].concludeFacts[0].fact}`,
          ]);
          return;
        }
        console.log("ค่าที่หา", response.data.foundRules);
        setInferrule(response.data.foundRules);
        const causeFactsArray = response.data.foundRules.map((rule) =>
          rule.causeFacts.map((fact) => `${fact.fact} (y/n) :`)
        );
        setQuestionrule(causeFactsArray);
        setLoading(false);
        console.log("question1", causeFactsArray);
        console.log("question", questionrule);
      })
      .catch((error) => {
        console.error(error);
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
          {currentQuestionIndex < questionrule.length && (
            <div className="flex items-center">
              <p className="mr-2">
                {questionrule[currentQuestionIndex][factIndex]}
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
