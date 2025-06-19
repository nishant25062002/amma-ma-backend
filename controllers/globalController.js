import Number from "../models/Number.js";


// Generate categoryId
export const generateOrderId = async () => {
  let global = await Number.findOneAndUpdate(
    { type: "order" },
    { $inc: { number: 1 } },
    { new: true, upsert: true }
  );

  const number = generateNumber(global.number);
  return `AO${number}`;
};


export const generateNumber = (number) => {
  const minimumLength = 6;
  const numberString = number.toString();

  return numberString.padStart(
    Math.max(minimumLength, numberString.length),
    "0"
  );
};