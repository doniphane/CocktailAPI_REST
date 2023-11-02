module.exports = (sequelize, DataTypes) => {
  const Cocktail = sequelize.define("Cocktail", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Cocktail;
};
