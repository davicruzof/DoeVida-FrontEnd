import { ButtonOutline } from "../../components/ButtonOutline";
import { Button } from "../../components/Button";
import * as S from "./styles";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
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

interface IScheduleData {
  id: string;
  enterpriseName: string;
  date: string;
  hour: string;
  user_id: string;
}

interface IVagas {
  id: number;
  enterpriseName: string;
  dia: string;
  horario: string[];
  quantidade: number;
}

function AddAgendamento({
  open,
  closeModal,
  openSnack,
}: {
  open: boolean;
  closeModal: () => void;
  openSnack: (text: string) => void;
}) {
  const { authValues } = useContext(AuthContext);
  const [enterPrises, setEnterprises] = useState<IEnterpriseData[]>([]);

  const [vagasDayByEnterprise, setVagasDayByEnterprise] = useState<string[]>(
    []
  );

  const [horariosByDay, setHorariosByDay] = useState<IVagas[]>([]);

  const [local, setLocal] = useState("selecione o local");

  const [dia, setDia] = useState("selecione o dia");

  const [horario, setHorario] = useState("selecione o horário");

  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
    setDia("selecione o dia");
    setHorario("selecione o horário");

    const vagas = window.localStorage.getItem("vagas");

    const vagasParsed = JSON.parse(vagas!) as IVagas[];

    // get dias by enterprise and not repeat days
    const daysByEnterprise = vagasParsed
      .filter((vaga) => vaga.enterpriseName === event.target.value)
      .map((vaga) => vaga.dia);

    // Remover duplicatas usando Set e converter string no formato de data dd/mm/yyyy
    const uniqueDaysByEnterprise = Array.from(new Set(daysByEnterprise)).map(
      (day) => {
        const [year, monthNumber, dayNumber] = day.split("-");

        return `${dayNumber.padStart(2, "0")}/${monthNumber.padStart(
          2,
          "0"
        )}/${year}`;
      }
    );

    setVagasDayByEnterprise(uniqueDaysByEnterprise);
  };

  const handleChangeDia = (event: SelectChangeEvent) => {
    setDia(event.target.value);
    setHorario("selecione o horário");

    const vagas = window.localStorage.getItem("vagas");

    const vagasParsed = JSON.parse(vagas!) as IVagas[];

    const date = event.target.value.split("/").reverse().join("-");

    const vagasByDay = vagasParsed.filter(
      (vaga) =>
        vaga.dia === date &&
        vaga.enterpriseName === local &&
        vaga.quantidade > 0
    );

    setHorariosByDay(vagasByDay);
  };

  const handleChangeHorario = (event: SelectChangeEvent) => {
    setHorario(event.target.value);
  };

  const subtractVaga = (vaga: IVagas) => {
    const vagas = window.localStorage.getItem("vagas");

    const vagasParsed = JSON.parse(vagas!) as IVagas[];

    const vagasFiltered = vagasParsed.map((item) => {
      if (item.id === vaga.id) {
        item.quantidade -= 1;
      }

      return item;
    });

    window.localStorage.setItem("vagas", JSON.stringify(vagasFiltered));
  };

  const createItem = () => {
    if (local === "selecione o local") {
      openSnack("Selecione um local");
      return;
    }

    if (dia === "selecione o dia") {
      openSnack("Selecione um dia");
      return;
    }

    if (horario === "selecione o horário") {
      openSnack("Selecione um horário");
      return;
    }

    const schedules = window.localStorage.getItem("schedules");

    const id = Math.random().toString(36).substr(2, 9);

    const scheduleData: IScheduleData = {
      id,
      enterpriseName: local,
      date: dia,
      hour: horario,
      user_id: authValues.user.cpf,
    };

    if (schedules) {
      const parsedSchedules = JSON.parse(schedules);

      if (
        parsedSchedules.filter(
          (item: IScheduleData) => item.user_id === authValues.user.cpf
        ).length > 3
      ) {
        openSnack("Você já possui 3 agendamentos cadastrados");
        return;
      }

      const newSchedules = [...parsedSchedules, scheduleData];

      window.localStorage.setItem("schedules", JSON.stringify(newSchedules));
    } else {
      window.localStorage.setItem("schedules", JSON.stringify([scheduleData]));
    }

    subtractVaga(
      horariosByDay.find(
        (vaga) =>
          vaga.dia === dia.split("/").reverse().join("-") &&
          vaga.enterpriseName === local &&
          vaga.horario.join("-") === horario
      )!
    );

    setLocal("selecione o local");
    setDia("selecione o dia");
    setHorario("selecione o horário");
    setVagasDayByEnterprise([]);
    setHorariosByDay([]);

    closeModal();
    openSnack("Agendamento cadastrado com sucesso");
  };

  useEffect(() => {
    const enterprises = window.localStorage.getItem("enterprises");

    if (enterprises) {
      const parsedEnterprises = JSON.parse(enterprises);

      setEnterprises(parsedEnterprises);
    }
  }, []);

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
        <S.Title>Cadastrar novo agendamento</S.Title>
        <S.Form role="form">
          <S.TitleSection>Dados do agendamento</S.TitleSection>
          <S.WrapperForm>
            <S.WrapperError>
              <InputLabel sx={{ color: "#000" }} id="select-local">
                Local
              </InputLabel>
              <Select
                labelId="select-local"
                value={local}
                sx={{
                  width: "100%",
                  paddingLeft: 4,
                  flexDirection: "column",
                  display: "flex",
                }}
                placeholder="selecione o local"
                label="selecione o local"
                onChange={handleChangeLocal}
              >
                <MenuItem value="selecione o local" selected disabled>
                  selecione o local
                </MenuItem>
                {enterPrises.map((enterprise) => (
                  <MenuItem
                    key={enterprise.id}
                    value={enterprise.enterpriseName}
                  >
                    {enterprise.enterpriseName}
                  </MenuItem>
                ))}
              </Select>
            </S.WrapperError>
          </S.WrapperForm>
          <S.WrapperForm>
            <S.WrapperError>
              <InputLabel sx={{ color: "#000" }} id="select-Dia">
                Dia
              </InputLabel>
              <Select
                labelId="select-Dia"
                value={dia}
                sx={{
                  width: "100%",
                  paddingLeft: 4,
                  flexDirection: "column",
                  display: "flex",
                }}
                disabled={vagasDayByEnterprise.length === 0}
                placeholder="selecione o dia"
                label="selecione o dia"
                onChange={handleChangeDia}
              >
                <MenuItem value="selecione o dia" selected disabled>
                  selecione o dia
                </MenuItem>
                {vagasDayByEnterprise.map((vaga) => (
                  <MenuItem key={vaga} value={vaga}>
                    {vaga}
                  </MenuItem>
                ))}
              </Select>
            </S.WrapperError>
          </S.WrapperForm>

          <S.WrapperForm>
            <S.WrapperError>
              <InputLabel sx={{ color: "#000" }} id="select-horario">
                Horário
              </InputLabel>
              <Select
                labelId="select-horario"
                value={horario}
                sx={{
                  width: "100%",
                  paddingLeft: 4,
                  flexDirection: "column",
                  display: "flex",
                }}
                disabled={horariosByDay.length === 0}
                placeholder="selecione o horário"
                label="selecione o horário"
                onChange={handleChangeHorario}
              >
                <MenuItem value="selecione o horário" selected disabled>
                  selecione o horário
                </MenuItem>
                {horariosByDay.map((horario) => (
                  <MenuItem key={horario.id} value={horario.horario.join("-")}>
                    {horario.horario.join("-")}
                  </MenuItem>
                ))}
              </Select>
            </S.WrapperError>
          </S.WrapperForm>
        </S.Form>

        <S.ButtonsContainer>
          <ButtonOutline textButton="fechar" handlePress={closeModal} />
          <Button textButton="cadastrar" onClick={createItem} />
        </S.ButtonsContainer>
      </Box>
    </S.Container>
  );
}

export default AddAgendamento;
