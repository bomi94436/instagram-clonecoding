export const shortNum = (num: number) => {
  if (num >= 1000 && num < 1000000) {
    return `${String(num).slice(-4, 1)}k`;
  }
  if (num >= 1000000 && num < 1000000000) {
    return `${String(num).slice(-7, 1)}m`;
  }
  if (num >= 1000000000) {
    return `${String(num).slice(-10, 1)}g`;
  }
  return `${num}`;
};

export const timeForToday = (value: Date) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};
