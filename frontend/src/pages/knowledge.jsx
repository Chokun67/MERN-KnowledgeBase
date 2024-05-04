import React, { useEffect, useState } from "react";
import Navi from "../components/Navi";
import Factshow from "../components/Factshow";
import { useNavigate } from "react-router-dom";
import Category from "../components/category";
import swalactive from "../components/swalfire";
import { factAPI } from "../controllers/factController";
import Addfactmodal from "../components/FactmodalAdd";


function Knowledge() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setcategoryValue] = useState(null);
  const [addFactControl, setaddFactControl] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    factAPI
      .getAllType_fact(categoryValue)
      .then((response) => {
        setFacts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [categoryValue, addFactControl]);

  const handleReceiveValue = (value) => {
    setcategoryValue(value);
  };

  const handleLinkClick = () => {
    if (categoryValue == null) {
      swalactive("warning", "Plese selected category");
    } else {
      navigate(`/createfact/${categoryValue}`);
    }
  };

  const handleReceiveFact = (value) => {
    setaddFactControl(value);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
        

  return (
    <>
      <div className="flex flex-col w-full absolute top-0">
      <Addfactmodal
          isOpen={isModalOpen}
          onClose={closeModal}
          categoryData={categoryValue}
          onReceiveValue={handleReceiveFact}
        />
        <Navi />
        <div className="bg-sky-200 w-60vw flex items-center flex-col min-h-screen">
          <p>User : admin</p>
          <Category onReceiveValue={handleReceiveValue} />
          <p>Knowledge_id : {categoryValue}</p>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white py-2 px-8 m-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
          <Factshow
            facts={facts}
            category={categoryValue}
            onReceiveValue={handleReceiveFact}
          />
        </div>
      </div>
    </>
  );
}

export default Knowledge;
