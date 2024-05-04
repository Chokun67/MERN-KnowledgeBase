import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import EditModal from "../components/Editmodal";
import Swal from "sweetalert2";
import { ruleAPI } from "../controllers/ruleController";

function Ruledata({ categoryData, addRuleControl }) {
  const [loading, setLoading] = useState(false);
  const [selectedrule, setSelectedrule] = useState(null);
  const [knowledge, setKnowledge] = useState([]);
  const [reloadValue, setReloadValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ruleAPI.getAllType_rule(categoryData)
      .then((response) => {
        setKnowledge(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [categoryData, reloadValue, addRuleControl]);

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
        ruleAPI.delete_rule(id)
          .then(() => {
            setLoading(false);
            navigate("/rules");
            setReloadValue((pre) => pre + 1);
            // window.location.reload(); // รีโหลดหน้าเว็บ
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    });
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = (index) => {
    setSelectedrule(knowledge[index]);
    setModalOpen(true);
    console.log(selectedrule);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleReceiveRule=(value) =>{
    setReloadValue(value)
  }

  return (
    <>
      <div className="flex w-full h-full justify-center items-center my-8">
        <EditModal
          isOpen={isModalOpen}
          onClose={closeModal}
          ruleData={selectedrule}
          categoryData={categoryData}
          onReceiveValue={handleReceiveRule}
        />
        <div className="max-w-6xl w-full min-h-96 h-96 bg-white overflow-auto">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Cause</th>
                <th>opCause</th>
                <th>Conclude</th>
                <th>opConclude</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {knowledge.map((knowledge, index) => (
                <tr key={knowledge._id}>
                  <td>{index + 1}</td>
                  <td>
                    {knowledge.causeFacts.map((fact, index) => (
                      <React.Fragment key={index}>
                        {fact.fact}
                        {index !== knowledge.causeFacts.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </td>
                  <td>{knowledge.operatorCause}</td>
                  <td>
                    {knowledge.concludeFacts.map((fact, index) => (
                      <React.Fragment key={index}>
                        {fact.fact}
                        {index !== knowledge.concludeFacts.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </td>
                  <td>{knowledge.operatorConclude}</td>
                  <td>
                    <div className="flex justify-center gap-x-4">
                      <AiOutlineEdit
                        className="text-2xl text-yellow-600 cursor-pointer"
                        onClick={() => openModal(index)}
                      />
                      <MdOutlineDelete
                        className="text-2xl text-red-600 cursor-pointer"
                        onClick={() => handleDeleteBook(knowledge._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Ruledata;
