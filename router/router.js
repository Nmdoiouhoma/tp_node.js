export class Router {
    Router() {

        app.get('/users', async (req, res) => {

            try {
                const users = await User.findAll({ paranoid: true })
                return res.status(200).json(users);
            } catch (error) {
                res.status(500).json({ message: 'Erreur lors de la recuperration des utilisateurs' })
            }
        }
        );

        // Route POST pour ajouter un utilisateur
        app.post('/users', async (req, res) => {
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ message: 'Name and email are required' });
            }

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                avatar: req.body.avatar,
            })
            res.status(201).json(user);
        });

        // Route PATCH pour mettre jà jour un utilisateur
        app.patch('/users/:id', async (req, res) => {
            const { id } = req.params;
            const { name, email } = req.body;

            // Vous pouvez ici mettre à jour l'utilisateur dans la base de données avec Sequelize
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.name = name || user.name;
            user.email = email || user.email;

            await Post.destroy({
                force: true,
            });

            await user.save();

            res.status(200).json(user);
        });

        // Route DELETE pour supprimer un utilisateur
        app.delete('/users/:id', async (req, res) => {
            const { id } = req.params;

            // Vous pouvez ici supprimer l'utilisateur dans la base de données avec Sequelize
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });

            }

            if (user) {
                await user.destroy({ force: true }); // Marque l'utilisateur comme supprimé (soft delete)
            }

            res.status(204).send();
        });


        // Lancer le serveur
        app.listen(port, () => {
            console.log(`Serveur démarré sur le port ${port}`);
        });
        // Connexion à la base de données avec Sequelize
    }
}

