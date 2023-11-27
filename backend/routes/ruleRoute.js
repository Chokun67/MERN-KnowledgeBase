import express from 'express';
import { Rules } from '../models/ruleModel.js';
import mongoose from 'mongoose';
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
        message: 'Send all required fields: ' + response.statusCode,
      });
    }

    // แปลง string เป็น ObjectID
    const causeObjectIDs = request.body.cause.map((causeID) => new mongoose.Types.ObjectId(causeID));
    const concludeObjectIDs = request.body.conclude.map((concludeID) => new mongoose.Types.ObjectId(concludeID));

    const newrule = {
      cause: causeObjectIDs,
      operatorCause: request.body.operatorCause,
      conclude: concludeObjectIDs,
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
    const rulesWithFacts = await Rules.aggregate([
      {
        $lookup: {
          from: 'facts', // ตั้งชื่อ collection ของ facts
          localField: 'cause',
          foreignField: '_id',
          as: 'causeFacts',
        },
      },
      {
        $lookup: {
          from: 'facts', // ตั้งชื่อ collection ของ facts
          localField: 'conclude',
          foreignField: '_id',
          as: 'concludeFacts',
        },
      },
    ]);

    return response.status(200).json({
      count: rulesWithFacts.length,
      data: rulesWithFacts,
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
    const { id } = request.params;

    if (
      !request.body.cause ||
      !request.body.operatorCause ||
      !request.body.conclude ||
      !request.body.operatorConclude
    ) {
      return response.status(400).send({
        message: 'Send all required fields: cause, operatorCause, conclude, operatorConclude',
      });
    }

    // แปลง string เป็น ObjectID
    const causeObjectIDs = request.body.cause.map((causeID) => new mongoose.Types.ObjectId(causeID));
    const concludeObjectIDs = request.body.conclude.map((concludeID) => new mongoose.Types.ObjectId(concludeID));

    const newrule = {
      cause: causeObjectIDs,
      operatorCause: request.body.operatorCause,
      conclude: concludeObjectIDs,
      operatorConclude: request.body.operatorConclude,
    };

    const result = await Rules.findByIdAndUpdate(id, newrule, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'rule not found' });
    }

    return response.status(200).send({ message: 'rule updated successfully', data: result });
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