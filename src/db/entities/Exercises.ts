import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Users } from './Users'
import { Muscles } from './Muscles'
import { ExerciseTypes } from './ExerciseTypes'
import { ExerciseSorts } from './ExerciseSorts'
import { ExerciseExertions } from './ExerciseExertions'
import { Skills } from './Skills'
import { TrainingProgramDayExercises } from './TrainingProgramDayExercises'
import { TrainingProcesses } from './TrainingProcesses'
import { TrainingProgramDayExerciseApproaches } from './TrainingProgramDayExerciseApproaches'

@Entity()
export class Exercises {

  @PrimaryGeneratedColumn({
    comment: 'ID упражнения'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название упражнения'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Необходимое оборудование'
  })
  equipment: string

  // @Column({
  //   type: 'varchar',
  //   nullable: false,
  //   unique: false,
  //   comment: 'Усилие'
  // })
  // exertion: string

  // @Column({
  //   type: 'integer',
  //   nullable: false,
  //   unique: false,
  //   comment: 'Уровень подготовки'
  // })
  // skill: number

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Описание упражнения'
  })
  techniqueDescription: string

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Акцент упражнения для развития силы'
  })
  power: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Акцент упражнения для развития выносливости'
  })
  endurance: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Акцент упражнения для развития гибкости'
  })
  flexibility: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Акцент упражнения для развития кардио'
  })
  cardio: number

  @ManyToOne(() => ExerciseTypes, type => type.exercises)
  type: ExerciseTypes

  @ManyToOne(() => ExerciseSorts, sort => sort.exercises)
  sort: ExerciseSorts

  @ManyToOne(() => ExerciseExertions, exertion => exertion.exercises)
  exertion: ExerciseExertions

  @ManyToOne(() => Skills, skill => skill.exercises)
  skill: Skills

  @ManyToOne(() => Muscles, muscleGroup => muscleGroup.exercises)
  muscleGroup: Muscles

  @ManyToMany(() => Muscles, muscle => muscle.additionalForExercises)
  @JoinTable({ name: 'exercise_additional_muscles' })
  additionalMuscles: Muscles[]

  @ManyToOne(() => Users, user => user.exercises)
  user: Users

  @ManyToMany(() => Users, user => user.favoriteProducts)
  favoriteForUsers: Users[]

  @ManyToMany(() => Users, user => user.pinnedProducts)
  pinnedForUsers: Users[]

  @OneToMany(() => TrainingProgramDayExercises, trainingProgramDayExercises => trainingProgramDayExercises.exercise)
  trainingProgramDayExercises: TrainingProgramDayExercises[]

  @OneToMany(() => TrainingProcesses, trainingProcesses => trainingProcesses.exercise)
  trainingProcesses: TrainingProcesses[]

  @OneToMany(() => TrainingProgramDayExerciseApproaches, exerciseApproaches => exerciseApproaches.exercise)
  exerciseApproaches: TrainingProgramDayExerciseApproaches[]

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
