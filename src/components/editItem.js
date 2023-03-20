import React from 'react'
import '../styles/feedBack.css'
import { Button } from 'semantic-ui-react'
import {
    useEffect, useState
} from 'react'
import ConfirmationPage from './confirmation'

export default function EditItem() {
    const [items, setItems] = useState([])
    const [list, setlist] = useState([])
    const [menu, setMenu] = useState([])
    const [confirm, setConfirm] = useState(true)
    const [formData, setFormData] = useState({
        itemType: '',
        PitemName: '',
        itemName: '',
        Link: '',
        Price: '',
        Calories: ''
    })


    useEffect(() => {
        fetch("http://192.168.1.18:3004/Menu")
            .then((response) => response.json())
            .then((data) => {
                setMenu(data)
                let keys = Object.keys(data);
                setItems(keys)
            })

    }, []);


    function itemType(e) {


        setlist(Object.keys(menu[e.target.value]))
        setFormData({ ...formData, itemType: e.target.value });
    }

    function itemName(event) {
        const { name, value } = event.target;
        let item = menu[formData.itemType][value]
        setFormData({ ...formData, [name]: value });
        setFormData(prevState => ({ ...prevState, Price: item["Price"], itemName: value, Link: item["Link"], Calories: item["Calories"] }));

    }



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://192.168.1.18:3004/edit', {
            method: 'POST',
            body: JSON.stringify(
                formData
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        setConfirm(false)
        // setFormData({
        //     itemType: '',
        //     PitemName: '',
        //     itemName: '',
        //     Link: '',
        //     Price: '',
        //     Calories: ''
        // })
    }

    return (
        <>

            {confirm &&
                <div className="container" >


                    <form id="myForm" onSubmit={handleSubmit}>

                        <label htmlFor="itemType"> Item Type :
                            <select className="form-select form-select-lg mb-3" name="itemType" id="itemType" onChange={itemType} required >
                                <option value="" disabled selected hidden>Items Type </option>
                                {items.map((itemType) => (
                                    <option key={itemType} value={itemType}>{itemType}</option>
                                ))}
                            </select>
                        </label>

                        <br />
                        <label htmlFor="" id="itemNames">Select Item :
                            <select className="form-select form-select-lg mb-3" name="PitemName" id="itemName" onChange={itemName} required>
                                <option value="" disabled selected hidden>Item Name </option>
                                {list.map((item) => (
                                    <option key={item} value={item}>{item} </option>
                                ))}
                            </select>
                        </label>

                        <br />
                        <label htmlFor=""> New Item Name :
                            <input key={new Date().now} name="itemName" class="form-control form-control-lg" type="text" placeholder="New Item"
                                required value={formData.itemName} onChange={handleChange} />
                        </label>
                        <br />
                        <label htmlFor="">Item Price :
                            <input name="Price" class="form-control form-control-lg" type="number"
                                placeholder="Price In Ruppees" min="0" required value={formData.Price} onChange={handleChange} />
                        </label>
                        <br />
                        <label htmlFor="">Item Calories :
                            <input name="Calories" class="form-control form-control-lg" type="number"
                                placeholder="Calories Per Serving" min="0" required value={formData.Calories} onChange={handleChange} />
                        </label>
                        <br />
                        <label htmlFor="">Item Link :
                            <input name="Link" class="form-control form-control-lg" type="text" placeholder="Item Image Link"
                                required value={formData.Link} onChange={handleChange} />
                        </label>
                        <br />
                        <center>
                            <Button content='EDIT ITEM' type="submit" primary />
                        </center>
                    </form >
                </div>}

            {!confirm && <ConfirmationPage type="Edited" iName={formData.PitemName} />}
        </>
    )
}
