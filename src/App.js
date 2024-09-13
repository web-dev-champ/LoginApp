import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

// LoginPage Component
const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const correctUsername = 'user';
  const correctPassword = 'pass';
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === correctUsername && password === correctPassword) {
      toast.success('Login successful!');
      setLoggedIn(true);
      navigate('/home');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

// HomePage Component
const HomePage = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false); // Clear login state
    navigate('/'); // Redirect to the login page
  };

  return (
    <Container className="mt-5">
      <h2>Welcome to the Home Page</h2>
      <p>This is the home page content.</p>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

// App Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className={`min-vh-100 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <ToastContainer />
      <Router>
        <Navbar
          bg={isDarkMode ? 'dark' : 'light'}
          variant={isDarkMode ? 'dark' : 'light'}
          expand="lg"
          className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
        >
          <Container>
            <Navbar.Brand href="/">LoginApp</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/">Login</Nav.Link>
            </Nav>
            <Button variant="outline-primary" onClick={toggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path="/home" element={loggedIn ? <HomePage setLoggedIn={setLoggedIn} /> : <LoginPage setLoggedIn={setLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
