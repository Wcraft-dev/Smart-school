import React, { useState } from "react";
import { getCookie, getLocalStorage } from "../helpers/clientSave";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSend from "./buttons/Button.send";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Collapse,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 120,
  },
}));

export default function TeacherAddClass(props) {
  const classes = useStyles();
  const [inWait, setInWait] = useState(false);
  const [codeClass, setCodeClass] = useState(false);
  const [dataForm, setDataForm] = useState({
    title: "",
    repeat: 1,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setInWait(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/class`,
        {
          author: JSON.parse(getLocalStorage("user")).name,
          text: dataForm.title,
          repeat: dataForm.repeat,
        },
        {
          headers: {
            "x-access-token": getCookie(),
          },
        }
      );
      setInWait(false);
      toast.success(data.message);

      setCodeClass(!codeClass);
      setDataForm({
        text: "",
        repeat: 1,
      });
    } catch (err) {
      console.log(err);
      setInWait(false);
    }
  };

  const handlerChange = (text) => (e) => {
    setDataForm({ ...dataForm, [text]: e.target.value });
  };

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate={false} autoComplete="off">
        <Collapse in={!codeClass} mountOnEnter unmountOnExit>
          <CardContent>
            <Typography component="h4" variant="h4">
              <Box fontWeight="fontWeightBold" textAlign="center">
                Create new class
              </Box>
            </Typography>
            <TextField
              variant="outlined"
              type="text"
              value={dataForm.text}
              fullWidth
              id="Title"
              name="Title"
              margin="normal"
              label="Title"
              onChange={handlerChange("title")}
              required
            />
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="Repeat">Repeat</InputLabel>
              <Select
                labelId="Repeat"
                id="Repeat"
                value={dataForm.repeat}
                onChange={handlerChange("repeat")}
                label="Repeat"
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Weekly</MenuItem>
                <MenuItem value={2}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <ButtonSend textDefault="Save" inWait={inWait} />
          </CardActions>
        </Collapse>
        <Collapse in={codeClass} mountOnEnter unmountOnExit>
          <CardContent>
            <Typography component="h4" variant="h4">
              <Box fontWeight="fontWeightBold" textAlign="center">
                Your class code
              </Box>
            </Typography>
            <TextField
              variant="outlined"
              type="text"
              value={"HHDDO-1192"}
              disabled
              fullWidth
              margin="normal"
              label="Code"
            />
          </CardContent>
        </Collapse>
      </form>
    </Card>
  );
}
