import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Login  from "./components/auth/login/login.tsx";
import Register from "./components/auth/register/register.tsx";
import Dashboard  from "./components/dashboard/dashboard.tsx";
import "./App.css";

function App() {
  return (
    <Router>
           <div className="App">
           <Routes>
                 
                 <Route exact path='/login' element={< Login />}></Route>
                 <Route exact path='/register' element={< Register />}></Route>
                 <Route path='/' element={< Dashboard />}></Route>
          </Routes>
          </div>
       </Router>
  );
}

export default App;
