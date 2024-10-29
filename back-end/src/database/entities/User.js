const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    USER_ID: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    USERNAME: {
      type: 'varchar',
      unique: true,
    },
    PASSWORD: {
      type: 'varchar',
    },
    CREATED_AT: {
      type: 'date',
      createDate: true,
    },
    UPDATED_AT: {
      type: 'date',
      updateDate: true,
    },
    DELETED_AT: {
      type: 'date',
      deleteDate: true,
      nullable: true,
    },
  },
});
