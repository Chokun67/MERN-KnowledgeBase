import React, { useEffect, useState } from "react";
import Navi from "../components/Navi";
import Factshow from "../components/Factshow";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Category from "../components/category";
import swalactive from "../components/swalfire";


function Knowledge() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setcategoryValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/facts?category_id=${categoryValue}`)
      .then((response) => {
        setFacts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [categoryValue]);

  const handleReceiveValue = (value) => {
    setcategoryValue(value);
  };

  const handleLinkClick = () => {
    if (categoryValue == null) {
      swalactive("warning","Plese selected category")
    } else {
      navigate(`/createfact/${categoryValue}`);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full absolute top-0">
        <Navi />
        <div className="bg-sky-200 w-60vw flex items-center flex-col min-h-screen">
          <p>User : admin</p>
          <Category onReceiveValue={handleReceiveValue} />
          <p>Category : {categoryValue}</p>
          <button
            onClick={handleLinkClick}
            className="bg-blue-500 text-white py-2 px-8 m-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
          <Factshow facts={facts} category={categoryValue} />
        </div>
      </div>
    </>
  );
}

export default Knowledge;
