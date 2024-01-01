import express from "express";
const router = express.Router();
import mongoose from 'mongoose';
import { Fact } from "../models/factModel.js";
import { Rules } from "../models/ruleModel.js";

router.get("/", async (req, res) => {
  try {
    const facts = await Fact.find({}).select("_id fact");
    console.log(facts);
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

    return res.status(200).send({ nonConcludedFacts });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/check", async (req, res) => {
const data = req.query.data;

// ตรวจสอบว่า data มีค่าเป็น array หรือไม่
if (!Array.isArray(data)) {
  return res.status(400).send({ message: "data must be an array" });
}
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
  const foundRules = await Rules.aggregate([
    {
      $match: {
        cause: { $in: data.map(item => new mongoose.Types.ObjectId(item)) }
      }
    }
  ]);
  if (foundRules.length === 0) {
    return res.status(200).send({ message: "inference success" });
  }

  return res.status(200).send({ foundRules });
} catch (error) {
  res.status(500).send({ message: error.message });
}
});


export default router;
