'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    description: DataTypes.STRING,
    avatar: DataTypes.STRING,
    profileId: DataTypes.INTEGER,
    profileType: DataTypes.ENUM("user","pet")
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};