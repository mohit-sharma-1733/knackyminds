import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initAssignment = (sequelize, Types) => {
	class Assignment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Assignment.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			short_desc: DataTypes.TEXT,
			assignment_credits: DataTypes.FLOAT,
			deadline: DataTypes.STRING,
			image: DataTypes.STRING,
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "users",
					key: "id",
					as: "userId",
				},
			},
			courseId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "courses",
					key: "id",
					as: "courseId",
				},
			},
			is_class: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Assignments",
			tableName: "assignments",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Assignment;
};
export default initAssignment(connection, DataTypes);
