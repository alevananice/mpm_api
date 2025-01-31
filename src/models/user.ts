/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

import {Sequelize} from 'sequelize';
import {Model} from 'sequelize';
import bcrypt from 'bcrypt';
import UserAttributes from '../interfaces/user';

const PASSWORD_SALT_ROUNDS = 11;

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.hasMany(models.Card);
    }
    async checkPassword(password: string) {
      return bcrypt.compare(password, this.password);
    }
  }
  User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, PASSWORD_SALT_ROUNDS);
      instance.set('password', hash);
    }
  });
  return User;
};
