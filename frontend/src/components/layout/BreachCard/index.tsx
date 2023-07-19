import React from "react";
import { Card, CardContent, Typography, Chip } from "@material-ui/core";
import moment from "moment";
import Breach from "../../../models/breach";
import {StyledDateContainer, StyledDiv, BooleanIcon, BooleanMockContainer, IconContainer, DataLabel} from './styled';

const booleanMock: { label: string; value: keyof Breach }[] = [
  { label: "Is Verified", value: "IsVerified" },
  { label: "Is Fabricated", value: "IsFabricated" },
  { label: "Is Sensitive", value: "IsSensitive" },
  { label: "Is Retired", value: "IsRetired" },
  { label: "Is Spam List", value: "IsSpamList" },
  { label: "Is Malware", value: "IsMalware" },
];

const dateMock: { label: string; value: keyof Breach }[] = [
  { label: "Breach Date:", value: "BreachDate" },
  { label: "Added Date:", value: "AddedDate" },
  { label: "Modified Date:", value: "ModifiedDate" },
];


interface BreachCardProps {
  breach: Breach;
}

const BreachCard: React.FC<BreachCardProps> = ({ breach }) => {
  const renderDataClasses = () => {
    return breach.DataClasses.map((dataClass, index) => (
      <Chip key={index} label={dataClass} style={{ marginRight: "10px" }} />
    ));
  };
  const renderRichText = (text: string) => {
    return { __html: text };
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{breach.Title}</Typography>
        <Typography variant="h5" color="textSecondary">
          {breach.Name}
        </Typography>
        <StyledDiv>
          <Typography variant="subtitle2">Domain:&nbsp;</Typography>
          <Typography>{breach.Domain}</Typography>
        </StyledDiv>
        <StyledDateContainer>
          {dateMock.map(({ label, value }, index) => (
            <StyledDiv key={index}>
              <Typography variant="subtitle2">{label}</Typography>
              <Typography style={{ marginLeft: "10px" }}>
                {moment(breach[value] as string).format("YYYY-MM-DD")}
              </Typography>
            </StyledDiv>
          ))}
        </StyledDateContainer>
        <StyledDiv style={{ justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Pwn Count:</Typography>
          <Typography>{breach.PwnCount}</Typography>
          <Typography variant="subtitle2">LogoPath:</Typography>
          <Typography>{breach.LogoPath}</Typography>
        </StyledDiv>
        <div>
          <Typography variant="subtitle2">Description:</Typography>
          <Typography
            dangerouslySetInnerHTML={renderRichText(breach.Description)}
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography variant="subtitle2">Data Classes:</Typography>
          <div style={{ display: "flex" }}>{renderDataClasses()}</div>
        </div>
        <BooleanMockContainer>
          {booleanMock.map(({ label, value }) => (
            <IconContainer key={value}>
              <DataLabel variant="subtitle2">{label}</DataLabel>
              <BooleanIcon className={breach[value] ? "true" : "false"} />
            </IconContainer>
          ))}
        </BooleanMockContainer>
      </CardContent>
    </Card>
  );
};

export default BreachCard;
