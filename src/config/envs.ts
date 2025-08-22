import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  MS_PORT: number;
  MAILER_HOST: string;
  MAILER_PORT: number;
  MAILER_USER: string;
  MAILER_PASS: string;
}

const envVarsSchema = joi
  .object({
    MS_PORT: joi.number().default(3002),
    MAILER_HOST: joi.string().required(),
    MAILER_PORT: joi.number().required(),
    MAILER_USER: joi.string().required(),
    MAILER_PASS: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.MS_PORT,
  mailerHost: envVars.MAILER_HOST,
  mailerPort: envVars.MAILER_PORT,
  mailerUser: envVars.MAILER_USER,
  mailerPass: envVars.MAILER_PASS,
};
