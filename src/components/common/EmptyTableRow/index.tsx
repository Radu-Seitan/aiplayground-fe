import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { FC } from "react";

export const EmptyTableRow: FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography>No data available</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
