import { getTotalWeight } from "../helpers/weightHelper";
import { ISet } from "../models";
import { FC, useMemo } from "react";

export type SetProps = {
  isCompleted: boolean;
  onComplete: (isCompleted: boolean) => void;
  set: ISet;
  setIndex: number;
};

const Set: FC<SetProps> = (props) => {
  const { isCompleted, onComplete, set, setIndex } = props;
  const weights = useMemo(() => set.weights.join(", "), [set]);
  const totalWeight = useMemo(() => getTotalWeight(set), [set]);

  return (
    <div className="rounded-box px-3 py-1 text-xs">
      <div className="grid grid-cols-2">
        <div>
          <span>Set: </span>
          <span className="badge badge-primary font-bold">{setIndex + 1}</span>
        </div>

        <div>
          <span>Reps: </span>
          <span className="badge badge-primary font-bold">{set.reps}</span>
        </div>
      </div>

      {!!totalWeight && (
        <div className="grid grid-cols-2 my-2">
          <div>
            <div>Total Weight (lb): </div>
            <div className="badge badge-neutral font-bold mt-1">
              {totalWeight}
            </div>
          </div>

          <div>
            <div>Weights (lb): </div>
            <div className="text-base-content mt-1">{weights}</div>
          </div>
        </div>
      )}

      {!!set.notes && (
        <div>
          <div>Notes: </div>
          <div className="text-base-content mt-1">{set.notes}</div>
        </div>
      )}

      <div className="grid grid-cols-2">
        <div></div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span>Completed:</span>
            <input
              defaultChecked={isCompleted}
              type="checkbox"
              className="checkbox checkbox-accent checkbox-lg"
              onChange={() => onComplete(!isCompleted)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Set;
