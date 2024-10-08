'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Blogs, {
        foreignKey: 'user_id'
      });
    }
  }
  Users.init({
    username: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false
  });
  return Users;
};