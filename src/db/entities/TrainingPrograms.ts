import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { Users } from './Users'
import { Skills } from './Skills'
import { Marks } from './Marks'
import { TrainingProgramDays } from './TrainingProgramDays'
import { TrainingProcesses } from './TrainingProcesses'
import { TrainingDiaries } from './TrainingDiaries'

@Entity()
export class TrainingPrograms {

  @PrimaryGeneratedColumn({
    comment: 'ID тренировочной программы'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название тренировочной программы'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Описание тренировочной программы'
  })
  description: string

  @ManyToOne(() => Skills, skill => skill.trainingPrograms)
  skill: Skills

  @ManyToMany(() => Marks, marks => marks.trainingProgramsMarks)
  @JoinTable({ name: 'training_programs_marks' })
  marks: Marks[]

  @OneToMany(() => TrainingProgramDays, trainingProgramDay => trainingProgramDay.trainingProgram)
  trainingProgramDays: TrainingProgramDays[]

  @OneToMany(() => TrainingProcesses, trainingProcesses => trainingProcesses.trainingProgram)
  trainingProcesses: TrainingProcesses[]

  @ManyToOne(() => Users, user => user.trainingPrograms)
  user: Users

  @ManyToMany(() => Users, user => user.favoriteTrainingPrograms)
  favoriteForUsers: Users[]

  @ManyToMany(() => Users, user => user.pinnedTrainingPrograms)
  pinnedForUsers: Users[]

  @OneToMany(() => TrainingDiaries, trainingDiaries => trainingDiaries.trainingProgram)
  trainingDiaries: TrainingDiaries

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Дата создания'
  })
  createdAt: Date

  // @UpdateDateColumn()
  // updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp',
    comment: 'Дата удаления'
  })
  deletedAt: Date

}
