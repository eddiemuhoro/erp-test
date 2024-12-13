const sales = [
  {
    id: 1,
    name: "James",
    sub_total: 300,
  },
  {
    id: 2,
    name: "Ken",
    sub_total: 330,
  },
  {
    id: 3,
    name: "Sam",
    sub_total: 240,
  },
  {
    id: 4,
    name: "Sam",
    sub_total: 2990,
  },
];

const customerRev = sales.reduce((acc, sale) => {
  acc[sale.name] = (acc[sale.name] || 0) + sale.sub_total;
  return acc;
}, {});

const sortedCustomers = Object.entries(customerRev);

console.log(sortedCustomers);

const top = sortedCustomers.reduce(
  (top, current) => {
    return current[1] > top[1] ? current : top;
  },
  ["", 0]
);

console.log(top);
