import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //TODO : handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <h1 className="text-bold text-white text-2xl flex justify-center mt-10">
        No More Users found
      </h1>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard feed={feed[0]} />
      </div>
    )
  );
};

export default Feed;
