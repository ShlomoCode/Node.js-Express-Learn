const express = require('express')
const router = express.Router()
const checkAuth = require('../middelwares/checkAuth');

const {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articles')

router.get("/", getAllArticles);
router.get("/:articleID", getArticle)

router.post("/", checkAuth, createArticle);
router.patch("/:articleID", checkAuth, updateArticle);
router.delete("/:articleID", checkAuth, deleteArticle);

module.exports = router;