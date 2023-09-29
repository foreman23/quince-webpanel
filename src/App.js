import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
