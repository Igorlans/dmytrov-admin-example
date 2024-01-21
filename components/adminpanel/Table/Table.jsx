import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({rows, columns}) => {
  return (
    <div style={{ height: 600, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <DataGrid
        align="center"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        hideFooterRowCount={true}
      />
    </div>
  );
}

export default DataTable
