import React, { useState, useEffect } from "react";
import { factAPI } from "../controllers/factController";
import { useNavigate, useParams } from "react-router-dom";
import swalactive from "./swalfire";

function Addfactmodal({ isOpen, onClose, categoryData, onReceiveValue }) {
  if (!isOpen) return null;
  const [fact, setfact] = useState("");
  const [descliption, setdescliption] = useState("");
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();

  const handleSaveFact = () => {
    const formData = new FormData();
    formData.append("fact", fact);
    formData.append("descliption", descliption);
    formData.append("file", picture);
    formData.append("category_id", categoryData);

    setLoading(true);
    try {
      factAPI.add_fact(formData).then(() => {
        onClose();
        onReceiveValue(new Date());
        swalactive("success", "Successfully added information");
      });
    } catch (error) {
      onClose();
      setLoading(false);
      console.log(error);
      swalactive("error", "Failed to add information");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // รับไฟล์ที่ผู้ใช้เลือก
    setPicture(file);
  };
  return (
    <div
    className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className=" transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="flex w-full h-full ">
                  <div className="flex flex-col flex-1 px-8">
                    <form className="login-form">
                      <label className="text-xl mr-4 text-gray-500">fact</label>
                      <input
                        type="text"
                        value={fact}
                        onChange={(e) => setfact(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                      />

                      <label className="text-xl mr-4 text-gray-500">
                        descliption
                      </label>
                      <input
                        type="text"
                        value={descliption}
                        onChange={(e) => setdescliption(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                      />
                      <div className="flex-part1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="inputStyle"
                          name="file"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={handleSaveFact}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white 
                    shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 
                  py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addfactmodal;
