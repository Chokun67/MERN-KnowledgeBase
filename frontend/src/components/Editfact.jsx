import React ,{useState,useEffect}from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navi from './Navi';

function Editfact() {
    const [fact, setfact] = useState('');
    const [descliption, setdescliption] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
  
    useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:5555/facts/${id}`)
      .then((response) => {
          setdescliption(response.data.descliption);
          setfact(response.data.fact)
          setLoading(false);
        }).catch((error) => {
          setLoading(false);
          alert('An error happened. Please Chack console');
          console.log(error);
        });
    }, [])
    
    const handleEditBook = () => {
      const data = {
        fact,
        descliption,
      };
      setLoading(true);
      axios
        .put(`http://localhost:5555/facts/${id}`, data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Book Edited successfully', { variant: 'success' });
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          // alert('An error happened. Please Chack console');
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        });
    };

  return (
    <div className="flex flex-col w-screen h-screen fixed top-0 left-0">
      <Navi />
      <div className="w-full h-full flex justify-center items-center bg-[#3F6C94]">
      <div className="boxcenter">
        <div className="login-container">
        <h1 className="text-3xl flex-column">Edit fact</h1>
        <form className="login-form">
          <label className="text-xl mr-4 text-gray-500">fact</label>
          <input
            type="text"
            value={fact}
            onChange={(e) => setfact(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <label className="text-xl mr-4 text-gray-500">descliption</label>
          <input
            type="text"
            value={descliption}
            onChange={(e) => setdescliption(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
          <button
            type="submit"
            className="login-button"
            onClick={handleEditBook}
          >
            save
          </button>
        </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Editfact