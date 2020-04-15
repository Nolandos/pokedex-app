import React from "react";
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Alert variant="filled" severity="error">
        Not found!
      </Alert>
    </Wrapper>
  );
};

export default NotFound;
