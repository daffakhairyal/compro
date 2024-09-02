import Hero from '../models/Hero.js';

// Mendapatkan data gallery item berdasarkan ID
export const getHeroItemById = (req, res) => {
  const heroId = req.params.id;

  Hero.findById(heroId, (err, heroItem) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving hero item', error: err });
    }
    if (!heroItem) {
      return res.status(404).json({ message: 'Hero item not found' });
    }
    res.status(200).json(heroItem);
  });
};

// Mendapatkan semua data gallery
export const getAllHeroItems = (req, res) => {
  Hero.getAll((err, heroItems) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving hero items', error: err });
    }
    res.status(200).json(heroItems);
  });
};

// Menambahkan gallery item baru (gambar diunggah melalui Multer di route)
export const createHeroItem = (req, res) => {
    const newHeroItem = {
      title: req.body.title,
      description: req.body.description,
      image_url: `/uploads/${req.file.filename}`,
    };
  
    Hero.create(newHeroItem, (err, id) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating hero item', error: err });
      }
      res.status(201).json({ message: 'Hero item created successfully', id: id });
    });
  };

// Mengupdate data gallery item berdasarkan ID
export const updateHeroItemById = (req, res) => {
  const heroId = req.params.id;
  const updatedHeroItem = req.body;

  Hero.updateById(heroId, updatedHeroItem, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating hero item', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Hero item not found' });
    }
    res.status(200).json({ message: 'Hero item updated successfully' });
  });
};

// Menghapus data gallery item berdasarkan ID
export const deleteHeroItemById = (req, res) => {
  const heroId = req.params.id;

  Hero.deleteById(heroId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting hero item', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Hero item not found' });
    }
    res.status(200).json({ message: 'Hero item deleted successfully' });
  });
};
