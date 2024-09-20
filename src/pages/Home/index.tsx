import { Visibility } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import Table from "../../components/Table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { users } from "../SignIn/components/CardForm/dataBase";

function Home() {
  const { authValues } = useContext(AuthContext);

  const [rows, setRows] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  function handleEditClick(id: any): void {
    console.log("Function not implemented.");
  }

  const VISIBLE_FIELDS = [
    { field: "name", headerName: "Nome", width: 350 },
    { field: "dataSchedule", headerName: "Data do Agendamento", width: 350 },
    { field: "hourSchedule", headerName: "Horário do Agendamento", width: 350 },
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
        .filter(
          (schedule: any) =>
            schedule.enterpriseName === authValues.enterprise!.name
        )
        .map((schedule: any) => {
          const user = users.find((user) => user.cpf === schedule.user_id);

          return {
            id: schedule.id,
            name: user?.name,
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
        tableAddAction={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default Home;
