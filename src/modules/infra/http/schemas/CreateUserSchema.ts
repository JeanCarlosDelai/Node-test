import Joi from 'joi';

export const CreateUserSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    password: Joi.string().required().min(6),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  }),
});
