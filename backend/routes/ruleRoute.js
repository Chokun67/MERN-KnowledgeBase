import express from 'express';
import { Rules } from '../models/ruleModel.js';

const router = express.Router();

// Route for Save a new rule
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.cause ||
      !request.body.operatorCause ||
      !request.body.conclude ||
      !request.body.operatorConclude
    ) {
      return response.status(400).send({
        message: 'Send all required fields: '+response.statusCode,
      });
    }
    const newrule = {
      cause: request.body.cause,
      operatorCause: request.body.operatorCause,
      conclude: request.body.conclude,
      operatorConclude: request.body.operatorConclude,
    };

    const rule = await Rules.create(newrule);

    return response.status(201).send(rule);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Rules from database
router.get('/', async (request, response) => {
  try {
    const rulesall = await Rules.find({});
    return response.status(200).json({
      count: rulesall.length,
      data: rulesall,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One rule from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const rule = await Rules.findById(id);

    return response.status(200).json(rule);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a rule
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.cause ||
      !request.body.operatorCause ||
      !request.body.conclude ||
      !request.body.operatorConclude
    ) {
      return response.status(400).send({
        message: 'Send all required fields: id, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Rules.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'rule not found' });
    }

    return response.status(200).send({ message: 'rule updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a rule
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Rules.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'rule not found' });
    }

    return response.status(200).send({ message: 'rule deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;