import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import { Fact } from "../models/factModel.js";
import { Rules } from "../models/ruleModel.js";

router.get("/", async (req, res) => {
  try {
    const facts = await Fact.find({}).select("_id fact");
    // const rules = await Rules.find({});
    // console.log(rules);

    // const conclusions = rules.reduce((acc, rule) => {
    //     acc.push(...rule.conclude.map(id => id.toString()));
    //     return acc;
    //   }, []);

    //   // ค้นหา facts ที่ไม่ได้อยู่ใน conclude
    //   const nonConcludedFacts = facts.filter(fact => !conclusions.includes(fact._id.toString()));
    const conclusions = new Set();

    for (const rule of await Rules.find({})) {
      rule.conclude.forEach((id) => conclusions.add(id.toString()));
    }

    const nonConcludedFacts = facts.filter(
      (fact) => !conclusions.has(fact._id.toString())
    );

    return res.status(200).send(nonConcludedFacts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/test2", async (req, res) => {
  // ในที่นี้เราสมมติว่าค่าที่ต้องการรับมาเป็น Object { key1: 'value1', key2: 'value2' }
  if (!req.body.workmemo_T || !req.body.workmemo_F) {
    return response.status(400).send({
      message: "Send all required fields: fact, descliption, publishYear",
    });
  }
  const receivedData = {
    workmemo_T: req.body.workmemo_T,
    workmemo_F: req.body.workmemo_F,
  };
  ///////////////หา fact เริ่มต้น
  const facts = await Fact.find({}).select("_id");

  const conclusions = new Set();
  const causes = new Set();

  for (const rule of await Rules.find({})) {
    rule.conclude.forEach((id) => conclusions.add(id.toString()));
    rule.cause.forEach((id) => causes.add(id.toString()));
  }

  const nonConcludedFacts = facts.filter(
    (fact) => !conclusions.has(fact._id.toString())
  );
  const transformedFacts = nonConcludedFacts.map((fact) => fact._id.toString());
  const nonConcludedFacts2 = facts.filter(
    (fact) => !causes.has(fact._id.toString())
  );
  const concludingnode = nonConcludedFacts2.map((fact) => fact._id.toString());

  /////////เริ่มลูป
  let i = 0;
  // while (i < transformedFacts.length ) {
  for (let x = 0; x < 4; x++) {
    const false_match = receivedData.workmemo_F.includes(transformedFacts[x]);
    if (false_match) {
      continue;
    }
    const match = receivedData.workmemo_T.includes(transformedFacts[x]);
    if (match) {
      await Rules.aggregate([
        {
          $match: {
            cause: new mongoose.Types.ObjectId(transformedFacts[x]),
          },
        },
      ])
        .then(async (result) => {
          let result_2 = result;
          let matchmid;
          // do {
          //   const resultConcludeArray = result_2[0].conclude.map((objId) =>
          //     objId.toString()
          //   );
          //   matchmid = receivedData.workmemo_T.includes(resultConcludeArray[0]);
          //   if (matchmid) {
          //     console.log("found it", result_2[0].conclude);
          //     result_2 = await Rules.aggregate([
          //       {
          //         $match: {
          //           cause: new mongoose.Types.ObjectId(resultConcludeArray[0]),
          //         },
          //       },
          //     ]);
          //   }
          // } while (matchmid);
          for (let z = 0; z < receivedData.workmemo_T.length; z++) {
            console.log(z);
            result_2 = await Rules.aggregate([
              {
                $match: {
                  cause: new mongoose.Types.ObjectId(
                    receivedData.workmemo_T[z]
                  ),
                },
              },
            ]);
            for (let ab = 0; ab < result_2.length; ab++) {
              const resultConcludeArray = result_2[ab].conclude.map((objId) =>
                objId.toString()
              );
              matchmid = receivedData.workmemo_T.includes(
                resultConcludeArray[0]
              );
              if (matchmid) {
                continue;
              }
              if (result_2[ab].operatorCause == "or") {
                // const causeStrings = result[0].cause.map((objId) =>
                //   objId.toString()
                // );
                console.log(receivedData.workmemo_T, "memoryOr");
                receivedData.workmemo_T = [
                  ...receivedData.workmemo_T,
                  ...result_2[ab].conclude.map((objId) => objId.toString()),
                ];
                z = -1;
              } else if (result_2[ab].operatorCause == "and") {
                console.log(result_2[ab].cause, "andthishere");
                const causeStrings = result_2[ab].cause.map((objId) =>
                  objId.toString()
                );
                let allInMyArray = causeStrings.every((value) =>
                  receivedData.workmemo_T.includes(value)
                );
                if (allInMyArray) {
                  receivedData.workmemo_T = [
                    ...receivedData.workmemo_T,
                    ...result_2[ab].conclude.map((objId) => objId.toString()),
                  ];
                  z = -1;
                } else {
                  console.log("ไม่And");
                  continue;
                }
              } else {
                receivedData.workmemo_T = [
                  ...receivedData.workmemo_T,
                  ...result_2[ab].conclude.map((objId) => objId.toString()),
                ];
                z = -1;
                console.log(receivedData.workmemo_T, "memorynone");
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("ask user");
      const factask = await Fact.findById(transformedFacts[x]);
      return res.status(200).json(factask);
    }
  }
  // }
  console.log("answer", receivedData.workmemo_T);
  const answer = receivedData.workmemo_T.filter((item) =>
    concludingnode.includes(item)
  );
  const answermid = answer.map((id) => new mongoose.Types.ObjectId(id));
  const answerfinal = await Fact.find({
    _id: { $in: answermid },
  }).catch((error) => {
    console.error("Error querying MongoDB:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  });
  return res.status(200).send({ answerfinal });
});

router.get("/check", async (req, res) => {
  const data = req.query.data;

  // ตรวจสอบว่า data มีค่าเป็น array หรือไม่
  if (!Array.isArray(data)) {
    return res.status(400).send({ message: "data must be an array" });
  }
  console.log(data);
  // try {
  //   // ดึงข้อมูล rules ทั้งหมด
  //   const rules = await Rules.find({});
  //   console.log(rules);

  //   // ตรวจสอบว่ามี cause จาก data ใน rules หรือไม่
  //   const foundRules = rules.filter(rule => {
  //     return data.some(dataItem => rule.cause.includes(dataItem));
  //   });

  //   return res.status(200).send({ foundRules });
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }

  try {
    // ใช้ aggregation pipeline เพื่อกรองข้อมูลตามเงื่อนไข
    const foundRules = await Fact.aggregate([
      {
        $match: {
          fact: { $in: data.map((item) => item) },
        },
      },
    ]);
    console.log(foundRules);

    if (foundRules.length == 0) {
      return res.status(404).send({ message: "inference error" });
    }

    return res.status(200).send({ foundRules });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/test3", async (req, res) => {
  // ในที่นี้เราสมมติว่าค่าที่ต้องการรับมาเป็น Object { key1: 'value1', key2: 'value2' }
  if (!req.body.workmemo_T || !req.body.workmemo_F) {
    return response.status(400).send({
      message: "Send all required fields: workmemory",
    });
  }
  const receivedData = {
    workmemo_T: req.body.workmemo_T,
    workmemo_F: req.body.workmemo_F,
  };
  ///////////////หา fact เริ่มต้น
  const facts = await Fact.find({}).select("_id");

  const conclusions = new Set();
  const causes = new Set();

  for (const rule of await Rules.find({})) {
    rule.conclude.forEach((id) => conclusions.add(id.toString()));
    rule.cause.forEach((id) => causes.add(id.toString()));
  }

  const nonConcludedFacts = facts.filter(
    (fact) => !conclusions.has(fact._id.toString())
  );
  const transformedFacts = nonConcludedFacts.map((fact) => fact._id.toString());

  const nonConcludedFacts2 = facts.filter(
    (fact) => !causes.has(fact._id.toString())
  );
  const concludingnode = nonConcludedFacts2.map((fact) => fact._id.toString());

  async function askUser(data) {
    const resultString = data.cause.map((objId) => objId.toString());
    const startnode = resultString.filter((item) =>
      transformedFacts.includes(item)
    );
    console.log(startnode,"start")
    const startnodeFliter = startnode.filter((item) =>
    !(receivedData.workmemo_T.includes(item)) && !(receivedData.workmemo_F.includes(item))
    );
    console.log(startnodeFliter,"fliter")
    
    if (startnodeFliter.length > 0) {
      const factask = await Fact.findById(startnodeFliter[0]);
      return factask
    } else {
      return null;
    }
  }
  /////////เริ่มลูป
  let rules_test = await Rules.find({});

  for (let x = 0; x < rules_test.length; x++) {
    let matchmid;
    let result_2 = rules_test[x];

    if (result_2.operatorCause == "or") {
      const resultString = result_2.cause.map((objId) => objId.toString());
      matchmid = resultString.some((item) =>
        receivedData.workmemo_T.includes(item)
      );
      if (matchmid) {
        receivedData.workmemo_T = [
          ...receivedData.workmemo_T,
          ...result_2.conclude.map((objId) => objId.toString()),
        ];
        rules_test.splice(x, 1);
        x = -1;
      } else {
        const factaskresult = await askUser(result_2);
        if(factaskresult){
          return res.status(200).json(factaskresult);
        }
        continue;
      }
    } else if (result_2.operatorCause == "and") {
      const causeStrings = result_2.cause.map((objId) => objId.toString());
      let allInMyArray = causeStrings.every((value) =>
        receivedData.workmemo_T.includes(value)
      );
      if (allInMyArray) {
        receivedData.workmemo_T = [
          ...receivedData.workmemo_T,
          ...result_2.conclude.map((objId) => objId.toString()),
        ];
        rules_test.splice(x, 1);
        x = -1;
      } else {
        const factaskresult = await askUser(result_2);
        if(factaskresult){
          return res.status(200).json(factaskresult);
        }
        continue;
      }
    } else {
      const resultString = result_2.cause.map((objId) => objId.toString());
      matchmid = receivedData.workmemo_T.includes(resultString[0]);
      if (matchmid) {
        receivedData.workmemo_T = [
          ...receivedData.workmemo_T,
          ...result_2.conclude.map((objId) => objId.toString()),
        ];
        rules_test.splice(x, 1);
        x = -1;
        // console.log(receivedData.workmemo_T, "memorynone");
      } else {
        const factaskresult = await askUser(result_2);
        if(factaskresult){
          return res.status(200).json(factaskresult);
        }
        continue;
      }
    }
  }

  console.log("answer", receivedData.workmemo_T);
  const answer = receivedData.workmemo_T.filter((item) =>
    concludingnode.includes(item)
  );
  const answermid = answer.map((id) => new mongoose.Types.ObjectId(id));
  const answerfinal = await Fact.find({
    _id: { $in: answermid },
  }).catch((error) => {
    console.error("Error querying MongoDB:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  });
  return res.status(200).send({ answerfinal });
});

export default router;
