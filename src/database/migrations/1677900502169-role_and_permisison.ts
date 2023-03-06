import { DATABASE_NAMES } from '../../constants';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class RoleAndPermisison1677900502169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE_NAMES.PERMISSIONS,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '100',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'group',
            type: 'varchar(100)',
            isNullable: true,
            default: null,
          },
          {
            name: 'isGroup',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
            onUpdate: 'NOW()',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: DATABASE_NAMES.ROLES,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'isRoot',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
            onUpdate: 'NOW()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
        columns: [
          {
            name: 'permissionId',
            type: 'varchar',
          },
          {
            name: 'roleId',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
            onUpdate: 'NOW()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createPrimaryKey(
      DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
      ['permissionId', 'roleId'],
    );

    await queryRunner.createForeignKey(
      DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
      new TableForeignKey({
        columnNames: ['permissionId'],
        referencedColumnNames: ['id'],
        referencedTableName: DATABASE_NAMES.PERMISSIONS,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: DATABASE_NAMES.ROLES,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(
      DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
    );
    const foreignKeyRole = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('roleId') !== -1,
    );
    const foreignKeyPermission = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('permissionId') !== -1,
    );
    await queryRunner.dropForeignKey(
      DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
      foreignKeyRole,
    );

    await queryRunner.dropForeignKey(
      DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS,
      foreignKeyPermission,
    );
    await queryRunner.dropTable(DATABASE_NAMES.ROLE_PERMISSIONS_PERMISSIONS);
    await queryRunner.dropTable(DATABASE_NAMES.PERMISSIONS);
    await queryRunner.dropTable(DATABASE_NAMES.ROLES);
  }
}
