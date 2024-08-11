'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blogs.belongsTo(models.Categories, {
        foreignKey: 'category_id',
      });

      Blogs.belongsTo(models.Users, {
        foreignKey: 'user_id'
      });

    }
  }
  Blogs.init({
    slug: DataTypes.STRING,
    user_id: DataTypes.BIGINT,
    category_id: DataTypes.BIGINT,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    images: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Blogs',
    tableName: 'blogs',
    timestamps: false
  });
  return Blogs;
};