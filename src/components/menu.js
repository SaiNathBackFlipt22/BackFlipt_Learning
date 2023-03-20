import React from 'react'
import { useEffect, useState } from 'react'
import { Header, List, Icon } from 'semantic-ui-react'
import '../styles/menu.css'
export default function Menu() {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch("http://192.168.1.18:3004/Menu")
            .then((response) => response.json())
            .then((data) => {
                setMenu(data)
            })
    }, [menu]);
    const delItem = (event, { value }) => {
        let type = (Object.keys(menu).filter((type) => (Object.keys(menu[type]).includes(value)))[0])
        const confirmDelete = window.confirm(`Are you sure you want to delete ${value} from ${type}?`);
        if (confirmDelete) {
            let formData = {
                itemType: type,
                itemName: value,
                removeAll: "false"

            }
            fetch('http://192.168.1.18:3004/removeItem', {
                method: 'POST',
                body: JSON.stringify(
                    formData
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
        }
    }

    const delType = (event, { value }) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete  ${value}?`);
        if (confirmDelete) {
            let formData = { itemType: value, removeAll: 'true' }
            fetch('http://192.168.1.18:3004/removeItem', {
                method: 'POST',
                body: JSON.stringify(
                    formData
                ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })

        }
    }

    return (
        <div className='container' style={{
            height: "600px",
            overflowY: "scroll"
        }}>
            {Object.keys(menu).map(type => {
                return (
                    <>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Header size='large' style={{ color: '#d04669', marginBottom: '5%' }}>{type} </Header>
                            <Icon name="trash alternate" size='large' style={{ paddingLeft: "20px", marginTop: "3px", color: 'red' }} value={type} onClick={delType} />
                        </div>
                        <List>
                            {Object.keys(menu[type]).map(item => {
                                return (
                                    <>
                                        <div style={{ display: "flex" }}>
                                            <List.Item style={{ marginLeft: '25%', fontSize: "larger" }} >{item}</List.Item> <Icon value={item} name="trash alternate" style={{ marginLeft: "auto", marginRight: "25%" }} onClick={delItem} />
                                        </div>
                                        <br />
                                    </>
                                )
                            }
                            )}

                        </List>
                    </>
                )
            })}
        </div>
    )
}
