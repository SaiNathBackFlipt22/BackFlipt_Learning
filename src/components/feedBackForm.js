import React from 'react'
import '../styles/feedBack.css'
import { Button } from 'semantic-ui-react'
import {
    useEffect, useState
} from 'react'
import { Rating, Message } from 'semantic-ui-react'
let menu;
// import '../styles/feedBack'

export default function Fbf() {
    const [confirm, setConfirm] = useState(true)

    const [items, setItems] = useState([])
    const [list, setlist] = useState([])
    const [formData, setFormData] = useState({
        itemType: '',
        itemName: '',
        Rating: 3,
        FeedBack: ''
    })


    useEffect(() => {
        fetch("http://192.168.1.18:3004/Menu")
            .then((response) => response.json())
            .then((data) => {
                menu = data
                let keys = Object.keys(data);
                setItems(keys)
            })

    }, []);


    function itemType(e) {
        setlist(Object.keys(menu[e.target.value]))
        setFormData({ ...formData, itemType: e.target.value });
    }

    const handleRate = (e, { rating }) => {
        setFormData({ ...formData, Rating: rating });
    };

    function itemName(e) {

        setFormData({ ...formData, itemName: e.target.value });
    }

    function feedBack(e) {

        setFormData({ ...formData, FeedBack: e.target.value });
    }

    function feedBackPost(event) {
        event.preventDefault();
        fetch('http://192.168.1.18:3004/feedBack', {
            method: 'POST',
            body: JSON.stringify(
                formData
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        // setFormData({ ...formData, FeedBack: "" });
        setConfirm(false)

    }

    return (
        <>
            {confirm &&
                <div className='container' >


                    <form id="myForm" onSubmit={feedBackPost}>

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
                            <select className="form-select form-select-lg mb-3" name="itemName" id="itemName" onChange={itemName} required>
                                <option value="" disabled selected hidden>Item Name </option>
                                {list.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </label>


                        <input type="number" id="starRating" name="Rating" defaultValue={formData.Rating} style={{ visibility: 'hidden' }} />
                        <br />
                        <label htmlFor="" id="Rating">Rating:
                            <br />
                            <Rating maxRating={5} defaultRating={formData.Rating} icon='star' onRate={handleRate} size='massive' />
                        </label>

                        <br />
                        <label >FeedBack :<br />
                            <textarea name="FeedBack" id="feedBack" cols="30" rows="50" value={formData.FeedBack} onChange={feedBack} required ></textarea>
                        </label>

                        <br />
                        <center>
                            <Button content='ADD FEEDBACK' type="submit" primary />
                        </center>
                    </form>

                </div>
            }
            {!confirm &&
                <div className='container'>
                    <Message positive>
                        <Message.Header>Thanks for your feedback!</Message.Header>
                        <p>We appreciate your input and will use it to improve our service.</p>
                    </Message>
                </div>}
        </>


    )
}
