import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737720208684 implements MigrationInterface {
    name = 'Migration1737720208684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "waitList" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "externalId" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_f96a6aa67f33d3613d1a7f904ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "backlog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "externalId" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_2b6379507bedcd48474c22d3727" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "completed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "externalId" text NOT NULL, "psCompletionism" boolean NOT NULL, "steamCompletionism" boolean NOT NULL, "xboxCompletionism" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_6369801cb9bf88441544b79d41f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "completed"`);
        await queryRunner.query(`DROP TABLE "backlog"`);
        await queryRunner.query(`DROP TABLE "waitList"`);
    }

}
