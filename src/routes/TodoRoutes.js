const express = require('express')
const Todo = require('../models/TodoSchema')

class TodoRoutes {

    constructor() {
        this.express = express()
        this.express.post("/addItem", this.addItem)
        this.express.get("/getTodoItems", this.getTodoItems)
        this.express.put("/setItemStatus", this.setItemStatus)
        this.express.post("/deleteItem", this.deleteItem)
    }

    addItem(req, res) {
        let todoItem = new Todo({
            title: req.body.title
        })
        todoItem.save().then( doc => {

            res.json({
                ok: true
            })

        }, err => {
            
            res.status(500).json({
                error: 'Error trying to save the item'
            })

        })
    }


    getTodoItems(req, res) {
        Todo.find().then( (docs) => {
            res.json({
                todoItems: docs
            })
        }, err => {
            res.status(500).json({
                error: 'Error loading the ToDo items'
            })   
        })
    }

    setItemStatus(req, res) {
        let itemId = req.body.itemId
        let doneStatus = req.body.doneStatus

        Todo.updateOne({_id: itemId}, {is_done: doneStatus})
            .then( (result) => {
                res.json({
                    ok: true
                })
            }, err => {
                res.status(500).json({
                    error: 'Error trying to mark as done the item ' + req.itemId
                })
            })
    }

    deleteItem(req, res) {
        let itemId = req.body.itemId

        Todo.remove({_id: itemId})
            .then( (result) => {
                res.json({
                    ok: true
                })
            }, err => {
                res.status(500).json({
                    error: 'Error trying to delete the item ' + req.itemId
                })
            })
    }
    
}

module.exports = new TodoRoutes().express;