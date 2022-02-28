const express = require('express')
const router = express.Router()

const {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articles')

router.get("/", getAllArticles);
router.get("/:articleID", getArticle)
router.post("/", createArticle);
router.patch("/:articleID", updateArticle);
router.delete("/:articleID", deleteArticle);

module.exports = router;