import React, { useEffect, useState } from "react";
import Navi from "../components/Navi";
import Factshow from "../components/Factshow";
import { Link } from "react-router-dom";
import axios from "axios";

function Knowledge() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/facts")
      .then((response) => {
        setFacts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen overflow-x-hidden">
        <Navi />
        <div className="bg-sky-200 w-60vw flex items-center flex-col min-h-screen">
          <p>ชื่อผู้ใช้งาน: จอนสมิท</p>
          <Link to="/createfact">add</Link>
          <Factshow facts={facts} />
        </div>
      </div>
    </>
  );
}

export default Knowledge;
