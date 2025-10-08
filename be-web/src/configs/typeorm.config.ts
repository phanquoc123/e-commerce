import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
const {
  //
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,

  //
  SECRETKEY,
  EXPIRESIN,
  S_ENDPOINT,
  S_PORT,

  // VnPay
  VNPAY_TMN_CODE,
  VNPAY_HASH_SECRET,
  VNPAY_URL,
  VNPAY_RETURN_URL,
  VNPAY_IPN_URL,
} = process.env;

export const configTypeORM: MysqlConnectionOptions = {
  timezone: '+07:00', // Vietnam timezone (UTC+7)
  type: 'mysql',
  host: DB_HOST,
  port: +(DB_PORT ?? 3306),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['dist/modules/**/*.entity{.ts,.js}'], //"dist/src/modules/**/*.entity{.ts,.js}"
  logging: false,
  synchronize: false,
  dropSchema: false,
  migrations: [__dirname + '/db/migrations/*.{ts,js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};

export const MysqlDataSource = new DataSource({
  timezone: '+07:00', // Vietnam timezone (UTC+7)
  type: 'mysql',
  host: DB_HOST,
  port: +(DB_PORT ?? 3306),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
});
