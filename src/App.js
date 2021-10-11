import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './Components/WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Preview from './Components/Preview';
import Sendpost from './Components/Sendpost';
import Open from './Components/Open';
import { useDispatch, useSelector } from 'react-redux';
import { login, Logout, selectUser } from './features/appSlice';
import Login from './Components/Login';
import { auth } from './Firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((result) => {
      if (result) {
        console.log("rsules", result);
        dispatch(login({
          username: result.displayName,
          Profilepic: result.photoURL,
          id: result.uid
        }))
      } else {
        dispatch(Logout())
      }
    })
  }, [])
  return (
    <div className="app">
      <>
        <img className="app_logo" src='https://th.bing.com/th/id/R.01d85ad0fb5c80379bf077349345982a?rik=rw%2fHZ%2fXquJ3TYA&pid=ImgRaw&r=0' />
        <Router>
          {!user ? (
            <Login />
          ) : (
            <div className="app__body" >
              <div className="app__bodybackground">
                <Switch>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route exact path='/Preview'>
                    <Preview />
                  </Route>
                  <Route exact path='/sendpost'>
                    <Sendpost />
                  </Route>
                  <Route exact path='/open'>
                    <Open />
                  </Route>
                </Switch>

              </div>

            </div>
          )}

        </Router>
      </>
    </div>
  );
}

export default App;
