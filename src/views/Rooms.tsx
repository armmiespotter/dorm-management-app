import { Card, Form, Input, Table, Col, Row, Button, Space } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Room = {
  id: number;
  roomNumber: string;
  price: number;
  isActive: boolean;
};

const Rooms = () => {
  const [roomsList, setroomsList] = useState([]);
  const [id, setId] = useState(0);
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [action, setAction] = useState("create");

  useEffect(() => {
    fetchRoomsList();
  });

  const fetchRoomsList = async () => {
    await axios
      .get("http://localhost:3000/rooms")
      .then(({ data: roomList }) => {
        setroomsList(roomList);
      });
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/rooms", {
        roomNumber: number,
        price: price,
        isActive: true,
      })
      .then(() => {
        resetState();
      });
  };

  const handleUpdate = async (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    if (id !== 0) {
      await axios
        .patch(`http://localhost:3000/rooms/${id}`, {
          roomNumber: number,
          price: price,
          isActive: true,
        })
        .then(() => {
          resetState();
        });
    }
  };

  const changeFormToUpdate = async (
    event: React.SyntheticEvent<HTMLElement>,
    roomId: number
  ) => {
    event.preventDefault();
    await axios
      .get(`http://localhost:3000/rooms/${roomId}`)
      .then(({ data: room }) => {
        resetState();
        setId(room.id);
        setNumber(room.roomNumber);
        setPrice(room.price);
        setAction("update");
      });
  };

  const deleteRoom = async (
    event: React.SyntheticEvent<HTMLElement>,
    roomId: number
  ) => {
    event.preventDefault();
    await axios.delete(`http://localhost:3000/rooms/${roomId}`).then(() => {
      resetState();
    });
  };

  const resetState = () => {
    setId(0);
    setNumber("");
    setPrice(0);
  };

  return (
    <Row justify="center" gutter={16}>
      <Col span={12}>
        <Card title="Lists">
          <Table dataSource={roomsList}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Number" dataIndex="roomNumber" key="roomNumber" />
            <Column title="Price" dataIndex="price" key="price" />
            <Column
              title="Action"
              key="action"
              render={(room: Room) => (
                <Space size="middle">
                  <Button
                    onClick={(event) => {
                      changeFormToUpdate(event, room.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(event) => {
                      deleteRoom(event, room.id);
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>
      </Col>
      <Col span={12}>
        {action === "create" ? (
          <Card title="Form Create">
            <Form layout="vertical">
              <Form.Item label="Number">
                <Input
                  type="text"
                  placeholder="221B"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Input
                  type="number"
                  placeholder="500"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.valueAsNumber);
                  }}
                />
              </Form.Item>
              <Button type="primary" onClick={(event) => handleSubmit(event)}>
                Add
              </Button>
            </Form>
          </Card>
        ) : (
          <Card title="Form Update">
            <Form layout="vertical">
              <Form.Item label="Number">
                <Input
                  type="text"
                  placeholder="221B"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Input
                  type="number"
                  placeholder="500"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.valueAsNumber);
                  }}
                />
              </Form.Item>
              <Space size="middle">
                <Button type="primary" onClick={(event) => handleUpdate(event)}>
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setAction("create");
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Form>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default Rooms;
