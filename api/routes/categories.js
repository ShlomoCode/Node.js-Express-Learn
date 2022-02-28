const express = require('express')
const router = express.Router()

const {
    getAllCategories,
    getCategory,
    craeteCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/cagetories')

router.get("/", getAllCategories);
router.get("/:categoryID", getCategory)
router.post("/", craeteCategory);
router.patch("/:categoryID", updateCategory);
router.delete("/:categoryID", deleteCategory);

module.exports = router;