import { isAfter } from 'date-fns';
import Sequelize, { Model } from 'sequelize';

export default class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        canceled_at: Sequelize.DATE,
        expired: {
          type: Sequelize.VIRTUAL,
          get() {
            return isAfter(new Date(), this.end_date);
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}
