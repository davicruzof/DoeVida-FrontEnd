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
  enterpriseId: string;
  dia: string;
  horarios: string[];
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

  const [vagasByEnterprise, setVagasByEnterprise] = useState<IVagas[]>([]);

  const [horariosByDay, setHorariosByDay] = useState<string[]>([]);

  const [local, setLocal] = useState("selecione o local");

  const [dia, setDia] = useState("selecione o dia");

  const [horario, setHorario] = useState("selecione o horário");

  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);

    const enterprise = enterPrises.find(
      (enterprise) => enterprise.enterpriseName === event.target.value
    );

    const vagas = window.localStorage.getItem("vagas");

    const vagasParsed = JSON.parse(vagas!) as IVagas[];

    const vagasEnterprise = vagasParsed.filter(
      (vaga) => vaga.enterpriseId === enterprise?.id
    );

    setVagasByEnterprise(vagasEnterprise);
  };

  const handleChangeDia = (event: SelectChangeEvent) => {
    setDia(event.target.value);

    const vagasByDay = vagasByEnterprise.find(
      (vaga) => vaga.dia === event.target.value
    );

    setHorariosByDay(vagasByDay!.horarios);
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

      if (parsedSchedules.some((item: IScheduleData) => item.id === id)) {
        openSnack("Horário já cadastrado");
        return;
      }

      const newSchedules = [...parsedSchedules, scheduleData];

      window.localStorage.setItem("schedules", JSON.stringify(newSchedules));
    } else {
      window.localStorage.setItem("schedules", JSON.stringify([scheduleData]));
    }

    subtractVaga(vagasByEnterprise.find((vaga) => vaga.dia === dia)!);

    setLocal("selecione o local");
    setDia("selecione o dia");
    setHorario("selecione o horário");
    setVagasByEnterprise([]);
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
                disabled={vagasByEnterprise.length === 0}
                placeholder="selecione o dia"
                label="selecione o dia"
                onChange={handleChangeDia}
              >
                <MenuItem value="selecione o dia" selected disabled>
                  selecione o dia
                </MenuItem>
                {vagasByEnterprise.map((vaga) => (
                  <MenuItem key={vaga.id} value={vaga.dia}>
                    {vaga.dia}
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
                  <MenuItem key={horario} value={horario}>
                    {horario}
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
