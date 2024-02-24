import './App.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile';

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
