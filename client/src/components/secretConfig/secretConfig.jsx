import styled from "styled-components";

const SecretConfigForm = styled.form`
  display: flex;
`;

const SecretConfigInputTitle = styled.div`
  font-size: 1.6rem;
`;

const SecretConfigInputValue = styled.input`
  font-size: 1.6rem;
  padding: 0 0.4rem;
  width: 10rem;
  margin-left: 0.8rem;
`;

const SecretConfig = (props) => {
  const { limit, handleLimit } = props;

  return (
    <SecretConfigForm>
      <SecretConfigInputTitle>Limit: </SecretConfigInputTitle>
      <SecretConfigInputValue
        type="number"
        min="1"
        max="10"
        defaultValue={limit}
        onChange={handleLimit}
      ></SecretConfigInputValue>
    </SecretConfigForm>
  );
};

export default SecretConfig;
