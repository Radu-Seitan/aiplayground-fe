import { CircularProgress, Stack, TableCell, TableRow } from "@mui/material";
import { FC } from "react";

export const LoadingRow: FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <CircularProgress />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
