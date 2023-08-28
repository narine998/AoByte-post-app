export const formatFormDate = (inputDate) => {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString);
};
