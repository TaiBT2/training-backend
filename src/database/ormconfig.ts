/* eslint-disable prettier/prettier */

import { configuration } from '../config/configuration';
import { DataSourceOptions, DataSource } from 'typeorm';
import { User1677574663541 } from './migrations/1677574663541-User';
import { AccessToken1677578993385 } from './migrations/1677578993385-access_token';
import { RefreshToken1677579004336 } from './migrations/1677579004336-refresh_token';
import { RoleAndPermisison1677900502169 } from './migrations/1677900502169-role_and_permisison';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../users/entities/user.entity';
import UserSeeder from './seed/user.seeder';
import UserFactory from './seed/user.factory';

const database = configuration().database;

console.log(database);

const config: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  ...database,
  synchronize: true,
  logging: false,
  entities: [User],
  seeds: [UserSeeder],
  factories: [UserFactory],
  migrations: [
    User1677574663541,
    AccessToken1677578993385,
    RefreshToken1677579004336,
    RoleAndPermisison1677900502169,
  ],
  migrationsTableName: 'migrations_table',
} as DataSourceOptions;

const datasource = new DataSource(config); // config is one that is defined in datasource.config.ts file
export default datasource;
export { config };
