/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import { Delete } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import Table from "../../components/Table";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

interface IItemData {
  enterpriseName: string;
  id: string;
  dia: string;
  horario: string[];
  quantidade: number;
}

interface IItemDataFormatted {
  id: string;
  day: string;
  range_hour: string;
  vagas_quantity: string;
}

function Vagas() {
  const navigate = useNavigate();
  const { authValues } = useContext(AuthContext);
  const [rows, setRows] = useState<IItemDataFormatted[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);

  const deleteAction = (id: string) => {
    const result = window.confirm("Deseja realmente excluir?");

    if (!result) {
      return;
    }

    const vagas = window.localStorage.getItem("vagas");

    if (vagas) {
      const parsedVagas = JSON.parse(vagas);
      const filteredVagas: IItemData[] = parsedVagas.filter(
        (item: IItemData) =>
          item.id !== id && item.enterpriseName === authValues.enterprise?.name
      );

      window.localStorage.setItem("vagas", JSON.stringify(filteredVagas));

      const vagasFormatted = filteredVagas.map((item: IItemData) => {
        return {
          id: item.id,
          day: item.dia,
          range_hour: item.horario.map((item) => item).join(" - "),
          vagas_quantity: item.quantidade.toString(),
        };
      });

      setRows(vagasFormatted);
    }
  };

  const VISIBLE_FIELDS = [
    { field: "day", headerName: "Dia da semana", width: 300 },
    { field: "range_hour", headerName: "Horário", width: 350 },
    { field: "vagas_quantity", headerName: "Quantidade de vagas", width: 350 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (item: IItemData) => {
        return [
          <IconButton
            color="primary"
            aria-label="delete enterprise"
            component="label"
            onClick={() => deleteAction(item.id)}
          >
            <Delete color="error" />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    const items = window.localStorage.getItem("vagas");

    if (items) {
      const vagasParsed = JSON.parse(items);

      const vagasFormatted = vagasParsed
        .filter(
          (item: IItemData) =>
            authValues.enterprise?.name === item.enterpriseName
        )
        .map((item: IItemData) => {
          return {
            id: item.id,
            day: item.dia,
            range_hour: item.horario.map((item) => item).join(" - "),
            vagas_quantity: item.quantidade.toString(),
          };
        });

      setRows(vagasFormatted);
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
        tableAddAction={() => navigate("/addVaga", { replace: true })}
        tableAddText="novas vagas"
      />
    </div>
  );
}

export default Vagas;
