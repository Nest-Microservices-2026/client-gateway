import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_MICRO_HOST: string;
    PRODUCTS_MICRO_PORT: number;
    ORDERS_MICRO_HOST: string;
    ORDERS_MICRO_PORT: number;

}

const envSchema = joi.object({
    PORT : joi.number().required(),
    PRODUCTS_MICRO_PORT : joi.number().required(),
    PRODUCTS_MICRO_HOST : joi.string().required(),
    ORDERS_MICRO_PORT : joi.number().required(),
    ORDERS_MICRO_HOST : joi.string().required()
})
.unknown(true);

const { error, value } = envSchema.validate(process.env);

if ( error )throw new Error(`Config validation error: ${ error.message }`);

const variable:EnvVars = value;
 
export const envs = {
    port: variable.PORT,
    micro_host : variable.PRODUCTS_MICRO_HOST,
    micro_port : variable.PRODUCTS_MICRO_PORT,
    orders_host : variable.ORDERS_MICRO_HOST,
    orders_port : variable.ORDERS_MICRO_PORT

}
