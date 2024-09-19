/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
import { Delete, Edit, Visibility } from "@material-ui/icons";
import { Box, IconButton, Modal, Snackbar } from "@mui/material";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItem from "../../pages/AddItem";

interface IItemData {
  id: string;
  enterpriseName: string;
  itemName: string;
  typeItem: string;
}

interface IItemDataFormatted {
  id: string;
  itemName: string;
  enterpriseName: string;
  typeItem: string;
}

function Items() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<IItemDataFormatted[]>([]);

  const [pageSize, setPageSize] = useState<number>(10);

  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenSnack = (text: string) => {
    setMessageSnack(text);
    setOpenSnack(true);
  };
  const handleCloseSnack = () => setOpenSnack(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemsAction = (data: IItemData[]) => {
    const rowsFormatted = data.map((item) => {
      return {
        id: item.id,
        itemName: item.itemName,
        enterpriseName: item.enterpriseName,
        typeItem: item.typeItem,
      };
    });
    setRows(rowsFormatted);
  };

  const deleteAction = (id: string) => {
    const result = window.confirm("Deseja realmente excluir?");

    if (!result) {
      return;
    }

    const enterprises = window.localStorage.getItem("items");

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
    const enterprises = window.localStorage.getItem("items");
    const enterprisesParsed = JSON.parse(enterprises!);

    const enterprise = enterprisesParsed.find(
      (item: IItemData) => item.id === id
    );

    navigate(`/editItems`, { replace: true, state: enterprise });
  };

  const viewAction = (id: string) => {
    const enterprises = window.localStorage.getItem("items");
    const enterprisesParsed = JSON.parse(enterprises!);

    const enterprise = enterprisesParsed.find(
      (item: IItemData) => item.id === id
    );

    navigate(`/viewItems`, { replace: true, state: enterprise });
  };

  const VISIBLE_FIELDS = [
    { field: "itemName", headerName: "Item", width: 500 },
    { field: "enterpriseName", headerName: "Organização", width: 350 },
    { field: "typeItem", headerName: "Tipo", width: 300 },
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
    const items = window.localStorage.getItem("items");

    if (items) {
      const itemsEnterprises = JSON.parse(items);
      itemsAction(itemsEnterprises);
    }
  }, []);

  useEffect(() => {
    const items = window.localStorage.getItem("items");

    if (items && !open) {
      const itemsEnterprises = JSON.parse(items);
      itemsAction(itemsEnterprises);
    }
  }, [open]);

  return (
    <div>
      <Table
        loading={false}
        fields={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
        tableAddAction={handleOpen}
        tableAddText="novo item"
      />

      <AddItem
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

export default Items;
