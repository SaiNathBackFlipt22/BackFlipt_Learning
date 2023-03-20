
import React, { useState, useEffect } from 'react'
import '../styles/order.css'
import { Checkbox, Header, Card, Icon, Image, Rating, Button } from 'semantic-ui-react'
import OrderConfirmation from './orderConfirmation'
import Cookies from "universal-cookie/es6";


const cookie = new Cookies();


export default function OrderFood() {

    const userName = cookie.get("username");

    const [selected, setSelected] = useState([]);
    const [isAllowed, setIsAllowed] = useState(true);
    const [menu, setMenu] = useState([]);
    const [hoverData, setHoverData] = useState(null);
    const [showContent, setShowContent] = useState(false);


    const handleMouseOver = (event) => {
        if (event.target.innerHTML[0] !== '<') {
            let item = event.target.innerHTML

            let type = Object.keys(menu).filter((type) => (Object.keys(menu[type]).includes(event.target.innerHTML)))[0]
            setHoverData(< Card size="small" >
                <Image src={menu[type][item]['Link']} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{item}</Card.Header>
                    <Card.Meta>
                        <span >{type}</span>
                    </Card.Meta>
                    <Card.Description>
                        Rating : <Rating defaultRating={Math.round(menu[type][item]['Rating'][0])} maxRating={5} disabled />
                    </Card.Description>
                    <br />
                    
                    <Card.Description>
                        Calories : {menu[type][item]['Calories']}
                    </Card.Description>
                    <Card.Description>
                        Upvotes : {menu[type][item]['upvotes']}
                    </Card.Description>

                </Card.Content>
                <Card.Content extra>
                    <Card.Header><Icon name='rupee' />
                        {menu[type][item]['Price']}
                    </Card.Header>
                </Card.Content>
            </Card >);
        }
    };




    const handleMouseLeave = () => {
        setHoverData(null);
    };

    const handleCheckboxChange = (event, data) => {
        const isChecked = data.checked;
        const value = data.value;
        if (isChecked) {
            if (selected.length < 2) {
                setSelected([...selected, value]);
            }
        } else {
            setSelected(selected.filter(item => item !== value));
        }


    };
    useEffect(() => {

        fetch("http://192.168.1.18:3004/isAllowed", {
            method: 'POST',
            body: JSON.stringify(
                { userName: userName }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.isAllowed)
                
                setSelected(data.selected)

                setIsAllowed(data.isAllowed)
                if (data.isAllowed) {
                    fetch("http://192.168.1.18:3004/Menu")
                        .then((response) => response.json())
                        .then((data) => {
                            setMenu(data)
                        })
                }
                })
    
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault()
        let formData = {}
        let data = selected.map(item => {
            let type = Object.keys(menu).filter((type) => (Object.keys(menu[type]).includes(item)))[0]
            return (
                [type, item]
            )
        })

        data.map(item => {
            if ((Object.keys(formData).includes(item[0]))) {
                formData[item[0]] = formData[item[0]].concat([item[1]])
            }
            else {
                formData[item[0]] = [item[1]]
            }

        })
        fetch('http://192.168.1.18:3004/userData', {
            method: 'POST',
            body: JSON.stringify(
                formData
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1; // getMonth() returns a zero-based index
        let day = today.getDate();

        // Add leading zeros to month and day values
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }

        let formattedDate = `${year}-${month}-${day}`;


        let now = new Date();
        let randomNumber = Math.floor(Math.random() * 100000000);

        // Make sure the number has 5 digits by adding leading zeros if necessary
        let orderId = ("0000" + randomNumber).slice(-5);


        var orderData = {
            userName: userName,
            date: formattedDate,
            orderId: orderId,
            order: selected

        }
        fetch('http://192.168.1.18:3004/orderData', {
            method: 'POST',
            body: JSON.stringify(
                orderData
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }

        })

        setIsAllowed(false)

        // setSelected([])

    };

    return (
        <>
           
            {isAllowed &&
                <div className="grid-container">
                    <div className="column1">{hoverData}</div>
                    <div className="column2"> <br />

                        <form onSubmit={handleSubmit}>

                            {Object.keys(menu).map(type => {
                                return (
                                    <>
                                        <br />
                                        <Header size='large' style={{ color: '#d04669' }}>{type}</Header>
                                        {Object.keys(menu[type]).map(item => {
                                            return (
                                                <div className='item'>
                                                    < Checkbox label={item} value={item} checked={selected.includes(item)} onChange={handleCheckboxChange} onMouseOver={handleMouseOver}
                                                        onMouseLeave={handleMouseLeave} />

                                                    <span className='price'><Icon name='rupee' />{menu[type][item]['Price']}</span>
                                                    <br />

                                                </div>
                                            )
                                        })}
                                    </>
                                )
                            })}
                            <br />
                            <center>
                                <Button content='ORDER' type="submit" primary />
                            </center>
                            <br />
                            <br />
                            <br />
                            <br />
                        </form>

                    </div>
                    <div className="column3">
                        {selected.map(item => {

                            for (var type in menu) {
                                if (Object.keys(menu[type]).includes(item)) {
                                    return (
                                        <>
                                            <Card size="small">
                                                <Image src={menu[type][item]['Link']} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header>{item}</Card.Header>
                                                    <Card.Meta>
                                                        <span >{type}</span>
                                                    </Card.Meta>

                                                </Card.Content>
                                                <Card.Content extra>
                                                    <Card.Header><Icon name='rupee' />
                                                        {menu[type][item]['Price']}
                                                    </Card.Header>


                                                </Card.Content>
                                            </Card>
                                        </>
                                    )
                                }
                            }
                        })}


                    </div>

                </div>

            }
            

            {!isAllowed &&


                <OrderConfirmation items={selected} />}
            


        </>

    )
}




