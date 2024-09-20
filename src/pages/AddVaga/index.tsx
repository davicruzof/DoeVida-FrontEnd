import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonOutline } from "../../components/ButtonOutline";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { createItemFormSchema, CreateItemProps } from "./type";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";

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

function AddVagas() {
  const navigate = useNavigate();

  const { authValues } = useContext(AuthContext);

  const [day, setDay] = useState("");
  const [vagas_quantity, setVagas_quantity] = useState<number>();
  const [hourInit, setHourInit] = useState("Selecione um horario");
  const [hourEnd, setHourEnd] = useState("Selecione um horario");

  const divideTimeRange = (start: string, end: string, parts: number) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    const totalMinutes =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const interval = totalMinutes / parts;

    const intervals = [];
    for (let i = 0; i < parts; i++) {
      const intervalStart = new Date(
        startTime.getTime() + interval * i * 60 * 1000
      );
      const intervalEnd = new Date(
        startTime.getTime() + interval * (i + 1) * 60 * 1000
      );
      intervals.push(
        `${intervalStart.getHours().toString().padStart(2, "0")}:${intervalStart
          .getMinutes()
          .toString()
          .padStart(2, "0")} - ${intervalEnd
          .getHours()
          .toString()
          .padStart(2, "0")}:${intervalEnd
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    }

    return intervals;
  };

  const handleChangeInitialHour = (event: SelectChangeEvent) => {
    setHourInit(event.target.value);
  };

  const handleChangeEndHour = (event: SelectChangeEvent) => {
    setHourEnd(event.target.value);
  };

  const createItem = () => {
    if (!vagas_quantity) {
      return;
    }

    if (hourInit === "Selecione um horario") {
      return;
    }

    if (hourEnd === "Selecione um horario") {
      return;
    }

    console.log({ authValues });

    const range_hour = divideTimeRange(hourInit, hourEnd, vagas_quantity);

    const items = window.localStorage.getItem("vagas");

    const vagas = range_hour.map((item) => {
      return {
        enterpriseName: authValues.enterprise?.name,
        id: Math.random().toString(36).substr(2, 9),
        dia: day,
        horario: item.split(" - "),
        quantidade: 1,
      };
    });

    if (items) {
      const vagasParsed = JSON.parse(items);
      const vagasFormatted = [...vagasParsed, ...vagas];
      window.localStorage.setItem("vagas", JSON.stringify(vagasFormatted));
    } else {
      window.localStorage.setItem("vagas", JSON.stringify(vagas));
    }

    alert("Vagas cadastradas com sucesso!");
    navigate("/vagas", { replace: true });
  };

  return (
    <S.Container>
      <S.Title>Cadastrar novas vagas</S.Title>
      <S.Form role="form">
        <S.TitleSection>Dados das vagas</S.TitleSection>
        <S.WrapperForm>
          <S.WrapperError>
            <S.Label>Dia</S.Label>
            <TextField
              id="outlined-basic"
              type="date"
              sx={{ width: "100%" }}
              onChange={(e) => setDay(e.target.value)}
              value={day}
            />
          </S.WrapperError>
        </S.WrapperForm>
        <S.WrapperForm>
          <S.WrapperError>
            <S.Label>Quantidade de vagas</S.Label>
            <TextField
              id="outlined-basic"
              placeholder="informe a quantidade de vagas"
              sx={{ width: "100%" }}
              onChange={(e) => setVagas_quantity(+e.target.value)}
              value={vagas_quantity}
            />
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
          </S.WrapperError>
        </S.WrapperForm>
      </S.Form>

      <S.ButtonsContainer>
        <ButtonOutline
          textButton="voltar"
          handlePress={() => navigate("/vagas", { replace: true })}
        />
        <Button textButton="Cadastrar" onClick={createItem} />
      </S.ButtonsContainer>
    </S.Container>
  );
}

export default AddVagas;
