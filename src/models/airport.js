import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: "cityId",
      });

      this.hasMany(models.Flight, {
        foreignKey: "departureAirportId",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Flight, {
        foreignKey: "arrivalAirportId",
        onDelete: "CASCADE",
      });
    }
  }

  Airport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        unique: true,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );

  return Airport;
};
