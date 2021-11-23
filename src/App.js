import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './AuthProvider/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import MyOrder from './Pages/Dashboard/MyOrder/MyOrder';
import Payment from './Pages/Dashboard/Payment/Payment';
import ReviewUser from './Pages/Dashboard/ReviewUser/ReviewUser';
import Home from './Pages/Home/Home/Home';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import Login from './Pages/Login/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Register from './Pages/Login/Register/Register';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/placeOrder/:id" element={<PrivateRoute><PlaceOrder></PlaceOrder></PrivateRoute>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
              <Route path="/dashboard" element={<MyOrder></MyOrder>}></Route>
              <Route path="/dashboard/payment" element={<Payment></Payment>}></Route>
              <Route path="/dashboard/reviewUser" element={<ReviewUser></ReviewUser>}></Route>
              <Route path="/dashboard/makeAdmin" element={<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
