/* eslint-disable prettier/prettier */

import { configuration } from '../config/configuration';
import * as path from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';
import { User1677574663541 } from './migrations/1677574663541-User';
import { AccessToken1677578993385 } from './migrations/1677578993385-access_token';
import { RefreshToken1677579004336 } from './migrations/1677579004336-refresh_token';

const database = configuration().database;

console.log(database);

const config = {
  type: 'postgres',
  ...database,
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, '..', '**', 'entities', '**', '*.*'),
    path.join(__dirname, '..', 'entities', '**', '*.*'),
    path.join(__dirname, '..', 'entities', '*.*'),
  ],
  migrations: [
    User1677574663541,
    AccessToken1677578993385,
    RefreshToken1677579004336,
  ],
  cli: {
    entitiesDir: path.join(__dirname, '..', 'entities'),
    migrationsDir: path.join(__dirname, 'migrations', '*.*'),
  },
  migrationsTableName: 'migrations_table',
} as DataSourceOptions;

const datasource = new DataSource(config); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;
