import styled from "styled-components";
import SecretButton from "../secretButton/secretButton";
import { STATUS, COLOR } from "../../utils/constants";

const SecretArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 17rem;
  padding: 1.4rem;
  background-color: white;
  font-size: 1.6rem;
  border-radius: 0.4rem;
  margin-bottom: 1.6rem;
`;

const SecretWarningArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
`;

const SecretAreaText = styled.div`
  color: red;
  font-size: 1.6rem;
`;

const SecretAreaImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1.2rem;
`;

const SecretPasswordWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 2rem 0;
  align-items: center;
`;

const SecretPassword = styled.input`
  width: 20rem;
  height: 2.4rem;
  font-size: 1.8rem;
  padding: 0.6rem;
  border-radius: 0.4rem;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid black")};
`;

const SecretPasswordTitle = styled.div`
  font-size: 1.6rem;
  color: ${COLOR.BLACK};
  margin-right: 1.2rem;
`;

const SecretPasswordError = styled.div`
  position: absolute;
  bottom: -2rem;
  right: 1.6rem;
  color: red;
  font-size: 1.4rem;
  margin-top: 0.4rem;
`;

const SecretHiddenArea = (props) => {
  const { error } = props;
  return (
    <SecretArea>
      <SecretButton state={STATUS.DEFAULT} text="Reveal now" />
      <SecretPasswordWrapper>
        <SecretPasswordTitle>Enter password: </SecretPasswordTitle>
        <SecretPassword
          error={error}
          type="password"
          name="password"
        ></SecretPassword>
        {error && (
          <SecretPasswordError>The passwords doesn't match</SecretPasswordError>
        )}
      </SecretPasswordWrapper>
      <SecretWarningArea>
        <SecretAreaImg src="/warning.png" />
        <SecretAreaText>
          This is a one-time secret and will be deleted from the server after
          you revealed it
        </SecretAreaText>
      </SecretWarningArea>
    </SecretArea>
  );
};

export default SecretHiddenArea;
