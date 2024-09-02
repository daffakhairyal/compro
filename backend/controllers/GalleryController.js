import Gallery from '../models/Gallery.js';

// Mendapatkan data gallery item berdasarkan ID
export const getGalleryItemById = (req, res) => {
  const galleryId = req.params.id;

  Gallery.findById(galleryId, (err, galleryItem) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving gallery item', error: err });
    }
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json(galleryItem);
  });
};

// Mendapatkan semua data gallery
export const getAllGalleryItems = (req, res) => {
  Gallery.getAll((err, galleryItems) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving gallery items', error: err });
    }
    res.status(200).json(galleryItems);
  });
};

// Menambahkan gallery item baru (gambar diunggah melalui Multer di route)
export const createGalleryItem = (req, res) => {
    const newGalleryItem = {
      title: req.body.title,
      description: req.body.description,
      image_url: `/uploads/${req.file.filename}`,
    };
  
    Gallery.create(newGalleryItem, (err, id) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating gallery item', error: err });
      }
      res.status(201).json({ message: 'Gallery item created successfully', id: id });
    });
  };

// Mengupdate data gallery item berdasarkan ID
export const updateGalleryItemById = (req, res) => {
  const galleryId = req.params.id;
  const updatedGalleryItem = req.body;

  Gallery.updateById(galleryId, updatedGalleryItem, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating gallery item', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json({ message: 'Gallery item updated successfully' });
  });
};

// Menghapus data gallery item berdasarkan ID
export const deleteGalleryItemById = (req, res) => {
  const galleryId = req.params.id;

  Gallery.deleteById(galleryId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting gallery item', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  });
};
