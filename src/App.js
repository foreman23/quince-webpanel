import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import LoginScreen from './LoginScreen';
import { auth } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in user authentication
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        {user && <Route path='/main' element={<Main />} />}
      </Routes>
    </Router>
  );
}

export default App;
