import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { Home } from "../components/Home";
import { Platforms } from "../components/Platforms";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<App />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/platforms"} element={<Platforms />} />
        <Route path="*" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
};
