
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Menu,Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './functions/auth';
import { setAdmin, setLogins } from './reducers/globalStates';
import Cookies from "universal-cookie/es6";
import ErrorPage from './error'





const Navbar = () => {
    const cookie = new Cookies()

    const username = cookie.get("username")

    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const destroySession = async () => {
        let flag = await logout();
        if (flag === true) {
            dispatcher(setLogins(false, null), setAdmin(false));
            navigate("/snacks/authenticate");
        } else {
            return false;
        }
    };
    const State = useSelector((state) =>
        state.globalStates
    )

    const [admin, setadmin

    ] = useState(true)

    const handleChange = (event, { to }) => {
        setActiveItem(to)
    }

    const [activeItem, setActiveItem] = useState('')
    return (
        <>
            {State.loggedIn ? (<>
                <Menu inverted fixed="top" >
                    <Menu.Item active={activeItem === '/'} as={Link} to="/" onClick={handleChange} >

                        <Icon name="home" />
                        HOME
                    </Menu.Item>
                    <Menu.Item active={activeItem === '/feedBack'} as={Link} to="/feedBack" onClick={handleChange}>
                        <Icon name="comment" />
                        FEEDBACK
                    </Menu.Item>
                    <Menu.Item active={activeItem === '/OrderFood'} as={Link} to="/OrderFood" onClick={handleChange}>
                        <Icon name="food" />
                        ORDER FOOD
                    </Menu.Item>
                    {(cookie.get("admin")) === "true" &&
                        <>
                            <Menu.Item active={activeItem === '/addItem'} as={Link} to="/addItem" onClick={handleChange}>
                                <Icon name="add square" />
                                ADD ITEM
                            </Menu.Item>
                            <Menu.Item active={activeItem === '/menu'} as={Link} to="/menu" onClick={handleChange}>
                                <Icon name="clipboard list" />
                                MENU
                            </Menu.Item>
                            <Menu.Item active={activeItem === '/editItem'} as={Link} to="/editItem" onClick={handleChange}>
                                <Icon name='edit' />
                                EDIT ITEM
                            </Menu.Item>
                            <Menu.Item active={activeItem === '/upvotes'} as={Link} to="/upvotes" onClick={handleChange}>
                                <Icon name='thumbs up outline' />
                                UPVOTES
                            </Menu.Item>
                            <Menu.Item active={activeItem === '/orders'} as={Link} to="/orders" onClick={handleChange}>
                            <Icon name='shopping cart' />
                                
                            ORDERS
                            </Menu.Item>
                        </>}
                    <Menu.Item active={activeItem === '/myOrders'} as={Link} to="/myOrders" onClick={handleChange}>
                        <Icon name='ordered list' />

                        MY ORDERS
                    </Menu.Item>
                        


                    <Menu.Menu position="right">
                        <Dropdown
                            
                            item
                            trigger={
                                <>
                                    <Icon name="user circle" />
                                    {username}
                                </>
                            }
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={destroySession}>
                                    <Icon name="sign-out" />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>


                </Menu>
            </>) : (
                    <ErrorPage/>
                
            

            )}
        </>
    );
};



export default Navbar;
