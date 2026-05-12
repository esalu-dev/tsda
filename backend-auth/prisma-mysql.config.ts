import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/mysql/schema.prisma',
  datasource: {
    url:
      process.env.REPLICA_MYSQL_URL ||
      'mysql://root:root_password@localhost:3306/profedex',
  },
});
