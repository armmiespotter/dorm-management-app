import { Modal } from "antd";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  isModalOpen: boolean;
  modalFooter: ReactNode;
  handleSubmit: () => void;
  handleCancel: () => void;
};

const MainModal = (props: Props) => {
  return (
    <Modal
      title={props.title}
      open={props.isModalOpen}
      onOk={props.handleSubmit}
      onCancel={props.handleCancel}
      footer={props.modalFooter}
    >
      {props.children}
    </Modal>
  );
};

export default MainModal;
