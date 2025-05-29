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
import { useNavigate } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import "./Menu.css";

export const Menu: FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      className={"menu-drawer"}
      PaperProps={{ sx: { border: "0" } }}
    >
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
          <ListItem key={"scopes"} disablePadding>
            <ListItemButton onClick={() => navigate("scopes")}>
              <ListItemIcon>
                <LightbulbIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Scopes"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"prompts"} disablePadding>
            <ListItemButton onClick={() => navigate("prompts")}>
              <ListItemIcon>
                <MessageIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Prompts"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"runs"} disablePadding>
            <ListItemButton onClick={() => navigate("runs")}>
              <ListItemIcon>
                <PlayCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Runs"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
