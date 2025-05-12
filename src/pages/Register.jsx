import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import "../styles/Form.css";
import logo from "../assets/SoulSync Logo.png";

function Register({ route = "/accounts/user/register/", method = "register" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post(route, { username, password });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Floating shapes for calming effect */}
      <div id="radius-shape-1"></div>
      <div id="radius-shape-2"></div>
      <MDBRow className="w-100 justify-content-center align-items-center">
        {/* Left side: Logo and welcome text */}
        <MDBCol md="6" className="text-center d-flex flex-column justify-content-center align-items-center">
          <img src={logo} alt="SoulSync AI" style={{ width: 120, marginBottom: 24 }} />
          <h1 className="fw-bold mb-2" style={{ color: "#e0e0e0", letterSpacing: 1 }}>
            Welcome to SoulSync AI
          </h1>
          <p style={{ color: "#b7aaff", fontSize: 18, marginBottom: 0 }}>
            Your safe space for healing and growth.<br />
            <span style={{ color: "#c6b8f7" }}>Create your account to get started.</span>
          </p>
        </MDBCol>
        {/* Right side: Register form */}
        <MDBCol md="6" className="d-flex justify-content-center">
          <MDBCard
            className="bg-glass shadow-lg border-0"
            style={{
              minWidth: 350,
              maxWidth: 400,
              borderRadius: 24,
              background: "rgba(30, 30, 60, 0.75)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            }}
          >
            <form onSubmit={handleSubmit} aria-label="Register form">
              <MDBCardBody className="p-5">
                <h3 className="mb-4 text-center" style={{ color: "#b7aaff" }}>
                  Register
                </h3>
                <MDBInput
                  wrapperClass="mb-4 custom-label-color"
                  label="Username"
                  id="register-username"
                  type="text"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  icon={<MDBIcon icon="user" />}
                  aria-label="Username"
                />
                <MDBInput
                  wrapperClass="mb-4 custom-label-color"
                  label="Password"
                  id="register-password"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  icon={<MDBIcon icon="lock" />}
                  aria-label="Password"
                />
                <MDBBtn
                  color="link"
                  onClick={togglePasswordVisibility}
                  style={{
                    marginTop: '-10px',
                    marginBottom: '15px',
                    float: 'right',
                    color: '#b7aaff',
                    fontSize: '0.9rem'
                  }}
                  tabIndex={0}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  type="button"
                >
                  {passwordVisible ? 'Hide' : 'Show'} Password
                </MDBBtn>
                {loading && (
                  <div className="d-flex justify-content-center mb-3">
                    <LoadingIndicator />
                  </div>
                )}
                {error && (
                  <div className="mb-3 text-danger text-center" style={{ fontWeight: 500 }}>
                    {error}
                  </div>
                )}
                <MDBBtn
                  className="w-100 mb-3"
                  size="lg"
                  style={{
                    background: "linear-gradient(90deg, #5c258d 0%, #3a3a5d 100%)",
                    border: "none",
                    fontWeight: 600,
                    letterSpacing: 1
                  }}
                  type="submit"
                  disabled={loading}
                  aria-label="Register"
                >
                  Register
                </MDBBtn>
                <div className="text-center">
                  <p className="mb-2" style={{ color: "#b7aaff" }}>
                    Already have an account?
                  </p>
                  <MDBBtn
                    outline
                    color="light"
                    size="sm"
                    style={{
                      borderRadius: 16,
                      borderColor: "#b7aaff",
                      color: "#b7aaff"
                    }}
                    onClick={() => navigate("/login")}
                    aria-label="Login"
                  >
                    Login
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </form>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
