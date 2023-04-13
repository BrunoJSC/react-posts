import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection,  } from "firebase/firestore";
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface ICreatePostData {
  title: string;
  description: string;
}

export function CreateForm() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePostData>({
    resolver: yupResolver(schema),
  });


  const postRef = collection(db, "posts");

  async function onCreatePost(data: ICreatePostData) {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      id: user?.uid,
    });
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input type="text" placeholder="Title..." {...register("title")} />
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

        <textarea placeholder="Description..." {...register("description")} />
        {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
