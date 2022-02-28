const mongoose = require('mongoose')
const Category = require("../models/category")

module.exports = {
    getAllCategories: (req, res) => {
        Category.find()
            .then((categories) => {
                res.status(200).json({
                    categories
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            })
    },
    getCategory: (req, res) => {
        const categoryID = req.params.categoryID
        Category.findById(categoryID)
            .then((category) => {
                res.status(200).json({
                    category
                })
            }).catch((error) => {
                res.status(500).json({
                    error
                })
            })
    },
    craeteCategory: (req, res) => {
        const { title, description } = req.body;
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
        })
        category.save()
            .then(() => {
                res.status(200).json({
                    message: 'Created category'
                })
            })
            .catch(error => {
                res.status(500).json({
                    error
                })
            })
    },
    updateCategory: (req, res) => {
        const categoryID = req.params.categoryID
        Category.updateOne({ _id: categoryID }, req.body)
            .then(() => {
                res.status(200).json({
                    message: "Category updated"
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error
                })
            })
    },
    deleteCategory: (req, res) => {
        const categoryID = req.params.categoryID
        Category.deleteOne({ _id: categoryID })
            .then(() => {
                res.status(200).json({
                    message: `Category id: ${categoryID} deleted.`
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error
                })
            })
    }
}