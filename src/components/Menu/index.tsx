import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { FC } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import DevicesIcon from "@mui/icons-material/Devices";

import "./Menu.css";

export const Menu: FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" className={"menu-drawer"}>
      <Box className={"menu-container"}>
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src="/asset/logo_simple_transparent.png"
            className={"menu-logo-image"}
          />
          <Box className={"menu-title"}>AI Playground</Box>
        </Stack>
        <List sx={{ width: "100%" }}>
          <ListItem key={"home"} disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"platforms"} disablePadding>
            <ListItemButton onClick={() => navigate("/platforms")}>
              <ListItemIcon>
                <DevicesIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Platforms"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
