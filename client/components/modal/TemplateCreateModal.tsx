import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ToastSuccess } from "../../lib/function/toast";
import Template from "../../lib/api/template";
import {
  blueColor,
  grayTextColor,
  mainColor,
  redColor,
} from "../../styles/color";
import { useRecoilState } from "recoil";
import { MailInputAtom } from "../../lib/module/atom/mail";

type Props = {
  openModal: boolean;
  setModalOpen: (openModal: boolean) => void;
};

const TemplateCreateModal : FC<Props> = ({ openModal, setModalOpen }) => {
  const queryClient = useQueryClient();
  const [titleValue, setTitleValue] = useState<string | "">("");
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);

  const addTemplateHandle = () => {
    ToastSuccess("템플릿이 추가되었습니다.");

    createTemplate();
    modalCloseHandle();
    setTitleValue("");
  };

  const modalCloseHandle = () => {
    setModalOpen(false);
    setTitleValue("");
  };

  const { mutate: createTemplate } = useMutation(
    "createTemplate",
    () =>
      Template.createTemplate({
        title: titleValue,
        desk_text: mailValue.content,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("templateData");
      },
    }
  );

  return (
    <ModalContainer openModal={openModal}>
      <ModalBoxWrapper>
        <p>
          사용하실 템플릿의 제목을 입력하면 <br />
          템플릿을 만들 수 있습니다.
        </p>
        <div className="title_box">
          <span>제목</span>
          <input
            type="text"
            placeholder="템플릿 제목을 입력해주세요."
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </div>
        <div className="control_box">
          <button onClick={modalCloseHandle}>취소</button>
          <button onClick={addTemplateHandle}>확인</button>
        </div>
      </ModalBoxWrapper>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{ openModal: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.49);
  display: ${({ openModal }) => (openModal ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ModalBoxWrapper = styled.div`
  padding: 30px;
  width: 35%;
  height: 235px;
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > p {
    text-align: center;
    color: ${blueColor};
  }

  .title_box {
    width: 80%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    color: ${blueColor};

    & input {
      border: none;
      width: 70%;

      ::placeholder {
        color: ${grayTextColor};
      }
    }
  }

  .control_box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    & button {
      border: none;
      background: none;
      font-size: 16px;
    }

    & button:nth-child(1) {
      color: ${redColor};
    }

    & button:nth-child(2) {
      color: ${mainColor};
    }
  }
`;

export default TemplateCreateModal;