import { DATABASE_NAMES } from '../../constants';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class RefreshToken1677579004336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_tokens',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'isActive',
            type: 'boolean',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'accessTokenId',
            type: 'int',
          },
          {
            name: 'host',
            type: 'varchar',
          },
          {
            name: 'device',
            type: 'varchar',
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
    await queryRunner.createForeignKey(
      'refresh_tokens',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: DATABASE_NAMES.USERS,
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'refresh_tokens',
      new TableForeignKey({
        columnNames: ['accessTokenId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'access_tokens',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('refresh_tokens');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    const foreignKeyAccessToken = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('accessTokenId') !== -1,
    );
    await queryRunner.dropForeignKey('refresh_tokens', foreignKey);
    await queryRunner.dropForeignKey('refresh_tokens', foreignKeyAccessToken);
    await queryRunner.dropTable('refresh_tokens');
  }
}
