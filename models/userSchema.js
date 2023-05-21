const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
    },
    resetpasswordToken: String,
    resetpasswordExp: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    otpExpiresIn: Date,
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.getForgotPasswordToken = async function () {
  // @Generate Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // @Hash token and set it to resetPasswordToken
  this.resetpasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expiration
  this.resetpasswordExp = new Date() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("users", userSchema);
