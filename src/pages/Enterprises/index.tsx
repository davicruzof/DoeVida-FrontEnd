/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import { Delete, Edit, Visibility } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IEnterpriseData {
  id: string;
  enterpriseName: string;
  phoneNumber: string;
  cnpj: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
  };
}

interface IEnterpriseDataFormatted {
  id: string;
  enterpriseName: string;
  phoneNumber: string;
}

function Enterprises() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<IEnterpriseDataFormatted[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);

  const enterPrises = (data: IEnterpriseData[]) => {
    const rowsFormatted = data.map((item) => {
      return {
        id: item.id,
        enterpriseName: item.enterpriseName,
        phoneNumber: item.phoneNumber,
      };
    });
    setRows(rowsFormatted);
  };

  const deleteAction = (id: string) => {
    const result = window.confirm("Deseja realmente excluir?");

    if (!result) {
      return;
    }

    const enterprises = window.localStorage.getItem("enterprises");

    if (enterprises) {
      const parsedEnterprises = JSON.parse(enterprises);
      const filteredEnterprises: IEnterpriseData[] = parsedEnterprises.filter(
        (item: IEnterpriseData) => item.id !== id
      );
      window.localStorage.setItem(
        "enterprises",
        JSON.stringify(filteredEnterprises)
      );
      enterPrises(filteredEnterprises);
    }
  };

  const editAction = (id: string) => {
    const enterprises = window.localStorage.getItem("enterprises");
    const enterprisesParsed = JSON.parse(enterprises!);

    const enterprise = enterprisesParsed.find(
      (item: IEnterpriseData) => item.id === id
    );

    navigate(`/editEnterprises`, { replace: true, state: enterprise });
  };

  const viewAction = (id: string) => {
    const enterprises = window.localStorage.getItem("enterprises");
    const enterprisesParsed = JSON.parse(enterprises!);

    const enterprise = enterprisesParsed.find(
      (item: IEnterpriseData) => item.id === id
    );

    console.log("enterprise", enterprise);

    navigate(`/viewEnterprises`, { replace: true, state: enterprise });
  };

  const VISIBLE_FIELDS = [
    { field: "enterpriseName", headerName: "Organização", width: 500 },
    { field: "phoneNumber", headerName: "Telefone", width: 350 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (item: IEnterpriseData) => {
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
    const enterprises = window.localStorage.getItem("enterprises");

    if (enterprises) {
      const parsedEnterprises = JSON.parse(enterprises);
      enterPrises(parsedEnterprises);
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
        tableAddAction={() => navigate("/addEnterprises", { replace: true })}
        tableAddText="nova organização"
      />
    </div>
  );
}

export default Enterprises;
