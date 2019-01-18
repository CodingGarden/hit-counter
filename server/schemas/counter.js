const yup = require('yup');

const color = yup
  .string()
  .min(7)
  .max(7)
  .matches(/^#[a-f\d]{6}$/i)
  .required();

const integer = yup
  .number()
  .min(1)
  .integer();

module.exports = yup.object().shape({
  fontFamily: yup
    .string()
    .max(50)
    .required(),
  fontColor: color,
  fontSize: integer.max(50).required(),
  backgroundColor: color,
  width: integer.max(600).required(),
  height: integer.max(600).required(),
  maxLength: yup
    .number()
    .min(1)
    .max(13)
    .integer()
    .required()
}).noUnknown();
