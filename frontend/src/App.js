import { Routes, Route } from "react-router-dom";
// Main Pages
import Home from "./main/Home";
import About from "./main/About";
import Contact from "./main/Contact";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Alert from "./chat/Alert";
// Auth Pages
import Login from "./auth/login";
import Register from "./auth/Register";
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerficationCode from "./auth/VerficationCode";
// Chat
import ChatContainer from "./chat/ChatContainer";
// Protected Routes
import ProtectedChatRoute from "./routes/ProtectedChatRoute";
import ProtectedAuthRoute from "./routes/ProtectedAuthRoute";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />

        <Route
          path="/login"
          element={
            <ProtectedAuthRoute>
              <Login />
              <Alert />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedAuthRoute>
              <Register />
              <Alert />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/forget-password"
          element={
            <ProtectedAuthRoute>
              <ForgetPassword />
              <Alert />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedAuthRoute>
              <ResetPassword />
              <Alert />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/verification-code"
          element={
            <ProtectedAuthRoute>
              <VerficationCode />
              <Alert />
            </ProtectedAuthRoute>
          }
        />

        <Route
          path="/chat/:path"
          element={
            <ProtectedChatRoute>
              <ChatContainer />
            </ProtectedChatRoute>
          }
        />
      </Routes>
    </div>
  );
}
