'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categories.hasMany(models.Blogs, {
        foreignKey: 'category_id',
        as: 'blogs' // Alias to use in queries
      });
    }
  }
  Categories.init({
    name: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories',
    timestamps: false
  });
  return Categories;
};