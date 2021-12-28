const columns = [
  {
    columnDef: 'index',
    header: 'No.',
    cell: (element: any) => `${element.index}`,
  },
  {
    columnDef: 'img',
    header: 'Img.',
    cell: (element: any) => `${element.imageUrl}`,
  },
  {
    columnDef: 'name',
    header: 'Name',
    cell: (element: any) => `${element.name}`,
  },
  {
    columnDef: 'price',
    header: 'Price',
    cell: (element: any) => `${element.price}`,
  },
  {
    columnDef: 'quantity',
    header: 'Quantity',
    cell: (element: any) => `${element.quantity}`,
  },
  {
    columnDef: 'sale',
    header: 'Sale',
    cell: (element: any) => `${element.sale}`,
  },
  {
    columnDef: 'type',
    header: 'Type',
    cell: (element: any) => `${element.type}`,
  },
  {
    columnDef: 'rating',
    header: 'Rating',
    cell: (element: any) => `${element.rating}`,
  },
];

export { columns };

// name: "suede armchair"
// price: 15
// quantity: 1
// rating: 4
// sale: 46
// type: "shoes"
// _id:
