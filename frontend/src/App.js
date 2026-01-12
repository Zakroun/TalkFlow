import { Routes, Route } from "react-router-dom";
// Main Pages
import Home from "./main/Home";
import About from "./main/About";
import Contact from "./main/Contact";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Auth Pages
import Login from "./auth/login";
import Register from "./auth/Register";
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerficationCode from "./auth/VerficationCode";
// Chat
import ChatContainer from "./chat/ChatContainer";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verification-code" element={<VerficationCode />} />
        <Route path="/chat" element={<ChatContainer />} />
      </Routes>
    </div>
  );
}