import { Input, Form, Button } from "antd";
import type { Room } from "../../utils/type";

type Props = {
  formAction: string;
  formData: Room;
};

const FormRoom = (props: Props) => {
  return (
    <Form layout="vertical">
      <Form.Item label="test">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="test">
        <Input placeholder="input placeholder" />
      </Form.Item>
    </Form>
  );
};

export default FormRoom;
