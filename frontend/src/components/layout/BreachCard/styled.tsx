import styled from "styled-components";
import { Typography } from "@material-ui/core";

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DataLabel = styled(Typography)`
  && {
    margin-bottom: 8px;
  }
`;

export const BooleanIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  &.true {
    background-color: green;
  }

  &.false {
    background-color: red;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const StyledDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BooleanMockContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
