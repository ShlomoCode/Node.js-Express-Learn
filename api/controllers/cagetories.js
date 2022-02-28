const mongoose = require('mongoose')
const Category = require("../models/category")

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.status(200).json({
                categories
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    getCategory: async (req, res) => {
        const categoryID = req.params.categoryID
        try {
            const category = await Category.findById(categoryID)

            res.status(200).json({
                category
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    craeteCategory: async (req, res) => {
        const { title, description } = req.body;
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
        })
        try {
            await category.save()
            res.status(200).json({
                message: 'Created category'
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    updateCategory: async (req, res) => {
        const categoryID = req.params.categoryID
        try {
            await Category.updateOne({ _id: categoryID }, req.body)
            res.status(200).json({
                message: "Category updated"
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    deleteCategory: async (req, res) => {
        const categoryID = req.params.categoryID
        try {
            await Category.deleteOne({ _id: categoryID })
            res.status(200).json({
                message: `Category id: ${categoryID} deleted.`
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}