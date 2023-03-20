import React from 'react'
import {
    useEffect, useState
} from 'react'
import { Button } from 'semantic-ui-react'
import ConfirmationPage from './confirmation';
let menu;
export default function AddItem() {
    const [items, setItems] = useState([])
    const [type, setType] = useState('Other')
    const [other, setOther] = useState(true)
    const [confirm, setConfirm] = useState(true)
    const [formData, setFormData] = useState({
        itemType: 'Other',
        ifOther: "",
        itemName: '',
        Link: '',
        Price: '',
        Calories: ''
    })

    // Fetches data from server on first render
    useEffect(() => {
        fetch("http://192.168.1.18:3004/Menu")
            .then((response) => response.json())
            .then((data) => {
                menu = data
                let keys = Object.keys(data);
                setItems(keys)
            })

    }, []);

    // Changes items list accordingly 
    const handleType = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
        setType(e.target.value)
        setOther(e.target.value === 'Other')
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    // Handle form submit 
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://192.168.1.18:3004/addItem', {
            method: 'POST',
            body: JSON.stringify(
                formData
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        setConfirm(false)
    }



    return (
        <>
            {confirm &&
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="itemType"> Item Type :
                            <select className="form-select form-select-lg mb-3" name="itemType" id="itemType" onChange={handleType} required >
                                <option value='Other' selected >Other </option>
                                {items.map((itemType) => (
                                    <option key={itemType} value={itemType}>{itemType}</option>
                                ))}
                            </select>
                        </label>

                        {other &&
                            <label htmlFor="" id="other">Mention If Other
                                <input id="oth" name="ifOther" className="form-control form-control-lg " type="text" value={formData.ifOther} onChange={handleInputChange} placeholder="If Other"
                                    required />
                            </label>
                        }

                        <br />
                        <label htmlFor="">Item Name :
                            <input onChange={handleInputChange} name="itemName" value={formData.itemName} className="form-control form-control-lg" type="text" placeholder="New Item" required />
                        </label>
                        <br />
                        <label htmlFor="">Item Price :
                            <input onChange={handleInputChange} name="Price" value={formData.itemPrice} className="form-control form-control-lg" type="number" placeholder="Price In Ruppees" required
                                min="0" />
                        </label>
                        <br />

                        <label htmlFor="">Item Calories :
                            <input name="Calories" onChange={handleInputChange} value={formData.Calories} className="form-control form-control-lg" type="number" placeholder="Calories Per Serving"
                                required min="0" />
                        </label>
                        <br />
                        <label htmlFor="">Item Link :
                            <input onChange={handleInputChange} value={formData.Link} name="Link" className="form-control form-control-lg" type="text" placeholder="Item Image Link" required />
                        </label>
                        <br />
                        <center>
                            <Button content='ADD ITEM' type="submit" primary />
                        </center>

                    </form>


                </div>
            }
            {!confirm && <ConfirmationPage type="Added" iName={formData.itemName} />}
        </>
    )
}
