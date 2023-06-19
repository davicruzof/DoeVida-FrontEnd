import Logo from "@/assets/logo.svg";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { AttendantItems } from "./constants";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  console.log(location.pathname.replace("/", ""));
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.Container>
      <S.WrapperLogo>
        <S.Logo src={Logo} alt="" />
        <S.Title>{t("appName")}</S.Title>
      </S.WrapperLogo>
      <S.MenuDesktop>
        {AttendantItems.map((item) => {
          return (
            <S.MenuItem
              key={item.key}
              active={location.pathname.replace("/", "") === item.path}
            >
              {t(item.key)}
            </S.MenuItem>
          );
        })}
      </S.MenuDesktop>

      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="primary"
          endIcon={<ArrowDropDown />}
          style={{ fontWeight: "600", color: "#2763f5" }}
        >
          Daniel Lima
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
          <MenuItem onClick={handleClose}>Sair</MenuItem>
        </Menu>
      </div>
    </S.Container>
  );
}
