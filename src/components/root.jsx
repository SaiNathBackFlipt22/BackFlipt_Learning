
// // import Test from "./test";
// import React, { useState } from 'react';
// import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './navbar';
// import Home from './home'
// import FeedBackForm from './feedBackForm'
// import OrderFood from './orderFood'
// import Temp from './temp'
// import AddItem from './addItem'
// import Menu from './menu'
// import EditItem from './editItem'
// import Upvotes from './upvotes';

// export default function App() {

//     const [admin, setAdmin] = useState(true)


//     return (
//         // <Router>
//             <div >
//                 <Navbar />

//                 {/* <div style={{ marginTop: '7vh', position: 'relative' }}>
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/feedBack" element={<FeedBackForm />} />
//                         <Route path="/orderFood" element={<OrderFood />} />
//                         {admin &&
//                             <>
//                                 <Route path="/temp" element={<Temp />} />
//                                 <Route path="/addItem" element={<AddItem />} />
//                                 <Route path="/menu" element={<Menu />} />
//                                 <Route path="/editItem" element={<EditItem />} />
//                                 <Route path="/upvotes" element={<Upvotes />} />
//                             </>}
//                     </Routes>
//                 </div> */}
//             </div>
//         // {/* </Router> */}
//     )

// }


import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { checkAuth } from './functions/auth';
import { setAdmin, setLogins } from './reducers/globalStates';
import Navbar from './navbar'


export default function Root() {
    const dispatcher = useDispatch();
    const cookie = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        checkAuth().then((res) => {
            if (res) {
                dispatcher(
                    setLogins([res, cookie.get("username")]),
                    setAdmin(cookie.get("role") === "true")
                );
            } else {
                cookie.set("session_id", "", { path: "/", expires: new Date() });
                dispatcher(setLogins([false, null]), setAdmin(false));
                navigate("/login")
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '7vh', position: 'relative' }}>
            <Outlet />
            </div>
        </div>
    )
}










