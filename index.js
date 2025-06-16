const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;;
const connectDB = require('./lib/connection');

(async () => {

    const db = await connectDB();
    
    app.get('/list-users', async (req, res) => {
        try {
            const listUsers = await db.query('SELECT * FROM users');
            res.json(listUsers[0]); 
        } catch (error) {
            res.status(500).send('Error al obtener los usuarios: ' + error.message);
        }
    });
    
    app.post('/create-user', async (req, res) => {
        try {
            await db.query('INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)', [req.query.name, req.query.email, req.query.password]);
            res.status(200).send('Usuario creado exitosamente');
        } catch (error) {
            res.status(500).send('Error al crear el usuario: ' + error.message);
        }
    });
    
    app.delete('/delete-user', async (req, res) => {
        try {
            await db.query('DELETE FROM USERS WHERE id = ?', [req.query.id]);
            res.status(200).send('Usuario eliminado exitosamente');
        } catch (error) {
            res.status(500).send('Error al eliminar el usuario: ' + error.message);
        }
    });
    
    app.patch('/update-user', async (req, res) => {
        try {
            await db.query('UPDATE USERS SET name = ?, email = ?, password = ? WHERE id = ?', [req.query.name, req.query.email, req.query.password, req.query.id]);
            res.status(200).send('Usuario actualizado exitosamente');
        } catch (error) {
            res.status(500).send('Error al actualizar el usuario: ' + error.message);
        }
    });
    
    app.get('/get-user', async (req, res) => {
        try {
            const user = await db.query('SELECT * FROM users WHERE id = ?', [req.query.id]);
            if (user[0].length > 0) {
                res.json(user[0][0]);
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            res.status(500).send('Error al obtener el usuario: ' + error.message);
        }
    });

    app.get('/search-user', async (req, res) => {
        try {
            await db.query('SELECT * FROM users WHERE name LIKE ?', [`%${req.query.term}%`])
                .then(users => {
                    if (users[0].length > 0) {
                        res.json(users[0]);
                    } else {
                        res.status(404).send('No se encontraron usuarios con ese nombre');
                    }
                });
        } catch (error) {
            res.status(500).send('Error al buscar usuarios: ' + error.message);
        }
    });
      
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();