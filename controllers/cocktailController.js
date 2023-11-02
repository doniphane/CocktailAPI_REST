const { Cocktail } = require("../models");
const { Op } = require("sequelize");
const validator = require("validator");

exports.getAllCocktails = async (req, res) => {
    try {
        let cocktails;
        if (req.query.categorie) {
            // Validation de la catégorie
            if (!validator.isAlphanumeric(req.query.categorie)) {
                return res.status(400).send("Categorie invalide.");
            }

            cocktails = await Cocktail.findAll({
                where: { category: { [Op.like]: `%${req.query.categorie}%` } },
            });
        } else {
            cocktails = await Cocktail.findAll();
        }
        res.json(cocktails);
    } catch (error) {
        console.error("Erreur lors de la récupération des cocktails:", error);
        res.status(500).send("Erreur lors de la récupération des cocktails.");
    }
};

exports.getCocktailById = async (req, res) => {
    const { id } = req.params;

    // Validation de l'ID
    if (!validator.isInt(id)) {
        return res.status(400).send("ID invalide.");
    }

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).send("Cocktail non trouvé.");
        }
        res.json(cocktail);
    } catch (error) {
        console.error(`Erreur lors de la récupération du cocktail avec l'ID ${id}:`, error);
        res.status(500).send("Erreur lors de la récupération du cocktail.");
    }
};

exports.addCocktail = async (req, res) => {
    const { name, description, category } = req.body;

    // Validation des données
    if (validator.isEmpty(name) || !validator.isLength(name, { min: 2, max: 50 })) {
        return res.status(400).send("Nom invalide.");
    }
    if (validator.isEmpty(description) || !validator.isLength(description, { min: 5, max: 500 })) {
        return res.status(400).send("Description invalide.");
    }
    if (validator.isEmpty(category) || !validator.isLength(category, { min: 3, max: 30 })) {
        return res.status(400).send("Catégorie invalide.");
    }

    try {
        const cocktail = await Cocktail.create(req.body);
        res.status(201).json(cocktail);
    } catch (error) {
        console.error("Erreur lors de la création du cocktail:", error);
        res.status(500).send("Erreur lors de la création du cocktail.");
    }
};

exports.updateCocktail = async (req, res) => {
    const { id } = req.params;

    // Validation de l'ID
    if (!validator.isInt(id)) {
        return res.status(400).send("ID invalide.");
    }

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).send("Cocktail non trouvé.");
        }

       
        await cocktail.update(req.body);
        res.json(cocktail);
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du cocktail avec l'ID ${id}:`, error);
        res.status(500).send("Erreur lors de la mise à jour du cocktail.");
    }
};

exports.deleteCocktail = async (req, res) => {
    const { id } = req.params;

    // Validation de l'ID
    if (!validator.isInt(id)) {
        return res.status(400).send("ID invalide.");
    }

    try {
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) {
            return res.status(404).send("Cocktail non trouvé.");
        }
        await cocktail.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(`Erreur lors de la suppression du cocktail avec l'ID ${id}:`, error);
        res.status(500).send("Erreur lors de la suppression du cocktail.");
    }
};
