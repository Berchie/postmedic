export const tableColumns = (...titles) => {
  const Columns = [];

  for (let i = 0; i < titles.length; i++) {
    if (titles.length - 1 === i) {
      Columns.push(
        {
          title: titles[i],
          dataIndex: titles[i].toLowerCase(),
        },
      );
    } else {
      Columns.push(
        {
          title: titles[i],
          dataIndex: titles[i].toLowerCase(),
          width: 150,
        },
      );
      
    }
  }

  return Columns;
};
