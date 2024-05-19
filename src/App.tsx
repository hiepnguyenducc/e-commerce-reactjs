
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/frontend/auth/login';
import Register from './components/frontend/auth/register';
import AdminPrivateRoute from './AdminPrivateRoute';
import axios from 'axios';
import Page404 from './components/errors/Page404';
import Page403 from './components/errors/Page403';
import './assests/frontend/css/about.css';
import './assests/frontend/css/account.css';
import './assests/frontend/css/blog.css';
import './assests/frontend/css/cart.css';
import './assests/frontend/css/checkout.css'
import './assests/frontend/css/contact.css';
import './assests/frontend/css/custom.css'
import './assests/frontend/css/error_track.css';
import './assests/frontend/css/faq.css';
import './assests/frontend/css/home_1.css';
import './assests/frontend/css/jquery.mmenu.all.css';
import './assests/frontend/css/leave_review.css';
import './assests/frontend/css/listing.css';
import './assests/frontend/css/product_page.css';
import './assests/frontend/css/style.css';
import './assests/frontend/css/bootstrap.min.css';
import './assests/frontend/css/bootstrap.css';


import PublicRoute from "./PublicRoute";

axios.defaults.baseURL = "http://127.0.0.1:8001/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<PublicRoute name="Home"/>} />
          <Route path='/403' element={<Page403 />} />
          <Route path='/404' element={<Page404 />} />
          <Route path='*' element={<Page404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminPrivateRoute name="Admin" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
