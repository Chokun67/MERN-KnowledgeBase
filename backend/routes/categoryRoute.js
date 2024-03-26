import express from "express";
import { Category } from "../models/categoryModel.js";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.category_name
      ) {
        return response.status(400).send({
          message: 'Send all required fields: ' + response.statusCode,
        });
      } 
      const newcategory = {
        category_name: request.body.category_name,
      };
  
      const category_new = await Category.create(newcategory);
  
      return response.status(201).send(category_new);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get("/", async (request, response) => {
  try {
    const categorys = await Category.find({});

    return response.status(200).json({
      count: categorys.length,
      data: categorys,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const categorys_one = await Category.findById(id);
      if (!categorys_one) {
        return response.status(404).json({ message: 'Category not found' });
      }
  
      return response.status(200).json(categorys_one);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.put("/:id",async (request, response) => {
  try {
    const { id } = request.params;

    // Check if fact and descliption are provided
    if (!request.body.category_name ) {
      return response.status(400).send({
        message: "Send all required fields: fact, descliption",
      });
    }

    // Construct the updatedCetagory object
    const updatedCetagory = {
      category_name: request.body.category_name,
    };

    const result = await Category.findByIdAndUpdate(id, updatedCetagory);

    if (!result) {
      return response.status(404).json({ message: "Category not found" });
    }

    // Return success message
    return response.status(200).send({ message: "Category updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Category.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Category not found' });
      }
  
      return response.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  export default router; 
