import React, { useEffect, useState } from "react";
import Navi from "../components/Navi";
import Addrule from "../components/addrule";
import Ruledata from "../components/Ruleshow";
import axios from "axios";

function Rules() {
  const [facts, setFacts] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5555/facts").then((response) => {
        setFacts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      axios.get("http://localhost:5555/rules").then((response) => {
        setKnowledge(response.data.data);
        setLoading(false);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col w-screen bg-gray-300 fixed top-0 left-0">
        <Navi />
        <div className="bg-sky-200 w-60vw h-80vh flex justify-center items-center flex-col px-12">
          <p>ชื่อผู้ใช้งาน: จอนสมิท</p>
          <Addrule facts={facts} />
          <Ruledata knowledge={knowledge} />
        </div>
      </div>
    </>
  );
}

export default Rules;
