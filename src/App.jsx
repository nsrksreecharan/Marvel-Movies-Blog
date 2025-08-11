import './App.css'
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import ProtectedRoute from './pages/ProtectedRoute';
// import Signup from './pages/Signup';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import { Provider } from 'react-redux';
import store from './redux/store';
import Stats from './pages/Stats';
import Register from './pages/Register';




const router=createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movies/:movieId" element={<MovieDetail/>}/>
          <Route path="/stats" element={<Stats/>}/>
        </Route>
      </Route>
    </Route>
  )
)
const App=()=>{
  return (
    <Provider store={store}>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App;
