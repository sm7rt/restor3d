import { TableCell, TableRow, Box } from "@material-ui/core";
import styled from "styled-components";

export const TableHeaderCell = styled(TableCell)`
  && {
    color: white !important;
    background-color: black;
  }
`;

export const TableDataRow = styled(TableRow)`
  && {
    &:nth-child(odd) {
      background-color: #ddd;
    }
  }
`;

export const StyledBox = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
  }
`;
