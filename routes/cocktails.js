const express = require("express");
const router = express.Router();

const {
    getAllCocktails,
    getCocktailById,
    addCocktail,
    updateCocktail,
    deleteCocktail
} = require("../controllers/cocktailController");

router.get("/", getAllCocktails);
router.get("/:id", getCocktailById);
router.post("/", addCocktail);
router.put("/:id", updateCocktail);
router.delete("/:id", deleteCocktail);

module.exports = router;
