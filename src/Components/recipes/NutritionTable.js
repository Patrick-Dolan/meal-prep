import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const NutritionTable = (props) => {
  const { nutrition } = props;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Nutrition Facts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nutrition.map((row) => (
            <TableRow
              key={row?.name}
            >
              <TableCell>{row?.name}</TableCell>
              <TableCell >{row?.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default NutritionTable;