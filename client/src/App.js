import SecretNavbar from "./components/secretNavbar/secretNavbar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import SecretForm from "./components/secretForm/secretForm";
import SecretConfig from "./components/secretConfig/secretConfig";

import styled from "styled-components";
import { useState } from "react";

const SecretFormContainer = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const SecretFormInner = styled.div`
  margin-top: 9.3rem;
`;

const App = () => {
  const location = useLocation();

  const [limit, setLimit] = useState(1);
  return (
    <>
      <SecretNavbar></SecretNavbar>
      <Routes>
        <Route
          path="/one-time-secret"
          element={
            <SecretFormContainer>
              <SecretFormInner>
                <SecretForm limit={limit} hasId="false" />
              </SecretFormInner>
            </SecretFormContainer>
          }
        />
        <Route
          path="/one-time-secret/:id"
          element={
            <SecretFormContainer>
              <SecretFormInner>
                <SecretForm limit={limit} hasId="true" />
              </SecretFormInner>
            </SecretFormContainer>
          }
        />
        <Route
          path="/one-time-secret/config"
          element={
            <SecretFormContainer>
              <SecretFormInner>
                <SecretConfig
                  limit={limit}
                  handleLimit={(e) => setLimit(e.target.value)}
                />
              </SecretFormInner>
            </SecretFormContainer>
          }
        />
      </Routes>
      {location.pathname === "/" ? <Navigate to="/one-time-secret" /> : null}
    </>
  );
};

export default App;
