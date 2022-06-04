type categories = "Underweight" | "Normal" | "Overweight" | "Obese";
export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  let category: categories;
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }
  return `${category}`;
};

/* interface IBMIArguments {
  height: number;
  weight: number;
}
const parseBMIArgs = (args: Array<string>): IBMIArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  const argsHaveNaN = args.slice(2).find((arg) => isNaN(Number(arg)));
  if (argsHaveNaN) {
    throw new Error(`Argument "${argsHaveNaN}" is not a number`);
  }
  const [height, weight] = [Number(args[2]), Number(args[3])];
  return { height, weight };
};

try {
  const { height, weight } = parseBMIArgs(process.argv);
  const bmiResult = calculateBmi(height, weight);
  console.log(bmiResult);
} catch (e: unknown) {
  if (e instanceof Error) {
    const errorMessage = `Error: ${e.message}`;
    console.log(errorMessage);
  }
} */
