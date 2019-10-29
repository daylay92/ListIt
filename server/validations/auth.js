import Joi from '@hapi/joi';

const authSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(15)
    .required()
    .label('It must be an alphabet of between 2-15 characters long'),
  lastName: Joi.string()
    .min(2)
    .max(15)
    .required()
    .label('It must be an alphabet of between 2-15 characters long'),
  email: Joi.string()
    .email()
    .required()
    .label('A valid email address is required'),
  password: Joi.string()
    .min(6)
    .required()
    .label('A password of atleast 6 characters is required')
}).options({ abortEarly: false });

const validateAuthSchema = body => {
  const { error } = authSchema.validate(body);
  if (error) {
    const [
      {
        context: { label }
      }
    ] = error.details;
    return label;
  }
  return true;
};

export default validateAuthSchema;
