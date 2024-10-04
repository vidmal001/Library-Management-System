export const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.round(daysDifference); // Round to the nearest whole day
  };
  
  export const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };