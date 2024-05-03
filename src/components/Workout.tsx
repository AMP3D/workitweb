import { IWorkout } from "../models";
import { FC } from "react";
import Exercise from "./Exercise";
import Collapse from "./ui/Collapse";
import { useSetStore } from "../store/setStore";
import { convertToSetId } from "../helpers/stringHelper";

export type WorkoutProps = {
  workout: IWorkout;
};

const Workout: FC<WorkoutProps> = (props) => {
  const { workout } = props;
  const { completedSetIds } = useSetStore();

  const exercises = workout.exercises.map((exercise, index) => {
    const exerciseComplete = exercise?.sets?.every((_, index) => {
      const setId = convertToSetId(workout.name, exercise.name, index);
      return !!completedSetIds[setId];
    });

    const className = exerciseComplete ? "bg-teal-950" : "bg-accent-content";

    return (
      <Collapse
        classNames={className}
        key={`exercise-${index}`}
        primaryHeaderText="Exercise: "
        secondaryHeaderText={exercise.name}
      >
        <Exercise exercise={exercise} workoutName={workout.name} />
      </Collapse>
    );
  });

  return exercises;
};

export default Workout;