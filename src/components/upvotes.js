import React, { useState, useEffect } from 'react'
import { Icon, Table, Header, Image } from 'semantic-ui-react';


export default function Upvotes() {
    const [menu, setMenu] = useState([])
    const [upvotes, setUpvotes] = useState([])
    const toggle = false;
    useEffect(() => {
        fetch("http://192.168.1.18:3004/Menu")
            .then((response) => response.json())
            .then((data) => {
                setMenu(data)
            })
        fetch("http://192.168.1.18:3004/Upvotes")
            .then((response) => response.json())
            .then((data) => {
                setUpvotes(data)
            })
    }, []);
    // let type = Object.keys(menu).filter((type) => (Object.keys(menu[type]).includes()))[0]


    return (
        <div className='container' style={{
            height: "500px",
            overflowY: "scroll"
        }}>
            <Table basic='very' celled collapsing style={{
                paddingLeft: '8%'
            }}  >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ fontSize: 'Large' }}>Item</Table.HeaderCell>
                        <Table.HeaderCell style={{ fontSize: 'Large' }}>Up Votes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {upvotes.map((item) => {
                        let type = Object.keys(menu).filter((type) => (Object.keys(menu[type]).includes(item[0])))[0]
                        return (
                            <>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Image src={menu[type][item[0]]["Link"]} rounded size='medium' />
                                            <Header.Content>
                                                {item[0]}
                                                <Header.Subheader style={{ textAlign: 'left' }}>{type}</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{item[1]}</Table.Cell>
                                </Table.Row>
                            </>
                        )

                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
