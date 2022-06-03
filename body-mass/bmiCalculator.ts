type categories = "Underweight" | "Normal" | "Overweight" | "Obese";
const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  console.log("bmi", bmi);
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
  return `${category} (${
    category === "Normal" ? "healthy" : "unhealthy"
  } weight)`;
};

console.log(calculateBmi(180, 74));
