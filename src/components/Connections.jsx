import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      //TODO: Handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) return <h1 className="text-bold text-white text-2xl flex justify-center mt-10">No Connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl flex justify-center">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, about } = connection;
        return (
          <div key={connection._id} className="flex items-center w-1/2 m-4 p-4 border bg-base-300 border-base-300 rounded-lg mx-auto">
            <img
              alt="photo"
              className="w-20 rounded-full border border-gray-600"
              src={connection.photoUrl}
            />
            <div className="text-left ml-2">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
