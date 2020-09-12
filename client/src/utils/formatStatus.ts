export const formatStatus = (status: boolean): string => {
  const formattedStatus = status ? 'Complete' : 'Incomplete';
  return formattedStatus;
};
