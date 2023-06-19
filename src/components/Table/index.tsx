import { Button, CircularProgress } from "@material-ui/core";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  ptBR,
} from "@mui/x-data-grid";
import Empty from "../../components/Empty";

export type TableProps = {
  pageSize: number;
  fields: any;
  rows: any;
  setPageSize: (value: number) => void;
  loading: boolean;
};

const Table = ({
  pageSize,
  fields,
  rows,
  setPageSize,
  loading,
}: TableProps) => {
  const height = window.innerHeight - 100;

  if (loading) return <CircularProgress />;

  if (rows.length === 0)
    return <Empty text="Nenhuma informação foi encontrada!" />;

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        style={{ justifyContent: "space-between", paddingRight: 30 }}
      >
        <GridToolbarQuickFilter />
        <Button
          id="basic-button"
          aria-controls={"fade-menu"}
          aria-haspopup="true"
          aria-expanded="true"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => {}}
          color="primary"
          variant="contained"
          style={{ fontWeight: "600", color: "#fff", height: 42 }}
        >
          Novo Agendamento
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <DataGrid
        columns={fields}
        rows={rows}
        // slots={{ toolbar: GridToolbar }}
        slots={{
          toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: pageSize, page: 0 },
          },
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        onPaginationModelChange={(newPageSize: any) => setPageSize(newPageSize)}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        pagination
        style={{
          paddingLeft: 20,
          justifyContent: "space-between",
          display: "flex",
          height,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Table;
