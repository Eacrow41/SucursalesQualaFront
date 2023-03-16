import { BrowserRouter, Routes , Route } from "react-router-dom";
import ShowSites from './components/ShowSites';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowSites></ShowSites>}></Route>
      </Routes>
    </BrowserRouter>
   );
}

export default App;
