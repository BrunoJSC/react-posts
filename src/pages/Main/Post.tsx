import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Post as IPost } from "./Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";

interface Props {
  posts: IPost;
}

interface Like {
  userId: string;
}

export function Post(props: Props) {
  const [user] = useAuthState(auth);
  const { posts } = props;

  const [like, setLike] = useState<Like[] | null>(null);

  const likeRef = collection(db, "likes");
  const likesDoc = query(likeRef, where("postId", "==", posts.id));

  async function addLike() {
    try {
      await addDoc(likeRef, { id: user?.uid, postId: posts.id });
      if (user) {
        setLike((prev) =>
          prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getLikes() {
    const data = await getDocs(likesDoc);
    setLike(data.docs.map((doc) => ({ userId: doc.data().id })));
  }

  const handleLiked = like?.some((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <h1>{posts.title}</h1>
      <div>
        <p>{posts.description}</p>
      </div>
      <footer>
        <p>@{posts.username}</p>
        <button onClick={addLike}>{handleLiked ? "0" : <p>Like</p>}</button>
        {like && <p>{like?.length}</p>}
      </footer>
    </div>
  );
}
