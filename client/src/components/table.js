import {
  useTable,
} from 'react-table'
import React from "react";

export default function Table(props) {
  const { columns, data, onRowClick } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <table {...getTableProps()} style={styles.outline}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} style={styles.headerRow}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()} style={styles.header}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} onClick={() => onRowClick(row)} style={styles.row}>
            {row.cells.map(cell => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

const styles = {
  outline: {
    border: 'solid 1px black'
  },
  header: {
    textAlign: 'left'
  },
  headerRow: {
    borderBottom: 'solid 3px red',
    background: 'aliceblue',
    color: 'black',
    fontWeight: 'bold',
  },
};
