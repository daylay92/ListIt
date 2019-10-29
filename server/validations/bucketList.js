import Joi from '@hapi/joi';
import { goalSchema } from './goal';

const bucketListSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .label('A name must be atleast 3 characters long'),
  goals: Joi.array().items(goalSchema)
});
export const validateName = ({ name: bodyName }) => {
  const name = Joi.string()
    .required()
    .min(3)
    .label('A name must be atleast 3 characters long');
  const { error } = name.validate(bodyName);
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
const validateBucketListSchema = body => {
  const { error } = bucketListSchema.validate(body);
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

export default validateBucketListSchema;
