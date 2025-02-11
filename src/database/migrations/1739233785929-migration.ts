import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739233785929 implements MigrationInterface {
    name = 'Migration1739233785929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "waitList" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "externalId" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "userId" uuid, CONSTRAINT "PK_f96a6aa67f33d3613d1a7f904ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "completed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "externalId" text NOT NULL, "psCompletionism" boolean NOT NULL, "steamCompletionism" boolean NOT NULL, "xboxCompletionism" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "userId" uuid, CONSTRAINT "PK_6369801cb9bf88441544b79d41f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "backlog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "externalId" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "userId" uuid, CONSTRAINT "PK_2b6379507bedcd48474c22d3727" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "waitList" ADD CONSTRAINT "FK_5a2dae56dee8de1a24d6538a614" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "completed" ADD CONSTRAINT "FK_80d637df02184cb23c9754372bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "backlog" ADD CONSTRAINT "FK_9db045cd628df3e15fde677a906" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backlog" DROP CONSTRAINT "FK_9db045cd628df3e15fde677a906"`);
        await queryRunner.query(`ALTER TABLE "completed" DROP CONSTRAINT "FK_80d637df02184cb23c9754372bb"`);
        await queryRunner.query(`ALTER TABLE "waitList" DROP CONSTRAINT "FK_5a2dae56dee8de1a24d6538a614"`);
        await queryRunner.query(`DROP TABLE "backlog"`);
        await queryRunner.query(`DROP TABLE "completed"`);
        await queryRunner.query(`DROP TABLE "waitList"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
