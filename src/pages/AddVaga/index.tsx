import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonOutline } from "../../components/ButtonOutline";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { createItemFormSchema, CreateItemProps } from "./type";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface IItemData {
  id: string;
  day: string;
  hour_init: string;
  hour_end: string;
  vagas_quantity: string;
  organizacao: string;
}

function AddVagas() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateItemProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(createItemFormSchema),
  });

  const [day, setDay] = useState("Selecione o dia da semana");
  const [hourInit, setHourInit] = useState("Selecione um horario");
  const [hourEnd, setHourEnd] = useState("Selecione um horario");

  const handleChangeDay = (event: SelectChangeEvent) => {
    setDay(event.target.value);
    setValue("day", event.target.value);
  };
  const handleChangeInitialHour = (event: SelectChangeEvent) => {
    setHourInit(event.target.value);
    setValue("hour_init", event.target.value);
  };

  const handleChangeEndHour = (event: SelectChangeEvent) => {
    setHourEnd(event.target.value);
    setValue("hour_end", event.target.value);
  };

  const createItem = (data: CreateItemProps) => {
    console.log("Entrei aqui", data);

    const items = window.localStorage.getItem("vagas");
    const enterprise = window.sessionStorage.getItem("authStorage");

    const enterpriseParsed = JSON.parse(enterprise!);

    const id = Math.random().toString(36).substr(2, 9);

    const enterpriseData: IItemData = {
      id,
      day: data.day,
      hour_init: data.hour_init,
      hour_end: data.hour_end,
      vagas_quantity: data.vagas_quantity,
      organizacao: enterpriseParsed.enterprise.name,
    };

    if (items) {
      const parsedEnterprises = JSON.parse(items);

      const existItem = parsedEnterprises.find(
        (item: IItemData) => item.day === data.day
      );

      if (existItem) {
        window.alert("Já existe um dia cadastrado");
        return;
      }

      const newEnterprises = [...parsedEnterprises, enterpriseData];
      window.localStorage.setItem("vagas", JSON.stringify(newEnterprises));
    } else {
      window.localStorage.setItem("vagas", JSON.stringify([enterpriseData]));
    }

    window.alert("Item cadastrado com sucesso!");
    navigate("/apoio", { replace: true });
  };

  return (
    <S.Container>
      <S.Title>Cadastrar novas vagas</S.Title>
      <S.Form role="form">
        <S.TitleSection>Dados das vagas</S.TitleSection>
        <S.WrapperForm>
          <S.WrapperError>
            <InputLabel sx={{ color: "#000" }} id="day">
              Selecione o dia da semana
            </InputLabel>
            <Select
              labelId="day"
              value={day}
              sx={{
                width: "100%",
                paddingLeft: 4,
                flexDirection: "column",
                display: "flex",
              }}
              placeholder="Selecione o dia da semana"
              label="Selecione o dia da semana"
              onChange={handleChangeDay}
            >
              <MenuItem value="Selecione o dia da semana" selected disabled>
                Selecione o dia da semana
              </MenuItem>
              <MenuItem value="domingo">domingo</MenuItem>
              <MenuItem value="segunda">segunda</MenuItem>
              <MenuItem value="terça">terça</MenuItem>
              <MenuItem value="quarta">quarta</MenuItem>
              <MenuItem value="quinta">quinta</MenuItem>
              <MenuItem value="sexta">sexta</MenuItem>
              <MenuItem value="sábado">sábado</MenuItem>
            </Select>

            {errors.day && <S.TextError>{errors.day.message}</S.TextError>}
          </S.WrapperError>
        </S.WrapperForm>
        <S.WrapperForm>
          <S.WrapperError>
            <Input
              type="numeric"
              label="Quantidade de vagas"
              placeholder="Digite a quantidade de vagas"
              register={register}
              name="vagas_quantity"
            />

            {errors.vagas_quantity && (
              <S.TextError>{errors.vagas_quantity.message}</S.TextError>
            )}
          </S.WrapperError>
        </S.WrapperForm>
        <S.WrapperForm>
          <S.WrapperError>
            <InputLabel sx={{ color: "#000" }} id="hour_init">
              Selecione o horário inicial
            </InputLabel>
            <Select
              labelId="hour_init"
              value={hourInit}
              sx={{
                width: "100%",
                paddingLeft: 4,
                flexDirection: "column",
                display: "flex",
              }}
              placeholder="Horário inicial"
              label="Horário inicial"
              onChange={handleChangeInitialHour}
            >
              <MenuItem value="Selecione um horario" selected disabled>
                Selecione um horario
              </MenuItem>
              <MenuItem value="08:00">08:00</MenuItem>
              <MenuItem value="09:00">09:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="11:00">11:00</MenuItem>
              <MenuItem value="12:00">12:00</MenuItem>
              <MenuItem value="13:00">13:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="15:00">15:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
              <MenuItem value="17:00">17:00</MenuItem>
              <MenuItem value="18:00">18:00</MenuItem>
              <MenuItem value="19:00">19:00</MenuItem>
            </Select>

            {errors.hour_init && (
              <S.TextError>{errors.hour_init.message}</S.TextError>
            )}
          </S.WrapperError>
          <S.WrapperError>
            <InputLabel sx={{ color: "#000" }} id="hour_end">
              Selecione o horário inicial
            </InputLabel>
            <Select
              labelId="hour_end"
              value={hourEnd}
              sx={{
                width: "100%",
                paddingLeft: 4,
                flexDirection: "column",
                display: "flex",
              }}
              placeholder="Horário fim"
              label="Horário fim"
              onChange={handleChangeEndHour}
            >
              <MenuItem value="Selecione um horario" selected disabled>
                Selecione um horario
              </MenuItem>
              <MenuItem value="08:00">08:00</MenuItem>
              <MenuItem value="09:00">09:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="11:00">11:00</MenuItem>
              <MenuItem value="12:00">12:00</MenuItem>
              <MenuItem value="13:00">13:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="15:00">15:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
              <MenuItem value="17:00">17:00</MenuItem>
              <MenuItem value="18:00">18:00</MenuItem>
              <MenuItem value="19:00">19:00</MenuItem>
            </Select>

            {errors.hour_end && (
              <S.TextError>{errors.hour_end.message}</S.TextError>
            )}
          </S.WrapperError>
        </S.WrapperForm>
      </S.Form>

      <S.ButtonsContainer>
        <ButtonOutline
          textButton="voltar"
          handlePress={() => navigate("/vagas", { replace: true })}
        />
        <Button textButton="Cadastrar" onClick={handleSubmit(createItem)} />
      </S.ButtonsContainer>
    </S.Container>
  );
}

export default AddVagas;
