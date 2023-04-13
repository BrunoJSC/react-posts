import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"

export function Login() {
  const navigate = useNavigate();

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  }

  return (
    <main>
      <h1>Sign with Google to continue</h1>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </main>
  );
}
