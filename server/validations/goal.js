import Joi from '@hapi/joi';

export const goalSchema = Joi.object({
  text: Joi.string()
    .min(3)
    .required()
    .label('A goal must be atleast 3 characters long'),
  tracking: Joi.bool()
    .required()
    .label('A tracking value of yes or no is required'),
  from: Joi.when('tracking', {
    is: true,
    then: Joi.date().required()
  }).label('A valid date is required'),
  to: Joi.when('tracking', {
    is: true,
    then: Joi.date()
      .greater(Joi.ref('from'))
      .required()
  }).label('A valid date not less than the start date is required')
});

const validateGoalSchema = body => {
  const { error } = goalSchema.validate(body);
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

export default validateGoalSchema;
