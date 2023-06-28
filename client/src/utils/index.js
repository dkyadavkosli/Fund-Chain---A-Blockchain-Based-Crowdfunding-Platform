export const daysLeft = (deadline) => {
  const diff = new Date(deadline).getTime() - Date.now();
  const remDays = diff / (1000 * 3600 * 24);

  return remDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const per = Math.round((raisedAmount * 100) / goal);

  return per;
};

