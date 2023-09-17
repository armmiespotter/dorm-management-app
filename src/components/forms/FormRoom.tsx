import { Input, Form, Button, Space } from "antd";
import type { Room } from "../../utils/type";
import { useEffect, useState } from "react";
import { RoomAction } from "../../utils/enum";

type Props = {
  formAction: string;
  formData?: Room;
  emitClose: () => void;
};

const FormRoom = (props: Props) => {
  const [currentItem, setCurrentItem] = useState<Room>();

  useEffect(() => {
    props.formAction === RoomAction.Create
      ? setCurrentItem({
          id: 0,
          roomNumber: "",
          price: 0,
          isActive: true,
        })
      : setCurrentItem(props.formData);
  }, [props.formAction, props.formData]);

  const handleInput = (event: any) => {
    let tempItem: Room | any;
    tempItem[event.target.name] = event.target.value;
    setCurrentItem(tempItem);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Room Number">
        <Input
          placeholder="221B"
          value={currentItem?.roomNumber}
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item label="Price">
        <Input
          placeholder="2,500$"
          value={currentItem?.price}
          onChange={handleInput}
        />
      </Form.Item>
      {props.formAction == RoomAction.Create ? (
        <Space>
          <Button type="primary">Create</Button>
          <Button onClick={props.emitClose}>Close</Button>
        </Space>
      ) : (
        <Space>
          <Button type="primary">Update</Button>
          <Button onClick={props.emitClose}>Close</Button>
        </Space>
      )}
    </Form>
  );
};

export default FormRoom;
