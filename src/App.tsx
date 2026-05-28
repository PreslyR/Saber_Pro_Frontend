import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { WritingPage } from './pages/WritingPage';
import { RehearsalPage } from './pages/RehearsalPage';
import { LoginPage } from './pages/LoginPage';
import { isAuthenticated } from './services/authService';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute><AppShell /></PrivateRoute>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/comunicacion-escrita" element={<WritingPage />} />
          <Route path="/quiz/:subjectId" element={<QuizPage />} />
          <Route path="/rehearsal/:subjectId" element={<RehearsalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
