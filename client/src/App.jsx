import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Map from './pages/Map';
import Service from './pages/Service';
import Entities from './pages/Entities';
import EntitieDetail from '../src/pages/EntitieDetail';
import SingUpEntitie from './pages/SingUpEntitie';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/service" element={<Service />} />
        <Route path="/entities" element={<Entities />} />
        <Route path="/entitie/:id" element={<EntitieDetail />} />
        <Route path="/beVdV" element={<SingUpEntitie />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
