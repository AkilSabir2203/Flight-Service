'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Airplane extends Model {
    static associate(models) {
      // define association here
    }
  }

  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      } 
    },
    {
      sequelize,
      modelName: 'Airplane',
    }
  );

  return Airplane;
};
