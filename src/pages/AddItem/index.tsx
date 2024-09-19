import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonOutline } from "../../components/ButtonOutline";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { createItemFormSchema, CreateItemProps } from "./type";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface IItemData {
  id: string;
  enterpriseName: string;
  itemName: string;
  typeItem: string;
}

function AddItem({
  open,
  closeModal,
  openSnack,
}: {
  open: boolean;
  closeModal: () => void;
  openSnack: (text: string) => void;
}) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateItemProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(createItemFormSchema),
  });

  const [typeItem, setTypeItem] = useState("Selecione o tipo do item");

  const handleChange = (event: SelectChangeEvent) => {
    setTypeItem(event.target.value);
    setValue("typeItem", event.target.value);
  };

  const createItem = (data: CreateItemProps) => {
    const { itemName, typeItem } = getValues();

    const items = window.localStorage.getItem("items");
    const enterprise = window.sessionStorage.getItem("authStorage");

    const enterpriseParsed = JSON.parse(enterprise!);

    const id = Math.random().toString(36).substr(2, 9);

    const enterpriseData: IItemData = {
      id,
      enterpriseName: enterpriseParsed.enterprise.name,
      itemName: itemName,
      typeItem: typeItem,
    };

    if (items) {
      const parsedEnterprises = JSON.parse(items);

      const existItem = parsedEnterprises.find(
        (item: IItemData) =>
          item.itemName === data.itemName &&
          item.typeItem === data.typeItem &&
          item.enterpriseName === enterpriseParsed.enterprise.name
      );

      if (existItem) {
        window.alert("Já existe uma item com esse nome");
        return;
      }

      const newEnterprises = [...parsedEnterprises, enterpriseData];
      window.localStorage.setItem("items", JSON.stringify(newEnterprises));
    } else {
      window.localStorage.setItem("items", JSON.stringify([enterpriseData]));
    }

    closeModal();
    openSnack("Item cadastrado com sucesso");
  };

  return (
    <S.Container open={open} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <S.Title>Cadastrar novo item</S.Title>
        <S.Form role="form">
          <S.TitleSection>Dados do item</S.TitleSection>
          <S.WrapperForm>
            <S.WrapperError>
              <Input
                type="text"
                label="Nome do item"
                placeholder="Digite o nome do item"
                register={register}
                name="itemName"
              />

              {errors.itemName && (
                <S.TextError>{errors.itemName.message}</S.TextError>
              )}
            </S.WrapperError>
          </S.WrapperForm>
          <S.WrapperForm>
            <S.WrapperError>
              <InputLabel sx={{ color: "#000" }} id="demo-simple-select-label">
                Selecione o tipo do item
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={typeItem}
                sx={{
                  width: "100%",
                  paddingLeft: 4,
                  flexDirection: "column",
                  display: "flex",
                }}
                placeholder="Tipo do item"
                label="Tipo do item"
                onChange={handleChange}
              >
                <MenuItem value="Selecione o tipo do item" selected disabled>
                  Selecione o tipo do item
                </MenuItem>
                <MenuItem value="recipiente">recipiente</MenuItem>
                <MenuItem value="material de esterilização">
                  material de esterilização
                </MenuItem>
              </Select>

              {errors.typeItem && (
                <S.TextError>{errors.typeItem.message}</S.TextError>
              )}
            </S.WrapperError>
          </S.WrapperForm>
        </S.Form>

        <S.ButtonsContainer>
          <ButtonOutline textButton="fechar" handlePress={closeModal} />
          <Button textButton="Adicionar item" onClick={createItem} />
        </S.ButtonsContainer>
      </Box>
    </S.Container>
  );
}

export default AddItem;
