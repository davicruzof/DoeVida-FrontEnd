import { Edit, Visibility } from "@material-ui/icons";
import { Avatar, Chip, IconButton } from "@mui/material";
import Table from "../../components/Table";
import { useState } from "react";
// import { useTranslation } from "react-i18next";
import { Faker, pt_BR } from "@faker-js/faker";
import { DateTime } from "luxon";

function Home() {
  console.log("Function not implemented.");
  // const { t, i18n } = useTranslation();
  const faker = new Faker({
    locale: [pt_BR],
  });

  const [pageSize, setPageSize] = useState<number>(10);

  function handleEditClick(id: any): void {
    console.log("Function not implemented.");
  }

  function createRandomScheduler() {
    const result = [];

    for (let index = 0; index < 100; index++) {
      result[index] = {
        id: faker.datatype.uuid(),
        nome: faker.person.fullName(),
        dataSchedule: DateTime.fromISO(
          faker.date.recent({ days: 2 }).toISOString()
        ).toFormat("dd/MM/yyyy"),
        hourSchedule: DateTime.fromISO(
          faker.datatype.datetime().toISOString()
        ).toFormat("HH:mm"),
      };
    }
    return result;
  }

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Nome", width: 350 },
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

  const rows = createRandomScheduler();

  return (
    <div>
      <Table
        loading={false}
        fields={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default Home;
