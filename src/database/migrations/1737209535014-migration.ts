import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737209535014 implements MigrationInterface {
    name = 'Migration1737209535014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "title" text NOT NULL, "externalId" text NOT NULL, "psCompletionism" boolean NOT NULL, "steamCompletionism" boolean NOT NULL, "xboxCompletionism" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "completed" ("id" SERIAL NOT NULL, CONSTRAINT "PK_6369801cb9bf88441544b79d41f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "backlog" ("id" SERIAL NOT NULL, CONSTRAINT "PK_2b6379507bedcd48474c22d3727" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "completed_games_game" ("completedId" integer NOT NULL, "gameId" integer NOT NULL, CONSTRAINT "PK_481f06ec01f7026fb4a8387dac5" PRIMARY KEY ("completedId", "gameId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72e052af9311624ae56b0a01bd" ON "completed_games_game" ("completedId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bdd13a3f16a353c14fdde5e60e" ON "completed_games_game" ("gameId") `);
        await queryRunner.query(`CREATE TABLE "backlog_games_game" ("backlogId" integer NOT NULL, "gameId" integer NOT NULL, CONSTRAINT "PK_3cc0a4995c2e9eda60c571cb43c" PRIMARY KEY ("backlogId", "gameId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_423a8edb41c5876a1f5d6cb4a7" ON "backlog_games_game" ("backlogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bc422707f035007f1b5a43340" ON "backlog_games_game" ("gameId") `);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "FK_72e052af9311624ae56b0a01bd5" FOREIGN KEY ("completedId") REFERENCES "completed"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "FK_bdd13a3f16a353c14fdde5e60ef" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "FK_423a8edb41c5876a1f5d6cb4a7f" FOREIGN KEY ("backlogId") REFERENCES "backlog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "FK_3bc422707f035007f1b5a433409" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "FK_3bc422707f035007f1b5a433409"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "FK_423a8edb41c5876a1f5d6cb4a7f"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "FK_bdd13a3f16a353c14fdde5e60ef"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "FK_72e052af9311624ae56b0a01bd5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc422707f035007f1b5a43340"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_423a8edb41c5876a1f5d6cb4a7"`);
        await queryRunner.query(`DROP TABLE "backlog_games_game"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdd13a3f16a353c14fdde5e60e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72e052af9311624ae56b0a01bd"`);
        await queryRunner.query(`DROP TABLE "completed_games_game"`);
        await queryRunner.query(`DROP TABLE "backlog"`);
        await queryRunner.query(`DROP TABLE "completed"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
