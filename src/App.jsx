import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Community from "./pages/Community"
import Recommendations from "./pages/Recommendations"
import Journal from "./pages/Journal"
import ProtectedRoute from "./components/ProtectedRoute"
import ChatApp from "./pages/chatapp"
import Personaldiary from "./pages/Diary"
import Profile from "./pages/ProfileComponent"
import Main from "./pages/Main"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // If using icons



function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perosnaldiary"
          element={
            <ProtectedRoute>
              <Personaldiary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />
        


     <Route
  path="/user/*"
  element={
    <ProtectedRoute>
      <Main />
    </ProtectedRoute>
  }
/>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App