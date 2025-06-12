import { Slider, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";

interface SliderComponentProps {
  name: string;
  minValue: number;
  maxValue: number;
  step?: number;
  value: number | number[];
  onChange?: (event: Event, value: number | number[]) => void;
}

const StyledTypography = styled(Typography)(() => ({
  minWidth: 60,
  padding: "6px 12px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  textAlign: "center",
  fontWeight: 500,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
}));

export const SliderComponent: FC<SliderComponentProps> = (
  props: SliderComponentProps
) => {
  const { name, minValue, maxValue, step, value, onChange } = props;

  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <StyledTypography variant="body1" color="primary">
        {minValue}
      </StyledTypography>
      <Slider
        name={name}
        min={minValue}
        max={maxValue}
        step={step}
        value={value}
        onChange={onChange}
        sx={{ flex: 1 }}
        valueLabelDisplay="auto"
      />
      <StyledTypography variant="body1" color="primary">
        {maxValue}
      </StyledTypography>
    </Stack>
  );
};
