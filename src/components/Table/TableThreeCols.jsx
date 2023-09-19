function TableThreeCols({ column1Title, column2Title, column3Title, data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>{column1Title}</th>
          <th>{column2Title}</th>
          <th>{column3Title}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
            <td>{row.column3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableThreeCols;
