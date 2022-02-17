import styled from "styled-components";
import { COLOR, STATUS } from "../../utils/constants";
import SecretLoading from "../secretLoading/secretLoading";

const Button = styled.button`
  width: 22.5rem;
  height: 4.1rem;
  font-size: 1.6rem;
  color: white;
  border-color: transparent;
  border-radius: 0.4rem;
  cursor: pointer;
`;

const SecretLoadingWrapper = styled.div`
  margin-left: 8px;
`;

const DefaultButton = styled(Button)`
  background-color: ${COLOR.ROYAL_BLUE};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultButtonText = styled.div`
  position: relative;
  top: -2px;
  font-size: 1.6rem;
`;

const SuccessButton = styled(Button)`
  display: flex;
  background-color: ${COLOR.GREEN};
  align-items: center;
  pointer-events: none;

  img {
    margin-left: 1.4rem;
  }

  div {
    width: 70%;
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    position: relative;
    top: -1px;
  }
`;

const ErrorButton = styled(Button)`
  background-color: red;
`;

const SecretButton = (props) => {
  const { state, text, type = "submit" } = props;

  const renderButton = (state = STATUS.DEFAULT) => {
    const states = {
      default: <DefaultButton type={type}>{text || "Share now"}</DefaultButton>,
      loading: (
        <DefaultButton>
          <DefaultButtonText>Share now</DefaultButtonText>
          <SecretLoadingWrapper>
            <SecretLoading />
          </SecretLoadingWrapper>
        </DefaultButton>
      ),
      success: (
        <SuccessButton>
          <img src="success.png"></img>
          <div>Success!</div>
        </SuccessButton>
      ),
      error: (
        <ErrorButton type={type}>An error ocurred, Try Again!</ErrorButton>
      ),
    };

    return states[state];
  };

  return renderButton(state);
};

export default SecretButton;
