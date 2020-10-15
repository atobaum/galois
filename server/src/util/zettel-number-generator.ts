// generate yymmddxxx
export default function zettelNumberGenerator(prevId?: number): number {
  const today = new Date();
  const todayNum = formatDate(today);

  if (!prevId) return todayNum * 1000 + 1;
  if (prevId >= 10 ** 10) throw new Error("Invalid prevId: " + prevId);
  if (prevId % 1000 === 999)
    throw new Error("zettel number cannot exceed 999 in a day");

  if (~~(prevId / 1000) !== todayNum) return todayNum * 1000 + 1;
  return prevId + 1;
}

export function formatDate(date: Date): number {
  let result = date.getDate();
  result += (date.getMonth() + 1) * 100;
  result += (date.getFullYear() % 100) * 10000;
  return result;
}
