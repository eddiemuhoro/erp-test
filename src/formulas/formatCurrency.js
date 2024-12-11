// utils.js
export const formatCurrency = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "KSH",
    minimumFractionDigits: 2, // Ensures two decimal places
  });
};

// You can add more functions here and export them
export const addCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
