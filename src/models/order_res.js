import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_res extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        references: {
          model: 'user_res',
          key: 'user_id'
        }
      },
      food_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'food',
          key: 'food_id'
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      code: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      arr_sub_id: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'order_res',
      timestamps: false,
      indexes: [
        {
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "food_id",
          using: "BTREE",
          fields: [
            { name: "food_id" },
          ]
        },
      ]
    });
  }
}
