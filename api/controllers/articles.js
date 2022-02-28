
const mongoose = require('mongoose');
const Article = require('../models/article');
const Category = require('../models/category');

module.exports = {
    getAllArticles: (req, res) => {
        Article.find().then((articles) => {
            res.status(200).json({
                articles
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    getArticle: ((req, res) => {
        const articleID = req.params.articleID
        Article.findById(articleID).then((article) => {
            res.status(200).json({
                article
            })
        }).catch((error) => {
            res.status(500).json({
                error
            })
        })
    }),
    createArticle: (req, res) => {
        const { title, description, content, categoryID } = req.body;

        Category.findById(categoryID).then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: "Not Found Category"
                })
            }

            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title,
                description,
                content,
                categoryID
            })

            return article.save()
                .then(() => {
                    res.status(200).json({
                        message: "Crated article"
                    })
                })
                .catch((error) => {
                    res.status(500).json({
                        error
                    })
                })
        })

    },
    updateArticle: (req, res) => {
        const articleID = req.params.articleID
        Article.updateOne({ _id: articleID }, req.body)
            .then(() => {
                res.status(200).json({
                    message: "Article updated"
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error
                })
            })
    },
    deleteArticle: (req, res) => {
        const articleID = req.params.articleID
        Article.remove({ _id: articleID })
            .then(() => {
                res.status(200).json({
                    message: `Article id: ${articleID} deleted.`
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error
                })
            })
    }
}