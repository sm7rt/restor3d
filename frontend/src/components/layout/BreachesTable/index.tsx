import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TextField,
  Modal,
} from "@material-ui/core";
import moment from "moment";
import BreachCard from "../BreachCard";
import Breach from '../../../models/breach';
import {TableDataRow, TableHeaderCell, StyledBox} from './styled'

interface BreachesTableProps {
  breaches: Breach[];
}

const BreachesTable : React.FC<BreachesTableProps> = ({ breaches } ) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedBreach, setSelectedBreach] = useState<Breach | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column: string) => {
    setSortedColumn(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredData = breaches.filter((breach) => {
    return Object.values(breach).filter(
      (value) =>
        typeof value === "string" && value.match(new RegExp(searchTerm, "ig"))
    ).length;
  });

  const sortedData = sortedColumn
    ? filteredData.sort((a, b) => {
        const aValue = a[sortedColumn as keyof Breach];
        const bValue = b[sortedColumn as keyof Breach];
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      })
    : filteredData;

  if (sortDirection === "desc") {
    sortedData.reverse();
  }

  const renderRichText = (text: string) => {
    return { __html: text };
  };

  const handleModalOpen = (breach: Breach) => {
    setSelectedBreach(breach);
    setShowModal(true);
  };
  const handleModalClose = () => setShowModal(false);
  return (
    <div style={{ clear: "both", padding: "1rem" }}>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "1rem", marginRight: "1rem", float: "right" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("Name")}>
                Name&nbsp;
                {sortedColumn === "Name" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("Title")}>
                Title&nbsp;
                {sortedColumn === "Title" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("Domain")}>
                Domain&nbsp;
                {sortedColumn === "Domain" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("BreachDate")}>
                BreachDate&nbsp;
                {sortedColumn === "BreachDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("AddedDate")}>
                AddedDate&nbsp;
                {sortedColumn === "AddedDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("ModifiedDate")}>
                ModifiedDate&nbsp;
                {sortedColumn === "ModifiedDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort("PwnCount")}>
                PwnCount&nbsp;
                {sortedColumn === "PwnCount" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((breach, index) => (
              <TableDataRow key={index} onClick={() => handleModalOpen(breach)}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{breach.Name}</TableCell>
                <TableCell>{breach.Title}</TableCell>
                <TableCell>{breach.Domain}</TableCell>
                <TableCell>
                  {moment(breach.BreachDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(breach.AddedDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(breach.ModifiedDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{breach.PwnCount}</TableCell>
                <TableCell
                  dangerouslySetInnerHTML={renderRichText(breach.Description)}
                />
              </TableDataRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={showModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {selectedBreach !== null ? (
          <StyledBox>
            <BreachCard breach={selectedBreach} />
          </StyledBox>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}

export default BreachesTable;
