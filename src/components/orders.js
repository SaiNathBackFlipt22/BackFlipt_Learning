import React, { useState, useEffect } from 'react'
import { Select, Table } from 'semantic-ui-react'



const SelectExample = () => {

    let [date, setDate] = useState([]);
    let [options, setOptions] = useState([]);
    let [order, setOrder] = useState([])

    const handleChange = (event, { value }) => {
        setOrder(date[value])
    }

    useEffect(() => {
        fetch("http://192.168.1.18:3004/orders")
            .then((response) => response.json())
            .then((data) => {
                setDate(data)
            })
    }, []);
    const temp = Object.keys(date).map((date1) => ({ key: date1, value: date1, text: date1 }))

    return (
        <>
            <div className='container' style={{
                height: "500px",
                overflowY: "scroll"
            }}>
                <label htmlFor="">Select Date :
                    <Select placeholder='Select Date' options={temp} onChange={handleChange} />
                </label>
                <Table basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Order</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {order.map((item) => {

                            let list = item["order"].map(item => item)
                            list = list.join(" , ")


                            return (
                                <>

                                    <Table.Row>
                                        <Table.Cell>{item["userName"]}</Table.Cell>

                                        <Table.Cell>{list}</Table.Cell>

                                    </Table.Row>
                                </>
                            )
                        })}

                    </Table.Body>
                </Table>
            </div>
        </>
    )

}


export default SelectExample