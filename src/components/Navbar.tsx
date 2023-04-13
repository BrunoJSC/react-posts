import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export function Navbar() {
  const [user] = useAuthState(auth);

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <nav className="navbar">
      <div className="link">
        <Link to="/">Home</Link>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/createpost">Create Post</Link>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || ""}
              alt="avatar"
              width="50"
              height="50"
            />
            <button onClick={handleSignOut}>Log out</button>
          </>
        )}
      </div>
    </nav>
  );
}
