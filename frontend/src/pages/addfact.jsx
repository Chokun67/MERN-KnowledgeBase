import React, { useState } from "react";
import Navi from "../components/Navi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function addfact() {
  const [fact, setfact] = useState("");
  const [descliption, setdescliption] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      fact,
      descliption,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/facts", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="box-login flex-column">
      <Navi />
      <div className="boxcenter">
        <div className="login-container">
        <h1 className="text-3xl flex-column">Create Book</h1>
        <form className="login-form">
          <label className="text-xl mr-4 text-gray-500">fact</label>
          <input
            type="text"
            value={fact}
            onChange={(e) => setfact(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">descliption</label>
          <input
            type="text"
            value={descliption}
            onChange={(e) => setdescliption(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
          <button
            type="submit"
            className="login-button"
            onClick={handleSaveBook}
          >
            save
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default addfact;
