import React, { useState, useEffect } from 'react'
import { Header, Image, Table } from 'semantic-ui-react'
import Cookies from "universal-cookie/es6";


const cookie = new Cookies();

export default function TableExampleCollapsing() {

    const [orders, setOrders] = useState([])

    const userName = cookie.get("username");

    useEffect(() => {
        fetch('http://192.168.1.18:3004/myOrders', {
            method: 'POST',
            body: JSON.stringify(
                { username: userName }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then((data) => setOrders(data))
    }, [])





    return (


        <>
            <div className='container' style={{
                height: "500px",
                overflowY: "scroll"
            }}>
                <center>
                    <Table basic='very' celled collapsing >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Order Id</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Order</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {orders.map((item) => {

                                let list = item["order"].map(item => item)
                                list = list.join(" , ")


                                return (
                                    <>

                                        <Table.Row>
                                            <Table.Cell>{item["orderId"]}</Table.Cell>
                                            <Table.Cell>{item["date"]}</Table.Cell>

                                            <Table.Cell>{list}</Table.Cell>

                                        </Table.Row>
                                    </>
                                )
                            })}

                        </Table.Body>
                    </Table>
                </center>
            </div>
        </>
    )
}