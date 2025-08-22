import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  MS_PORT: number;
}

const envVarsSchema = joi
  .object({
    MS_PORT: joi.number().default(3002),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.MS_PORT,
};
