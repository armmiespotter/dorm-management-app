import { Card, Form, Input, Table, Col, Row, Button } from "antd";
import { useEffect, useState } from "react";

type Room = {
  id: number;
  roomNumber: string;
  price: number;
  isActive: boolean;
};

const Rooms = () => {
  const [roomsList, setroomsList] = useState([]);
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchRoomsList();
  });

  const fetchRoomsList = async () => {
    await fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => {
        setroomsList(data);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      roomNumber: number,
      price: price,
      isActive: true,
    };

    fetch("http://localhost:3000/rooms", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        clearState();
      });
  };
  const deleteRoom = (e: any, roomId: number) => {
    e.preventDefault();
    fetch(`http://localhost:3000/rooms/${roomId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
    }).then(() => {
      clearState();
    });
  };
  const clearState = () => {
    setNumber("");
    setPrice(0);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];
  return (
    <Row justify="center" gutter={16}>
      <Col span={12}>
        <Card title="Lists">
          <Table dataSource={roomsList} columns={columns} />;
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Form">
          <Form.Item label="Number" required tooltip="This is a required field">
            <Input
              type="text"
              placeholder="221B"
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price" required tooltip="This is a required field">
            <Input
              type="number"
              placeholder="500"
              onChange={(e) => {
                setPrice(e.target.valueAsNumber);
              }}
            />
          </Form.Item>
          <Button type="primary" onClick={(e) => handleSubmit(e)}>
            Add
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Rooms;
