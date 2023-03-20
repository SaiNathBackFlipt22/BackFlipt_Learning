const express = require('express')
const fs = require('fs')

const app = express()
const ejs = require("ejs")
const path = require('path')
const axios = require('axios')

const connection = require('./connection')
const order = require('./orderConnection')



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', express.static('./views'))


app.set("view engine", "ejs")


//Collect user Order into Database

app.post("/userData", (req, res) => {


    choices = req.body
    async function conn(choices) {

        menu = await connection();

        for (var key in choices) {

            temp = [].concat(choices[key])
            for (var item in temp) {

                 menu.updateOne(
                    { type: key },
                    { $inc: { [`${temp[item]}.upvotes`]: 1 } }
                )
                
            }
        }
    }

    conn(choices);
})



//Add item to menu

app.post('/addItem', (req, res) => {
    newItem = req.body
    flag = 0
    if (newItem.itemType != 'Other') {

        async function conn(newItem) {

            menu = await connection()
            data = await menu.updateOne(
                { type: newItem.itemType },
                {
                    $set: {
                        [newItem.itemName]: {
                            "upvotes": 0, "Price": newItem.Price, "Link": newItem.Link, "Calories": newItem.Calories, "Rating": [
                                4,
                                0
                            ],
                            "Feedback": []
                        }
                    }
                } // add the key-value pair
            )
        }

        conn(newItem);
    }
    else {
        flag = 1
        type = newItem.ifOther
        async function conn(newItem) {

            menu = await connection()
            data = await menu.insertOne(
                {
                    type: type, [newItem.itemName]: {
                        "upvotes": 0, "Price": newItem.Price, "Link": newItem.Link, "Calories": newItem.Calories, "Rating": [
                            4,
                            0
                        ],
                        "Feedback": []
                    }
                }
            )

        }

        conn(newItem);

    }
    res.status(204).send()

});


//Remove Item from Menu

app.post('/removeItem', (req, res) => {


    delItem = req.body
    async function conn(delItem) {
        menu = await connection()
        if (delItem.removeAll == 'false') {
            delItem.itemType = delItem.itemType.trim()
            delItem.itemName = delItem.itemName.trim()
            data = await menu.updateOne(
                { type: delItem.itemType },
                { $unset: { [delItem.itemName]: "" } }
            )

            const doc = await menu.findOne({ type: delItem.itemType });
            len = (Object.keys(doc).length)

            if (len === 2) {
                res = await menu.deleteOne({ type: delItem.itemType });

            }

        }
        else {
            res = await menu.deleteOne({ type: delItem.itemType });
        }
    }



    conn(delItem);


    res.status(204).send()

})



//Send menu as response on request

app.get('/Menu', (req, res) => {

    async function conn() {
        res1 = {}
        menu = await connection()
        data = await menu.find({}).toArray()

        for (i in data) {
            res1[data[i]['type']] = data[i]
        }
        for (j in res1) {
            delete res1[j]['type']
            delete res1[j]['_id']
        }
        res.send(res1)
    }

    conn();
})



//Sends items and their Respective upvotes in sorted order
app.get('/Upvotes', (req, res) => {
    async function conn() {
        res1 = {}
        menu = await connection()
        data = await menu.find({}).toArray()

        for (i in data) {
            res1[data[i]['type']] = data[i]
        }
        for (j in res1) {
            delete res1[j]['type']
            delete res1[j]['_id']
        }

        obj = res1
        temp = {}
        for (var i in obj) {
            items = obj[i]
            for (var j in items) {
                temp[j] = items[j]['upvotes']
            }
        }
        const entries = Object.entries(temp);
        entries.sort((a, b) => b[1] - a[1]);
        res.send(entries)
    }

    conn();
})


//Collects feedback information

app.post('/feedBack', (req, res) => {

    data = req.body

    async function conn(data) {

        menu = await connection()
        item = await menu.find({ type: data.itemType }).toArray()
        newData = item[0][data.itemName]

        newData['Feedback'].push(data.FeedBack)

        avgRating = parseFloat(newData['Rating'][0])

        Total = parseInt(newData['Rating'][1])
        avgRating = Math.round((((avgRating * Total) + parseInt(req.body.Rating)) / (Total + 1)) * 100) / 100
        newData['Rating'][0] = avgRating

        newData['Rating'][1] += 1
        final = await menu.updateOne(
            { type: data.itemType },
            { $set: { [data.itemName]: newData } }
        )

        res.status(204).send()
    }



    conn(data);


})





//Edit Item

app.post('/edit', (req, res) => {
    edit = req.body
    async function conn(edit) {
        menu = await connection()
        data = await menu.find({ type: edit.itemType }).toArray()
        res = data[0][edit.PitemName]
        cres = data[0][edit.PitemName]
        res['Price'] = edit.Price
        res['Calories'] = edit.Calories
        res['Link'] = edit.Link
        if (edit.PitemName !== edit.itemName) {
            data = await menu.updateOne(
                { type: edit.itemType },
                { $rename: { [edit.PitemName]: edit.itemName } }
            )
        }
        data = await menu.updateOne(
            { type: edit.itemType },
            { $set: { [edit.itemName]: res } }
        )
    }


    conn(edit);

    res.status(204).send()
})



//Health check api

app.get('/health', (req, res) => {

    health = { Server: "Healthy", Database: "Unestablished" }

    async function conn() {

        try {
            const result = await connection()
            health.Database = "Established"
            res.status(200).send(health);
        } catch (error) {
            res.status(500).send(health);
        }
    }
    conn()
})


//User Logout
app.post("/logout", (req, res) => {
    axios
        .post(
            "https://backflipt-accounts.onrender.com/clearSession",
            { session_id: req.body.session_id },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) =>
            response.data ? res.send(response.data) : response.send(false)
        );
});


//User authentication

app.post("/auth", (req, res) => {
    axios
        .post(
            "https://backflipt-accounts.onrender.com/checkAuth",
            {
                session_id: req.body.session_id,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            res.status(200).send(response.data);
        })
        .catch((err) => {
            res.status(503).send("Server Down");

        });
});



//adding order data to order database
app.post('/orderData', (req, res) => {

    newItem = req.body
    console.log(newItem)

    // console.log(newItem)
    async function conn(newItem) {

        menu = await order()

        data = await menu.insertOne(newItem, function (err, res) {
            if (err) throw err;
            // console.log("1 document inserted");
            client.close();
        });
        console.log(data)
    }

    conn(newItem);
    res.status(204).send()
})

app.post("/isAllowed", (req, res) => {
    // console.log("isAllowed")

    newItem = req.body
    async function conn(newItem) {

        menu = await order()

        data = await menu.find({ userName: newItem.userName }).sort({ _id: -1 }).toArray()
        const currentDate = new Date().toISOString().substring(0, 10);
        temp = {
            isAllowed: (data[0]["date"] < currentDate),
            selected : data[0]["order"]
        }
        res.send(temp)
    }

    conn(newItem);

})

// app.get("/del", (req, res) => {
//     async function conn() {

//         menu = await order()

//         data = await menu.deleteMany({ date: '2023-03-15' })
          
//         console.log(data)
//     }

//     conn();
//     res.status(204).send("deleted")
    
// })

//route for sending all orders grouped by date
app.get('/orders', (req, res) => {
    async function conn() {

        menu = await order()

        data = await menu.find({}).toArray()

    
        const ordersWithoutId = data.map(({ _id, ...rest }) => rest);
        const groupedOrders = ordersWithoutId.reduce((acc, order) => {
            const { date } = order;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(order);
            return acc;
        }, {});

        const sortedKeys = Object.keys(groupedOrders).sort().reverse();

        const orderData = sortedKeys.reduce((obj, key) => {
            obj[key] = groupedOrders[key];
            return obj;
        }, {});





        res.send(orderData)
    }
    conn();
})


//route for sending user orders
app.post('/myOrders', (req, res) => {
    async function conn() {

        menu = await order()

        data = await menu.find({}).toArray()


        const ordersWithoutId = data.map(({ _id, ...rest }) => rest);
        const groupedOrders = ordersWithoutId.reduce((acc, order) => {
            const { userName } = order;
            if (!acc[userName]) {
                acc[userName] = [];
            }
            acc[userName].push(order);
            return acc;
        }, {});
        groupedOrders[req.body.username].reverse()


        res.send(groupedOrders[req.body.username])
    }
    conn();  
})


app.get("/refresh", (req, res) => {
    
    async function conn() {

        menu = await connection()
        item = await menu.find().toArray()
        var res1 = item
        for (j in res1) {
            delete res1[j]['_id']
        }
        res1.map(item => {
            Object.keys(item).map(i => {
                if (i != "type") {
                    newData = item[i]
                    newData["upvotes"]=0
                   menu.updateMany({ type: item["type"] }, { $set: { [i]: newData } })

                }
                
            })
        })


        
        res.send("refreshed")
    }
    conn()
    
})

app.get("/test", (req, res) => {
    
    fs.readFile('./test.json', 'utf8', function (err, data) {
        if (err) throw err;

        var obj = JSON.parse(data)

        var flag = false
        if (obj.length != 0) {
            obj.map((item, ind) => {
            
                if (req.ip == item["host"]) {

                    flag = true

                    const curTime = new Date().getTime()
                    diff = ((curTime - obj[ind]["time"][obj[ind]["time"].length - 1]) / 1000)
                
                    if (diff > 60) {
                    
                        obj[ind]["time"] = []
                    }

                    obj[ind]["time"].push(new Date().getTime())
                    obj[ind]["count"] = obj[ind]["time"].length
                
                
                
                    if (obj[ind]["count"] <= 5) {
                        res.send("req Served")
                    }

                    else {
                        diff = ((curTime - obj[ind]["time"][0]) / 1000)
                        console.log(diff)
                        if (diff > 60) {
                            obj[ind]["time"] = []
                            obj[ind]["time"].push(new Date().getTime())
                            obj[ind]["count"] = obj[ind]["time"].length

                       
                            res.send("req Served")
                        }
                        else {
                        
                            obj[ind]["time"].pop()
                            obj[ind]["count"] = obj[ind]["time"].length
                            res.send("Too Many Requests")
                
                        }
                    }
                }
            })
        }
    

        if (!flag) {
            
            obj.push({ "host": req.ip, "time": [new Date().getTime()], "count": 1 })
            console.log("first")
            res.send("req Served")
        }
        
        obj = JSON.stringify(obj)
        fs.writeFile('./test.json', obj, function (err) {
            if (err) throw err;
        });
        // console.log(obj)
        
    });


})




app.listen(3004, (req, res) => {
    console.log("listening on http://localhost:3004")
})






























