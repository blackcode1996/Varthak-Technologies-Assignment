const { Schema, model } = require('mongoose');

const UserRole = {
  VIEWER: 'VIEWER',
  VIEW_ALL: 'VIEW_ALL',
  CREATOR: 'CREATOR',
};

const getDefaultRoles = () => [UserRole.VIEWER];

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [{
        type: String,
        enum: Object.values(UserRole),
      }],
      default: 'VIEWER',
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model('User', userSchema);

module.exports = UserModel;
