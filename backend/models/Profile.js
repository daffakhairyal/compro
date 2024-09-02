import db from '../config/db.js';

const Profile = {
  create: (newProfile, result) => {
    db.query('INSERT INTO `profiles` SET ?', newProfile, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  },

  findById: (id, result) => {
    db.query('SELECT * FROM `profiles` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  },

  getAll: (result) => {
    db.query('SELECT * FROM `profiles`', (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  },

  updateById: (id, updatedProfile, result) => {
    db.query('UPDATE `profiles` SET ? WHERE id = ?', [updatedProfile, id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },

  deleteById: (id, result) => {
    db.query('DELETE FROM `profiles` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },
};

export default Profile;
