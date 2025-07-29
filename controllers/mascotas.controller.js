const getMascotas = (req, res) => {
  res.json([{ id: 1, nombre: 'Firulais', zona: 'Zona Sur' }]);
};

const postMascota = (req, res) => {
  const nuevaMascota = req.body;
  res.status(201).json({ message: 'Mascota reportada', data: nuevaMascota });
};

module.exports = { getMascotas, postMascota };
