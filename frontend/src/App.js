import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import OtherSection from './Pages/OtherSection/OhterSection';
import Clothes from './Pages/Clothes/Clothes';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Account from './Pages/Account/Account';
import MyOrder from './Pages/MyOrder/MyOrder';

function App() {
  const myRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/clothes', element: <Clothes /> },
    { path: '/electronics', element: <OtherSection /> },
    { path: '/furnitures', element: <OtherSection /> },
    { path: '/toys', element: <OtherSection /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/orders', element: <MyOrder /> },
    { path: '/account', element: <Account /> },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
