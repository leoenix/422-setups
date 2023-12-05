const express = require("express");
const db = require("../database");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const MainController = express.Router()

MainController.use(express.json());
MainController.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
MainController.use(express.static(path.join(__dirname, "../client/build")));
MainController.use(express.static(__dirname + "../client/public/"));
MainController.use(bodyParser.urlencoded({ extended: true }));
MainController.use(bodyParser.json());
MainController.use(express.static('dist'));


MainController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


MainController.get("/GetAll", async (req, res) => {
    try {
        let state = "SELECT username, points FROM users;";

        db.query(state, async (err, result) => {
            try {
                if (err) {
                    console.log('err: ' + err);
                    res.status(500).send();
                    return;
                } else {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).send();
            }
        });
    } catch (err) {
        res.status(500).send();
    }
});


MainController.post("/Login", async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
        res.status(500).send();
        return;
        }
        
        let username = req.body.username;
        
        let password = req.body.password;
        let state = `SELECT U.username, U.password, U.item, U.points from users U where U.username = "${username}";`;
        db.query(state, async (err, result) => {
            try {
                if (err) {
                    console.log('err: ' + err);
                }
                else {
                    if (!result[0]) {
                        res.status(500).send();
                        return;
                    } else if (await password === result[0].password && username === result[0].username) {
                 const points = result[0].points;
                const item = result[0].item;

                res.status(200).json({
                    points: points,
                    item: item,
                    status: "Success"
                });                       

                    } else {
                        res.status(500).send();
                        return;
                    }
                }
            } catch (err) {
                res.status(500).send();
            }
        }
        );
    } catch (err) {
        res.status(500).send();
    }
})

MainController.post("/Signup", async (req, res) => {
    let existing = false;

    let state = "SELECT * FROM users U WHERE U.username = ?";
    if (!req.body.username || !req.body.password){
        res.status(500).send();
        return;
    }


        // eslint-disable-next-line no-undef
        const result = await new Promise((resolve, reject) => {
            db.query(state, [req.body.username], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });

        if (result.length !== 0) {
            existing = true;
        }

    try {
        let username = req.body.username;
        let password = req.body.password;
        let item = Math.floor(Math.random() * 4) + 1;
        let points = 0;

        let state = `INSERT INTO embd.users (username, password, points, item) VALUES (?,?,?,?)`
        if (existing === false) {
            db.query(state, [username, password, points, item], async (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                }
            });
            res.sendStatus(200);
        }
        else
            res.status(500).send();
    } catch {
        res.status(500).send();
    }
})

MainController.post("/Update", async (req, res) => {
    if (!req.body.username || !req.body.mac){
        res.status(500).send();
        return;
    }
    try {
        let username = req.body.username;
        let mac = req.body.mac;

        let state = `UPDATE embd.users SET mac = ? WHERE username = ?`
            console.log("we go at least here!!!!")
            db.query(state, [mac, username], async (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                }
            });
            res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
})



MainController.post("/UpdateItem", async (req, res) => {
    if (!req.body.username || !req.body.mac){
        res.status(500).send();
        return;
    }
    try {
        let username = req.body.username;
        let mac = req.body.mac;
        let item = Math.floor(Math.random() * 4) + 1;
        let state = `UPDATE embd.users SET item = ? WHERE username = ?`
            console.log("we go at least here!!!!")
            db.query(state, [item, username], async (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                }
            });
            res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
})


MainController.post("/Increment", async (req, res) => {
    if (!req.body.username){
        res.status(500).send();
        return;
    }
    try {
        let username = req.body.username;

        let state = `UPDATE embd.users SET points = points + 1 WHERE username = ?;`
            console.log(
                "reached"
            )
            db.query(state, [username], async (err, result) => {
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                }
            });
            res.sendStatus(200);
    } catch (err){
        console.log(err)
        res.status(500).send();
    }
})

MainController.get("/GetMac", async (req, res) => {
    if (!req.query.username) {
        res.status(400).send("Username is required.");
        return;
    }

    try {
        let username = req.query.username;

        let state = "SELECT mac, points, item FROM embd.users WHERE username = ?;";

        db.query(state, [username], async (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            // @ts-ignore
            if (result.length > 0) {
                const macAddress = result[0].mac;
                const points = result[0].points;
                const item = result[0].item
                console.log(result[0])
                res.status(200).json({ macAddress, points, item });
            } else {
                res.status(404).send("User not found.");
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = MainController;
