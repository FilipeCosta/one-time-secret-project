import { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/constants";

const SecretClipBoardText = styled.div`
  font-size: 1.6rem;
  margin-top: 3.2rem;
  margin-bottom: 1.6rem;
`;

const SecretClipBoardWrapper = styled.div``;

const SecretClipBoardBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 49rem;
  background-color: white;
  border-radius: 0.4rem;
  padding: 0.8rem;
  height: 4.1rem;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
  border: ${(props) =>
    props.focus ? `1px solid ${COLOR.LEMON_GREEN}` : "1px solid transparent"};
`;

const SecretClipBoardBoxSecretUrl = styled.div`
  font-size: 1.4rem;
  color: black;
  transition: color 0.2s ease-in-out;
  color: ${(props) => (props.focus ? `${COLOR.LEMON_GREEN}` : "black")};
`;

const SecretClipBoardInfo = styled.div`
  color: ${COLOR.LEMON_GREEN};
  font-size: 1rem;
  width: 49rem;
  text-align: right;
`;

const SecretClipBoardBoxImage = styled.img`
  cursor: pointer;
`;

const SecretClipBoard = (props) => {
  const { url, limit } = props;
  const [showFocus, setShowFocus] = useState(false);

  const copyToClipBoard = async () => {
    const copyText = document.getElementById("clipboard");
    setShowFocus(true);
    const result = await navigator.clipboard.writeText(copyText.textContent);
    setTimeout(() => {
      setShowFocus(false);
    }, 500);
    return result;
  };

  return (
    <SecretClipBoardWrapper>
      <SecretClipBoardText>
        This is your secret link, but be warned, the link can only be viewed{" "}
        {limit}
        {limit === 1 ? " time " : " times "}
        afterwards it self-destructs
      </SecretClipBoardText>
      <SecretClipBoardBox focus={showFocus}>
        <SecretClipBoardBoxSecretUrl focus={showFocus} id="clipboard">
          {url}
        </SecretClipBoardBoxSecretUrl>
        <SecretClipBoardBoxImage
          alt="copy to clipboard"
          title="copy to clipboard"
          src="clipboard.png"
          onClick={copyToClipBoard}
        ></SecretClipBoardBoxImage>
      </SecretClipBoardBox>
      {showFocus && <SecretClipBoardInfo>Link Copied!</SecretClipBoardInfo>}
    </SecretClipBoardWrapper>
  );
};

export default SecretClipBoard;
