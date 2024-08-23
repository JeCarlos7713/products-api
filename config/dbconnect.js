import Sequelize  from "sequelize";
import path from "path"
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(import.meta.url)

const dbPath = path.resolve(__dirname, "./../db/products.db")

console.log("Caminho do banco: " + dbPath)

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath
});

try {
    await sequelize.authenticate()
    console.log("Banco de dados conectado! Banco de dados: ", sequelize.getDatabaseName())
} catch (error) {
    console.log("Erro na autenticação com o banco: " + error)
    throw error
}

export default sequelize