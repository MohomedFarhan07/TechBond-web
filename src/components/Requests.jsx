import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res?.data?.connectionRequest));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length == 0)
    return (
      <h1 className="text-bold text-white text-2xl flex justify-center mt-10">
        No Pending Requests found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl flex justify-center">
        Requests
      </h1>

      {requests.map((request) => {
        const { firstName, lastName, about, photoUrl } = request.fromUserId;
        return (
          <div
            key={request._id}
            className="flex items-center justify-between w-1/2 m-4 p-4 border bg-base-300 border-base-300 rounded-lg mx-auto"
          >
            <div className="flex items-center">
              <img
                alt="photo"
                className="w-20 rounded-full border border-gray-600"
                src={photoUrl}
              />
              <div className="text-left ml-2">
                <h2 className="font-bold">{firstName + " " + lastName}</h2>
                <p>{about}</p>
              </div>
            </div>
            <div className="flex">
              <button className="btn btn-primary m-2">Reject</button>
              <button className="btn btn-secondary m-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
