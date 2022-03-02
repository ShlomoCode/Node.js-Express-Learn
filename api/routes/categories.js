const express = require('express')
const router = express.Router()
const checkAuth = require("../middelwares/checkAuth")

const {
    getAllCategories,
    getCategory,
    craeteCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/cagetories')

router.get("/", getAllCategories);
router.get("/:categoryID", getCategory)
router.post("/", checkAuth, craeteCategory);
router.patch("/:categoryID", checkAuth, updateCategory);
router.delete("/:categoryID", checkAuth, deleteCategory);

module.exports = router;