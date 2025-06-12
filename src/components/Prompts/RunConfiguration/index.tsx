import { FC, useEffect, useState } from "react";
import "./RunConfiguration.css";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank, PlayArrow } from "@mui/icons-material";
import { Model } from "../../shared/types/Model";
import { ModelsApiClient } from "../../../api/Clients/ModelsApiClient";
import { ModelModel } from "../../../api/Models/ModelModel";
import { SliderComponent } from "../../common/SliderComponent";
import { Run } from "../../shared/types/Run";
import { RunsApiClient } from "../../../api/Clients/RunsApiClient";
import { RunCreateModel } from "../../../api/Models/RunCreateModel";
import { useParams } from "react-router-dom";
import { RunModel } from "../../../api/Models/RunModel";
import { TableHeader } from "../../common/TableHeader";

export const RunConfiguration: FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);
  const [temperature, setTemperature] = useState(0);
  const [runResults, setRunResults] = useState<Run[]>([]);
  const [running, setRunning] = useState(false);
  const { id } = useParams();

  const columns = [
    {
      id: "modelName",
      label: "Model",
    },
    {
      id: "temperature",
      label: "Temperature",
    },
    {
      id: "result",
      label: "Result",
    },
  ];

  const handleTemperatureChange = (_event: Event, value: number | number[]) => {
    const temperature = Array.isArray(value) ? value[0] : value;
    setTemperature(temperature);
  };

  const fetchModels = async () => {
    try {
      setModelsLoading(true);
      const res = await ModelsApiClient.getAllAsync();
      const fetchedModels = res.map((e: ModelModel) => ({ ...e } as Model));
      setModels(fetchedModels);
      setModelsLoading(false);
    } catch (error: any) {
      console.log(error);
      setModelsLoading(false);
    }
  };

  const handleRun = async () => {
    try {
      setRunning(true);
      const runCreateModel: RunCreateModel = {
        modelRuns: selectedModels.map((model) => {
          return {
            id: model.id,
            temperature: temperature,
          };
        }),
        promptId: parseInt(id ?? "0", 10),
      };
      const result = await RunsApiClient.runAsync(runCreateModel);
      const runs = result.map((e: RunModel) => ({ ...e } as Run));
      setRunResults(runs);
      setRunning(false);
    } catch (error: any) {
      console.error("Error running models", error);
      return;
    }
  };

  const renderModelsSelect = () => {
    return (
      <Box>
        <Typography variant="h6">Select Models</Typography>
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={models}
          value={selectedModels}
          onChange={(event, newValue) => setSelectedModels(newValue)}
          getOptionLabel={(option: Model) => option.name!}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize="small" />}
                checkedIcon={<CheckBox fontSize="small" />}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => <TextField {...params} />}
          renderValue={(selectedModels: readonly Model[], getTagProps) =>
            selectedModels.map((option: Model, index: number) => (
              <Chip
                variant="outlined"
                label={option.name}
                {...getTagProps({ index })}
              />
            ))
          }
          sx={{ width: "100%" }}
        />
      </Box>
    );
  };

  useEffect(() => {
    fetchModels();
  }, []);

  if (modelsLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Box>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Run configuration</Typography>
          <Button
            className="large-button"
            color="primary"
            variant="contained"
            onClick={handleRun}
            disabled={running || selectedModels.length === 0}
          >
            <PlayArrow className="large-icon" />
          </Button>
        </Stack>
      </Box>
      {renderModelsSelect()}
      <Typography>Temperature</Typography>
      <SliderComponent
        minValue={0}
        maxValue={1}
        step={0.1}
        value={temperature}
        onChange={handleTemperatureChange}
        name="temperature"
      />
      {running && (
        <>
          <Typography variant="h6" mt={2}>
            Running models, please wait...
          </Typography>
          <CircularProgress />
        </>
      )}
      {!running && runResults.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Run results</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHeader columns={columns} />
              <TableBody>
                {runResults.map((run) => {
                  const modelName =
                    models.find((m) => m.id === run.modelId)?.name ?? "Unknown";
                  return (
                    <TableRow key={run.id}>
                      <TableCell>{modelName}</TableCell>
                      <TableCell>{run.temperature}</TableCell>
                      <TableCell>{run.actualResponse}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Stack>
  );
};
