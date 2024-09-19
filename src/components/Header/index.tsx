import Logo from "@/assets/logo.svg";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { AttendantItems } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState(AttendantItems);
  const { authValues } = useContext(AuthContext);
  const user = window.sessionStorage.getItem("authStorage");
  const path = location.pathname;

  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignUp = () => {
    navigate("/", { replace: true });
    window.sessionStorage.removeItem("authStorage");
    window.location.reload();
  };

  useEffect(() => {
    if (authValues?.signed) {
      const isAdmin = authValues.user_type === "admin";

      console.log("isAdmin", isAdmin);
      console.log("authValues", authValues);

      if (authValues.user_type === "admin") {
        setItems([
          { key: "menuAttendantEnterprises", path: "enterprises" },
          { key: "menuAttendantDonors", path: "doadores" },
        ]);
      }

      if (authValues.user_type === "user") {
        setItems([
          { key: "menuAttendantSchedules", path: "agendamentos doador" },
          { key: "menuAttendantRequests", path: "solicitações" },
        ]);
      }
    }
  }, [authValues]);

  return (
    <S.Container>
      <S.WrapperLogo>
        <S.Logo src={Logo} alt="" />
        <S.Title>{t("appName")}</S.Title>
      </S.WrapperLogo>
      {authValues?.signed && (
        <>
          <S.MenuDesktop>
            {items.map((item) => {
              const isActive = decodeURIComponent(path) === `/${item.path}`;
              return (
                <S.MenuItem
                  key={item.key}
                  active={isActive ? "true" : undefined}
                  onClick={() => navigate(item.path, { replace: true })}
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
              {JSON.parse(user!).user.name}
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
              <MenuItem onClick={handleSignUp}>Sair</MenuItem>
            </Menu>
          </div>
        </>
      )}
    </S.Container>
  );
}
