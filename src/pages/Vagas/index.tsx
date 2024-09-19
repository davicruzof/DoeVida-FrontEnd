/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import { Delete, Edit, Visibility } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IItemData {
  id: string;
  day: string;
  range_hour: string;
  vagas_quantity: string;
  organizacao: string;
}

interface IItemDataFormatted {
  id: string;
  day: string;
  range_hour: string;
  vagas_quantity: string;
}

function Vagas() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<IItemDataFormatted[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);

  const itemsAction = (data: IItemData[]) => {
    const rowsFormatted = data.map((item) => {
      return {
        id: item.id,
        day: item.day,
        range_hour: item.range_hour,
        vagas_quantity: item.vagas_quantity,
      };
    });
    setRows(rowsFormatted);
  };

  const deleteAction = (id: string) => {
    const result = window.confirm("Deseja realmente excluir?");

    if (!result) {
      return;
    }

    const enterprises = window.localStorage.getItem("vagas");

    if (enterprises) {
      const parsedEnterprises = JSON.parse(enterprises);
      const filteredEnterprises: IItemData[] = parsedEnterprises.filter(
        (item: IItemData) => item.id !== id
      );
      window.localStorage.setItem(
        "enterprises",
        JSON.stringify(filteredEnterprises)
      );
      itemsAction(filteredEnterprises);
    }
  };

  const editAction = (id: string) => {
    const enterprises = window.localStorage.getItem("vagas");
    const enterprisesParsed = JSON.parse(enterprises!);

    const enterprise = enterprisesParsed.find(
      (item: IItemData) => item.id === id
    );

    navigate(`/editVaga`, { replace: true, state: enterprise });
  };

  const viewAction = (id: string) => {
    const enterprises = window.localStorage.getItem("vagas");
    const enterprisesParsed = JSON.parse(enterprises!);

    const enterprise = enterprisesParsed.find(
      (item: IItemData) => item.id === id
    );

    navigate(`/viewVagas`, { replace: true, state: enterprise });
  };

  const VISIBLE_FIELDS = [
    { field: "day", headerName: "Dia da semana", width: 400 },
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
            aria-label="view enterprise"
            component="label"
            onClick={() => viewAction(item.id)}
          >
            <Visibility />
          </IconButton>,
          <IconButton
            color="primary"
            aria-label="edit enterprise"
            component="label"
            onClick={() => editAction(item.id)}
          >
            <Edit />
          </IconButton>,
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
      itemsAction(vagasParsed);
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
