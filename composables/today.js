export const useToday = () => {
  // 返回今天的日期 30/11/2023
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
