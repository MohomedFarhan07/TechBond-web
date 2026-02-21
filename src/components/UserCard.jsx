import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ feed }) => {
  const { _id, about, age, firstName, lastName, photoUrl, gender } = feed;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      // TODO: handle error
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary text-black"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary text-black"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
