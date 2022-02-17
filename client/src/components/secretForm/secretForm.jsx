import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR, STATUS } from "../../utils/constants";
import SecretButton from "../secretButton/secretButton";
import http from "../../services/httpService";
import SecretClipBoard from "../secretClipboard/secretClipboard";
import SecretHiddenArea from "../secretHiddenArea/secretHiddenArea";
import SecretLoading from "../secretLoading/secretLoading";

const SecretFormBody = styled.form``;

const SecretTitle = styled.header`
  font-size: 2.4rem;
  line-height: 3.6rem;
  margin-bottom: 1.6rem;
  color: ${COLOR.BLACK};
  font-weight: 600;
`;

const SecretTextArea = styled.textarea`
  margin-bottom: 2.2rem;
  border-color: transparent;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  height: 17rem;
  width: 100%;
  padding: 1.4rem;
`;

const ErrorFetching = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorFetchingText = styled.div`
  color: ${COLOR.BLACK};
  font-size: 3.6rem;
  text-align: center;
`;

const SubErrorFetchingText = styled.div`
  color: ${COLOR.BLACK};
  font-size: 2.8rem;
  text-align: center;
`;

const SecretLoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div {
    border-color: ${COLOR.BLACK};
    border-top-color: transparent;
    width: 10rem;
    height: 10rem;
  }
`;

const SecretPasswordWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: center;
`;

const SecretPassword = styled.input`
  width: 20rem;
  height: 2.4rem;
  font-size: 1.8rem;
`;

const SecretPasswordTitle = styled.div`
  font-size: 1.6rem;
  color: ${COLOR.BLACK};
  margin-right: 1.2rem;
`;

const SecretForm = (props) => {
  const { limit } = props;
  const { id } = useParams();

  const [shareState, setShareState] = useState(STATUS.DEFAULT);
  const [errorFetchingMsg, setErrorFetchingMsg] = useState(false);
  const [loadingFetching, setLoadingFetching] = useState(false);
  const [secret, setSecret] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [url, setUrl] = useState(null);

  const TITLE = {
    default: "Sharing secrets has never been easier",
    error: "Something went wrong please try again",
    success: "Your secret has been shared successfully",
    revealed: "Here you go",
    unrevealed: "Hush! A secret has been shared with you",
  };

  const fetchSecret = async (password) => {
    try {
      setErrorFetchingMsg(false);
      setLoadingFetching(true);
      const result = await http.get(`/${id}/${password}`);
      setSecret(result.data.description);
      setRevealed(true);
    } catch (err) {
      console.log(err.response);
      setErrorFetchingMsg({
        status: err.response.status,
        message: err.response.data.message,
      });
    } finally {
      setLoadingFetching(false);
    }
  };

  const createSharedSecret = async (e) => {
    e.preventDefault();

    setShareState(STATUS.LOADING);
    const description = e.target.secret.value;
    const password = e.target.password.value;

    try {
      const result = await http.post("/", {
        description,
        limit: +limit,
        password,
      });
      setShareState(STATUS.SUCCESS);
      setUrl(result.data);
    } catch (err) {
      setShareState(STATUS.ERROR);
    }
  };

  const getTitle = () => {
    if (id) {
      return revealed ? TITLE.revealed : TITLE.unrevealed;
    }

    return shareState === STATUS.DEFAULT || shareState === STATUS.LOADING
      ? TITLE[STATUS.DEFAULT]
      : TITLE[shareState];
  };

  const handleReveal = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    fetchSecret(password);
  };

  if (loadingFetching) {
    return (
      <SecretLoadingWrapper>
        <SecretLoading />
      </SecretLoadingWrapper>
    );
  }

  if (errorFetchingMsg && errorFetchingMsg.status !== 401) {
    return (
      <SecretFormBody>
        <ErrorFetching>
          <ErrorFetchingText>4-oh no-4</ErrorFetchingText>
          <SubErrorFetchingText>
            {errorFetchingMsg.message}
          </SubErrorFetchingText>
        </ErrorFetching>
      </SecretFormBody>
    );
  }

  const isReadOnly =
    (shareState !== STATUS.DEFAULT && shareState !== STATUS.ERROR) || !!id;

  return (
    <SecretFormBody onSubmit={id ? handleReveal : createSharedSecret}>
      <SecretTitle>{getTitle()}</SecretTitle>
      {id && !revealed ? (
        <SecretHiddenArea error={!!errorFetchingMsg.message} />
      ) : (
        <>
          <SecretTextArea
            defaultValue={secret ? secret : ""}
            name="secret"
            readOnly={isReadOnly}
            placeholder="Enter a secret..."
          ></SecretTextArea>
          {!id ? (
            <SecretPasswordWrapper>
              <SecretPasswordTitle>Protect your secret: </SecretPasswordTitle>
              <SecretPassword
                readOnly={isReadOnly}
                type="password"
                name="password"
              ></SecretPassword>
            </SecretPasswordWrapper>
          ) : null}
        </>
      )}
      {!id && <SecretButton state={shareState} />}
      {url && <SecretClipBoard limit={limit} url={url} />}
    </SecretFormBody>
  );
};

export default SecretForm;
