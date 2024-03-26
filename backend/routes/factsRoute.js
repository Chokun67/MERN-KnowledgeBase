import express from "express";
import { Fact } from "../models/factModel.js";
import multer from "multer";
import mongoose from 'mongoose';
const router = express.Router();

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDirectory = dirname(currentFilePath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(currentDirectory, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// Route for Save a new Fact
router.post("/", upload.single("file"), async (request, response) => {
  try {
    if (
      !request.body.fact ||
      !request.body.descliption ||
      !request.body.category_id
    ) {
      return response.status(400).send({
        message: "Send all required fields: fact, descliption, publishYear",
      });
    }
    let picture; //check image
    if (request.file) {
      picture = request.file.filename;
    } else {
      picture = null; // Set picture to null if no file is uploaded
    }

    // แปลง string เป็น ObjectID
    const categoryID = new mongoose.Types.ObjectId(request.body.category_id)


    ////about picture
    const newFact = {
      fact: request.body.fact,
      descliption: request.body.descliption,
      picture: picture,
      category_id: categoryID,
    };

    const fact = await Fact.create(newFact);

    return response.status(201).send(fact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Facts from database
router.get("/", async (request, response) => {
  try {
    const { category_id } = request.query;
    const categoryID = new mongoose.Types.ObjectId(category_id)
    // find by category
    let facts;
    if (category_id) {
      facts = await Fact.find({ category_id: categoryID });
      console.log(facts);
    } else {
      return response.status(200).json({
      data: "none"
      });
    }
    // const facts = await Fact.find({});

    return response.status(200).json({
      count: facts.length,
      data: facts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Fact from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const fact = await Fact.findById(id);
    if (!fact) {
      return response.status(404).json({ message: "Fact not found" });
    }

    return response.status(200).json(fact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a fact
router.put("/:id", upload.single("file"), async (request, response) => {
  try {
    const { id } = request.params;

    // Check if fact and descliption are provided
    if (!request.body.fact || !request.body.descliption) {
      return response.status(400).send({
        message: "Send all required fields: fact, descliption",
      });
    }

    let picture = null;
    // Check if file is uploaded
    if (request.file) {
      picture = request.file.filename;
    }

    // Construct the updatedFact object
    const updatedFact = {
      fact: request.body.fact,
      descliption: request.body.descliption,
    };

    // If picture is provided, add it to the updatedFact object
    if (picture) {
      updatedFact.picture = picture;
    }

    // Find the fact by id and update it
    const result = await Fact.findByIdAndUpdate(id, updatedFact);

    // Check if the fact with the given id exists
    if (!result) {
      return response.status(404).json({ message: "Fact not found" });
    }

    // Return success message
    return response.status(200).send({ message: "Fact updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a fact
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Fact.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Fact not found" });
    }

    return response.status(200).send({ message: "Fact deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(currentDirectory, '../uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

router.post("/upload", upload.single("file"), function (req, res, next) {
  console.log("succesl upload");
  res.send(req.file.filename);
});

export default router;
