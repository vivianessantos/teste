import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home';
import DogSave from './screens/DogSave';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-dogs" element={<DogSave />} />
      </Routes>
    </Router>
  );
}

export default App;
