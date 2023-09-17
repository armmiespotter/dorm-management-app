import { Modal } from "antd";
import { RoomAction } from "../../utils/enum";
import FormRoom from "../forms/FormRoom";
import { Room } from "../../utils/type";
import { useEffect, useState } from "react";

type Props = {
  modalAction: string;
  modalData?: Room;
  modalActive: boolean;
  modalEmitSubmit: () => void;
  modalEmitCancel: () => void;
};

const RoomModal = (props: Props) => {
  const [isModalAction, setModalActive] = useState(false);
  return (() => {
    switch (props.modalAction) {
      case RoomAction.Create:
        return (
          <Modal
            title="Create Room"
            open={isModalAction}
            onOk={props.modalEmitSubmit}
            onCancel={props.modalEmitCancel}
            footer={null}
          >
            <FormRoom
              action={props.modalAction}
              emitClose={() => {
                setModalActive(false);
              }}
            ></FormRoom>
          </Modal>
        );
      case RoomAction.Update:
        return (
          <Modal
            title="Update Room"
            open={isModalAction}
            onOk={props.modalEmitSubmit}
            onCancel={props.modalEmitCancel}
            footer={null}
          >
            <FormRoom
              action={props.modalAction}
              data={props.modalData}
              emitClose={() => {
                setModalActive(false);
              }}
            ></FormRoom>
          </Modal>
        );
      case RoomAction.Delete:
        return (
          <Modal
            title="Delete Room"
            open={isModalAction}
            onOk={props.modalEmitSubmit}
            onCancel={props.modalEmitCancel}
            footer={null}
          ></Modal>
        );
      default:
        return null;
    }
  })();
};

export default RoomModal;
