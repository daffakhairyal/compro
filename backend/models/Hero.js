import db from '../config/db.js';

const Hero = {
  create: (newGalleryItem, result) => {
    db.query('INSERT INTO `hero` SET ?', newGalleryItem, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  },

  findById: (id, result) => {
    db.query('SELECT * FROM `hero` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  },

  getAll: (result) => {
    db.query('SELECT * FROM `hero`', (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  },

  updateById: (id, updatedGalleryItem, result) => {
    db.query('UPDATE `hero` SET ? WHERE id = ?', [updatedGalleryItem, id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },

  deleteById: (id, result) => {
    db.query('DELETE FROM `hero` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },
};

export default Hero;
