interface IResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const descriptions = {
  1: "don't feel bad, all of us need a start point",
  2: "you're almost there, keep it up!",
  3: "you must feel really proud of you, you've made it!",
};
const calculateExercises = (
  dailyTime: Array<number>,
  targetTime: number
): IResult => {
  const periodLength = dailyTime.length;
  const trainingDays = dailyTime.filter((day) => day !== 0).length;
  const average = dailyTime.reduce((p, c) => p + c, 0) / periodLength;
  const [averageFixed, thirdTargetFixed] = [
    Number(average.toFixed(2)),
    Number((targetTime / 3).toFixed(2)),
  ];
  const rating =
    averageFixed >= thirdTargetFixed * 3
      ? 3
      : averageFixed >= thirdTargetFixed * 2
      ? 2
      : 1;
  const result: IResult = {
    periodLength,
    trainingDays,
    success: average >= targetTime,
    rating,
    ratingDescription: descriptions[rating],
    target: targetTime,
    average,
  };
  return result;
};

interface ICalcArguments {
  dailyTime: Array<number>;
  targetTime: number;
}
const parseExerciseArgs = (args: Array<string>): ICalcArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const argsHaveNaN = args.slice(2).find((arg) => isNaN(Number(arg)));
  if (argsHaveNaN) {
    throw new Error(`Argument "${argsHaveNaN}" is not a number`);
  }
  const targetTime = Number(args[2]);
  const dailyTime = args.slice(3).map((arg) => Number(arg));
  return { dailyTime, targetTime };
};

try {
  const { dailyTime, targetTime } = parseExerciseArgs(process.argv);
  const exerciseResult = calculateExercises(dailyTime, targetTime);
  console.log(exerciseResult);
} catch (e: unknown) {
  if (e instanceof Error) {
    const errorMessage = `Error: ${e.message}`;
    console.log(errorMessage);
  }
}
