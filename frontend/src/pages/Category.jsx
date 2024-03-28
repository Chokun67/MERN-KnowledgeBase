import React, { useEffect, useState } from "react";
import Navi from "../components/Navi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import swalactive from "../components/swalfire";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

function CategoryPage() {
  const [categorys, setCategorys] = useState([]);
  const [datachange, setDatachange] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/category`)
      .then((response) => {
        setCategorys(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [datachange]);

  const handleDeleteBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios
          .delete(`http://localhost:5555/category/${id}`)
          .then(() => {
            setDatachange((pre) => pre + 1);
            swalactive("success", "Delete success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleLinkClick = () => {
    Swal.fire({
      title: "Add category name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        axios
          .post("http://localhost:5555/category", { category_name: data })
          .then(() => {
            setDatachange((pre) => pre + 1);
            swalactive("success", "Successfully added information");
          })
          .catch((error) => {
            swalactive("error", "Failed to add information");
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleEditBook = (id) => {
    Swal.fire({
      title: "Edit name category",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        axios
          .put(`http://localhost:5555/category/${id}`, { category_name: data })
          .then(() => {
            setDatachange((pre) => pre + 1);
            swalactive("success", "Successfully edited information");
          })
          .catch((error) => {
            swalactive("error", "Failed to edited information");
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <div className="flex flex-col w-full absolute top-0">
        <Navi />
        <div className="bg-sky-200 w-60vw flex items-center flex-col min-h-screen">
          <p className="my-4">User : admin</p>
          <button
            onClick={handleLinkClick}
            className="bg-blue-500 text-white py-2 px-8 mb-4 rounded hover:bg-blue-700"
          >
            Add Category
          </button>
          <div className="w-9/12 min-h-96 h-96 bg-white overflow-auto">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Categorys</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {categorys.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <div className="flex justify-center gap-x-4 cursor-pointer">
                        <AiOutlineEdit
                          className="text-2xl text-yellow-600"
                          onClick={() => handleEditBook(category._id)}
                        />
                        <MdOutlineDelete
                          className="text-2xl text-red-600 cursor-pointer"
                          onClick={() => handleDeleteBook(category._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
