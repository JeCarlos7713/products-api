import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './../db/products.db'
});

try {
    await sequelize.authenticate()
    console.log("Banco de dados conectado! Banco de dados: ", sequelize.getDatabaseName())
} catch (error) {
    console.log("Erro na autenticação com o banco: " + error)
    throw error
}

export default sequelize