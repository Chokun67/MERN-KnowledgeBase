import React, { useEffect, useState } from "react";
import Navi from "../components/Navi";
import Addrule from "../components/addrule";
import Ruledata from "../components/Ruleshow";
import axios from "axios";
import Category from "../components/category";
import { factAPI } from "../controllers/factController";
import { ruleAPI } from "../controllers/ruleController";

function Rules() {
  const [facts, setFacts] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryValue, setcategoryValue] = useState(null);
  const [addRuleControl, setaddRuleControl] = useState(0);

  useEffect(() => {
    setLoading(true);
      factAPI.getAllType_fact(categoryValue)
      .then((response) => {
        setFacts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
      ruleAPI.getAllType_rule(categoryValue)
      .then((response) => {
        setKnowledge(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [categoryValue]);

  const handleReceiveRule = (value) => {
    setaddRuleControl(value);
  };

  const handleReceiveValue = (value) => {
    setcategoryValue(value);
  };
  return (
    <>
      <div className="flex-col w-full absolute top-0 bg-sky-200 flex justify-start">
        <Navi />
        <div className=" h-fit flex justify-center items-center flex-col px-8">
          <p>User : admin</p>
          <Category onReceiveValue={handleReceiveValue} />
          <p>Knowledge_id : {categoryValue}</p>
          <Addrule facts={facts} category_id={categoryValue} onReceiveValue={handleReceiveRule} addRuleControl={addRuleControl}/>
          <Ruledata knowledge={knowledge} categoryData={categoryValue} addRuleControl={addRuleControl}/>
        </div>
      </div>
    </>
  );
}

export default Rules;
