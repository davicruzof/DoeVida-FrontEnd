import { Visibility } from "@material-ui/icons";
import { IconButton, Snackbar } from "@mui/material";
import Table from "../../components/Table";
import { useContext, useEffect, useState } from "react";
import AddAgendamento from "../../pages/AddAgendamento";
import { AuthContext } from "../../context/auth";

function Agendamentos_Doador() {
  const { authValues } = useContext(AuthContext);
  const [pageSize, setPageSize] = useState<number>(10);

  const [rows, setRows] = useState<any[]>([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenSnack = (text: string) => {
    setMessageSnack(text);
    setOpenSnack(true);
  };
  const handleCloseSnack = () => setOpenSnack(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    const schedules = window.localStorage.getItem("schedules");

    if (schedules) {
      const parsedSchedules = JSON.parse(schedules);

      const schedulesByUser = parsedSchedules
        .filter((schedule: any) => schedule.user_id === authValues.user.cpf)
        .map((schedule: any) => {
          return {
            id: schedule.id,
            local: schedule.enterpriseName,
            dataSchedule: schedule.date,
            hourSchedule: schedule.hour,
          };
        });

      setRows(schedulesByUser);
    }

    setOpen(false);
  };

  function handleEditClick(id: any): void {
    console.log("Function not implemented.");
  }

  const VISIBLE_FIELDS = [
    { field: "local", headerName: "Local", width: 500 },
    { field: "dataSchedule", headerName: "Data do Agendamento", width: 250 },
    { field: "hourSchedule", headerName: "Horário do Agendamento", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, ...rest }: any) => {
        return [
          // eslint-disable-next-line react/jsx-key
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => handleEditClick(id)}
          >
            <Visibility />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    const schedules = window.localStorage.getItem("schedules");

    if (schedules) {
      const parsedSchedules = JSON.parse(schedules);

      const schedulesByUser = parsedSchedules
        .filter((schedule: any) => schedule.user_id === authValues.user.cpf)
        .map((schedule: any) => {
          return {
            id: schedule.id,
            local: schedule.enterpriseName,
            dataSchedule: schedule.date,
            hourSchedule: schedule.hour,
          };
        });

      setRows(schedulesByUser);
    }
  }, []);

  return (
    <div>
      <Table
        loading={false}
        fields={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
        tableAddText="novo agendamento"
        tableAddAction={handleOpen}
      />

      <AddAgendamento
        open={open}
        closeModal={handleClose}
        openSnack={handleOpenSnack}
      />

      <Snackbar
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
        message={messageSnack}
      />
    </div>
  );
}

export default Agendamentos_Doador;
