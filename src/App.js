import './App.css';
import { Fragment } from 'react';
import { TopMenu } from './Components/TopMenu';
import { Routes, Route } from 'react-router-dom';
import {Register} from './Components/Register';
import SignIn from './Components/Login';
import { Content } from './Components/Content';
import { Settings } from './Components/Settings';
import "./ImageDatabase.js";

function App() {

  return (
    <Fragment>
      <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/Register" element={<Register/>} />

      <Route path="/Home" element=
      {<>
      <TopMenu />
      <Content />
      </>
      } />

      <Route path="/Settings" element=
      {<>
      <TopMenu />
      <Settings />
      </>
      } />

      </Routes>
    </Fragment>
  )
}

export default App;
