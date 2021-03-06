import { MigrationInterface, QueryRunner } from "typeorm"

export class insertExerciseExertions1659103808061 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO exercise_exertions (id, title)
      VALUES
        (1, 'Жимовое'),
        (2, 'Тяговое'),
        (3, 'Статическое');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM exercise_exertions WHERE title = 'Жимовое' OR title = 'Тяговое' OR title = 'Статическое';`
    )
  }

}
