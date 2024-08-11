'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLikeBlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


    }
  }
  UserLikeBlogs.init({
    user_id: DataTypes.BIGINT,
    blog_id: DataTypes.BIGINT,
    like: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserLikeBlogs',
    tableName: 'user_like_blogs',
    timestamps: false
  });
  return UserLikeBlogs;
};