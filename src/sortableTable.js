import React, {useEffect, useState} from 'react';

const SortableTableColumn = ({ data, columnName, onSort }) => {
  const [sortOrder, setSortOrder] = useState(null);

  const handleClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[columnName] > b[columnName] ? 1 : -1;
    } else if (sortOrder === 'desc') {
      return a[columnName] < b[columnName] ? 1 : -1;
    }
    return 0;
  });
  // onSort(sortedData)
  return (
    <th onClick={handleClick}>
      {columnName}
      {sortOrder && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}
    </th>
  );
};

export default SortableTableColumn;
