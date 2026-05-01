import { Routes, Route } from 'react-router'
import Readme from './pages/readme';
import  RSSComponent  from './pages/rss'
import Navbar from './pages/navbar';

function App() {
  return (
    <>

    <Navbar />
    <Routes>
      <Route path="/" element={<Readme />} />
      <Route path='/rss' element={<RSSComponent />} />
    </Routes>    

    </>

  );
}

export default App;
