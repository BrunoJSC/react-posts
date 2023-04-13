import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";

import "./App.css";
import { CreatePost } from "./pages/createPost/CreatePost";

export function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}
