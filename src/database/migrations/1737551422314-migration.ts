import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737551422314 implements MigrationInterface {
    name = 'Migration1737551422314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "completed" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "backlog" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "FK_bdd13a3f16a353c14fdde5e60ef"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "FK_3bc422707f035007f1b5a433409"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "PK_352a30652cd352f552fef73dec5"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "createdAt" SET DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "PK_481f06ec01f7026fb4a8387dac5"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "PK_72e052af9311624ae56b0a01bd5" PRIMARY KEY ("completedId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdd13a3f16a353c14fdde5e60e"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP COLUMN "gameId"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD "gameId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "PK_72e052af9311624ae56b0a01bd5"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "PK_481f06ec01f7026fb4a8387dac5" PRIMARY KEY ("completedId", "gameId")`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "PK_3cc0a4995c2e9eda60c571cb43c"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "PK_423a8edb41c5876a1f5d6cb4a7f" PRIMARY KEY ("backlogId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc422707f035007f1b5a43340"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP COLUMN "gameId"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD "gameId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "PK_423a8edb41c5876a1f5d6cb4a7f"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "PK_3cc0a4995c2e9eda60c571cb43c" PRIMARY KEY ("backlogId", "gameId")`);
        await queryRunner.query(`CREATE INDEX "IDX_bdd13a3f16a353c14fdde5e60e" ON "completed_games_game" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bc422707f035007f1b5a43340" ON "backlog_games_game" ("gameId") `);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "FK_bdd13a3f16a353c14fdde5e60ef" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "FK_3bc422707f035007f1b5a433409" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "FK_3bc422707f035007f1b5a433409"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "FK_bdd13a3f16a353c14fdde5e60ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3bc422707f035007f1b5a43340"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdd13a3f16a353c14fdde5e60e"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "PK_3cc0a4995c2e9eda60c571cb43c"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "PK_423a8edb41c5876a1f5d6cb4a7f" PRIMARY KEY ("backlogId")`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP COLUMN "gameId"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD "gameId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_3bc422707f035007f1b5a43340" ON "backlog_games_game" ("gameId") `);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" DROP CONSTRAINT "PK_423a8edb41c5876a1f5d6cb4a7f"`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "PK_3cc0a4995c2e9eda60c571cb43c" PRIMARY KEY ("backlogId", "gameId")`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "PK_481f06ec01f7026fb4a8387dac5"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "PK_72e052af9311624ae56b0a01bd5" PRIMARY KEY ("completedId")`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP COLUMN "gameId"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD "gameId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_bdd13a3f16a353c14fdde5e60e" ON "completed_games_game" ("gameId") `);
        await queryRunner.query(`ALTER TABLE "completed_games_game" DROP CONSTRAINT "PK_72e052af9311624ae56b0a01bd5"`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "PK_481f06ec01f7026fb4a8387dac5" PRIMARY KEY ("completedId", "gameId")`);
        await queryRunner.query(`ALTER TABLE "game" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "PK_352a30652cd352f552fef73dec5"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "backlog_games_game" ADD CONSTRAINT "FK_3bc422707f035007f1b5a433409" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "completed_games_game" ADD CONSTRAINT "FK_bdd13a3f16a353c14fdde5e60ef" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "backlog" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "completed" DROP COLUMN "createdAt"`);
    }

}
