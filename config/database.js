export class Database {
    Database() {
        const sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: 'postgres',
                deletedAt: 'destroyTime',
            }
        );
        // Tester la connexion à la base de données
        sequelize.authenticate()
            .then(() => {
                console.log('La connexion à la base de données a réussi!');
            })
            .catch((err) => {
                console.error('Impossible de se connecter à la base de données :', err);
            });

    }
}

module.exports = { Database }