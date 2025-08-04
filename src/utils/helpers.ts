export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};


export const generateHash = () => {
  return "h" + Math.random().toString(36).substring(2, 15)
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const getMonthName = (month: number) => {
  return monthNames[month];
};


