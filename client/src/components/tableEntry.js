import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function TabletEntry(props) {
  const classes = useStyles();
  const pencil = `\u270F`;
  const bin = `\u2A2F`;

  const handleDelete = e => {
    axios
      .delete(`http://localhost:8000/api/users/${props.user.id}`)
      .then(response => {
        alert(`This user has now been deleted`);
        window.location.reload();
      })
      .catch(error => {
        props.setError(error);
      });
  };

  return (
    <TableRow key={props.user.name}>
      <TableCell component="th" scope="row">
        {props.user.id}
      </TableCell>
      <TableCell align="right">{props.user.name}</TableCell>
      <TableCell align="right">{props.user.bio}</TableCell>
      <TableCell align="right">
        <button>{pencil}</button>
      </TableCell>
      <TableCell align="right">
        <button onClick={handleDelete}>{bin}</button>
      </TableCell>
    </TableRow>
  );
}
