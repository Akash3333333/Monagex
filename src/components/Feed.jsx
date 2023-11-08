import { useContext, useEffect, useState } from "react";
import "./Feed.css";
import UserNav from "./User/UserNav";
import Footer from "./Footer";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);


  return (
    <div className="feed">
      <div className="feedWrapper">

      </div>
    </div>
  );
}
