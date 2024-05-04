import axios from "axios";
import React, { useState, useEffect } from "react";
import { categoryAPI } from "../controllers/categoryController";

function category({ onReceiveValue }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // เรียก API เมื่อคอมโพเนนต์ถูกโหลด
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // เรียก API ดึงข้อมูลหมวดหมู่
      const response = await categoryAPI.getAll_category();
      // ตั้งค่าข้อมูลหมวดหมู่ให้กับ state
      console.log(response.data.data)
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSelectCategory = (selectedCategoryId) => {
    // ทำสิ่งที่ต้องการกับค่าที่ได้รับ เช่น ส่งกลับไปยังคอมโพเนนต์หลัก
    setSelectedCategory(selectedCategoryId);
    onReceiveValue(selectedCategoryId);
  };

  return (
    <div className="w-full flex flex-col max-w-6xl my-3">
      <p className="text-lg font-bold mb-2">Please chose your knowledge</p>
      <select className="py-1 px-2 rounded-sm" value={selectedCategory} onChange={(e) => handleSelectCategory(e.target.value)}>
        {selectedCategory==""?<option value="">Please select knowledge</option>:null}
        {Array.isArray(categories) &&
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default category;
