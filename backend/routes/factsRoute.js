import express from 'express';
import { Fact } from '../models/factModel.js';
import multer from 'multer';
const router = express.Router();

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDirectory = dirname(currentFilePath);

// Route for Save a new Fact
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.fact ||
      !request.body.descliption 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: fact, descliption, publishYear',
      });
    }
    const newFact = {
      fact: request.body.fact,
      descliption: request.body.descliption,
    };

    const fact = await Fact.create(newFact);

    return response.status(201).send(fact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Facts from database
router.get('/', async (request, response) => {
  try {
    const facts = await Fact.find({});

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
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const fact = await Fact.findById(id);
    if (!fact) {
      return response.status(404).json({ message: 'Fact not found' });
    }

    return response.status(200).json(fact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a fact
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.fact ||
      !request.body.descliption 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: id, descliption, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Fact.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Fact not found' });
    }

    return response.status(200).send({ message: 'Fact updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a fact
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Fact.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Fact not found' });
    }

    return response.status(200).send({ message: 'Fact deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(currentDirectory, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), function (req, res, next) {
  console.log("succesl upload");
  res.send(req.file)
})

export default router;
