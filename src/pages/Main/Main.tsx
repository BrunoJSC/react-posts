import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export interface Post {
  id: string;
  title: string;
  description: string;
  username: string;
}

export function Main() {
  const [postList, setPostList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  async function getPosts() {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main>
      <h1>Main</h1>
      {postList?.map((post) => (
        <Post posts={post} />
      ))}
    </main>
  );
}
