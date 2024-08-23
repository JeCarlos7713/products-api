import { DataTypes } from "sequelize";
import sequelize from "../config/dbconnect.js";

const ProductsModel = sequelize.define(
    "Products",
    {
        title : {
            type        : DataTypes.STRING,
            allowNull   : false,
            field       : "title"
        },
        value : {
            type        : DataTypes.NUMBER,
            allowNull   : false,
            field       : "value"
        },
        description : {
            type        : DataTypes.TEXT,
            allowNull   : false,
            field       : "description"
        },
        img : {
            type        : DataTypes.TEXT,
            allowNull   : false,
            field       : "url_img"
        },
    },
    {
        tableName: "products",
        timestamps: false
    }
)

export default ProductsModel