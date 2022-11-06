import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import 'assets/styles/main.scss';
import AppRouter from 'pages/app';
import AuthRouter from 'pages/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUserStore } from 'context';

const qc = new QueryClient();

const App = () => {
  const id = useUserStore(state => state.id);
  return (
    <QueryClientProvider client={qc}>
      <Router>
        <Routes>
          <Route path="app/*" element={<AppRouter />} />
          <Route path="auth/*" element={<AuthRouter />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
