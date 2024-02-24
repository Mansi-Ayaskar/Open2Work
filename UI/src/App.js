import './App.css';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="*"
          element={
            <div style={{ padding: 20 }}>
              <h2>404: Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </Router>
    // <div className="App">

    // </div>
  );
}

export default App;
