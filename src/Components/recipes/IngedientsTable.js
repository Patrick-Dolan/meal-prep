import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const IngredientsTable = (props) => {
  const { ingredients } = props;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Ingredients</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients?.map((row) => (
            <TableRow
              key={row?.name}
            >
              <TableCell width={"35%"}>{row?.amount + " " + row?.measurement}</TableCell>
              <TableCell >{row?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default IngredientsTable;