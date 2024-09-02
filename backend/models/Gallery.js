import db from '../config/db.js';

const Gallery = {
  create: (newGalleryItem, result) => {
    db.query('INSERT INTO `gallery` SET ?', newGalleryItem, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  },

  findById: (id, result) => {
    db.query('SELECT * FROM `gallery` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  },

  getAll: (result) => {
    db.query('SELECT * FROM `gallery`', (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  },

  updateById: (id, updatedGalleryItem, result) => {
    db.query('UPDATE `gallery` SET ? WHERE id = ?', [updatedGalleryItem, id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },

  deleteById: (id, result) => {
    db.query('DELETE FROM `gallery` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },
};

export default Gallery;
