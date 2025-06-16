// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configura tu conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Leoyloki22110909',
    database: 'Prueba_QR_Trabajo',
});

app.listen(3001, () => {
    console.log('Servidor backend corriendo en http://localhost:3001');
});

// Endpoint de ejemplo
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM Registro_QR', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});


app.get('/api/persona/:cod_QR_ID', (req, res) => {
    const codigo = req.params.cod_QR_ID;
    db.query('SELECT * FROM Registro_QR WHERE cod_QR_ID = ?', [codigo], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json(results[0]);
    });
});


app.post('/api/salida', (req, res) => {
    const { cod_QR_ID, nombre_completo, Centro, Sociedad } = req.body;
    db.query(
        'INSERT INTO Registro_QR (cod_QR_ID, nombre_completo, Centro, Sociedad, Estado) VALUES (?, ?, ?, ?, ?)',
        [cod_QR_ID, nombre_completo, Centro, Sociedad, 'Salida'],
        (err, results) => {
            if (err) {
                console.error('Error al insertar:', err);
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Salida registrada correctamente', results });
        }
    );
});

app.post('/api/entrada', (req, res) => {
    const { cod_QR_ID, nombre_completo, Centro, Sociedad } = req.body;
    db.query(
        'INSERT INTO Registro_QR (cod_QR_ID, nombre_completo, Centro, Sociedad, Estado) VALUES (?, ?, ?, ?, ?)',
        [cod_QR_ID, nombre_completo, Centro, Sociedad, 'Entrada'],
        (err, results) => {
            if (err) {
                console.error('Error al insertar entrada:', err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Entrada registrada correctamente', results });
        }
    );
});

