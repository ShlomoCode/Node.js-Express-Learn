
const mongoose = require('mongoose');
const Article = require('../models/article');
const Category = require('../models/category');

module.exports = {
    getAllArticles: async (req, res) => {
        try {
            let articles = await Article.find()
            res.status(200).json({
                articles
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    getArticle: async (req, res) => {
        const articleID = req.params.articleID
        try {
            const article = await Article.findById(articleID)
            res.status(200).json({
                article
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    createArticle: async (req, res) => {
        const { title, description, content, categoryID } = req.body;

        const category = await Category.findById(categoryID)
        if (!category) {
            res.status(404).json({
                message: "Not Found Category"
            })
            return
        }

        const article = new Article({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            content,
            categoryID
        })
        try {
            await article.save()
            res.status(200).json({
                message: "Crated article"
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    updateArticle: async (req, res) => {
        const articleID = req.params.articleID
        const { categoryID } = req.body;

        const article = await Article.findById(articleID)
        if (!article) {
            return res.status(404).json({
                message: "Not Found Article"
            })
        }

        if (categoryID) {
            const category = await Category.findById(categoryID)

            if (!category) {
                return res.status(404).json({
                    message: "Not Found Category"
                })
            }
        }
        try {
            await Article.updateOne({ _id: articleID }, req.body)
            res.status(200).json({
                message: "Article updated"
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    deleteArticle: async (req, res) => {
        const articleID = req.params.articleID
        const article = await Article.findById(articleID)
        if (!article) {
            return res.status(404).json({
                message: "Not Found Article"
            })
        }
        try {
            await Article.remove({ _id: articleID })
            res.status(200).json({
                message: `Article id: ${articleID} deleted.`
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}