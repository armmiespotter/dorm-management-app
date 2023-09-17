import { Card, Col, Row, Button, Space, Modal, Table } from "antd";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { RoomAction } from "../utils/enum";
import { Room } from "../utils/type";
import FormRoom from "../components/forms/FormRoom";
const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [currentItem, setCurrentItem] = useState<Room>();

  const fetchDataSource = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_PATH}/rooms`)
      .then(({ data: dataSource }) => {
        setDataSource(dataSource);
      });
  };

  useEffect(() => {
    fetchDataSource();
  }, []);

  const openCreateModal = async () => {
    setModalTitle("Create");
    setModalAction(RoomAction.Create);
    setIsModalOpen(true);
  };

  const editItem = (room: Room) => {
    setModalTitle("Update");
    setModalAction(RoomAction.Update);
    setIsModalOpen(true);
    setCurrentItem(room);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Card title="Lists">
            <Space style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={openCreateModal}>
                Create Room
              </Button>
            </Space>
            <Table dataSource={dataSource}>
              <Table.Column key="id" title="Id" dataIndex="id" />
              <Table.Column
                key="roomNumber"
                title="Room Number"
                dataIndex="roomNumber"
              />
              <Table.Column key="price" title="Price" dataIndex="price" />
              <Table.Column
                title="Action"
                key="action"
                render={(room: Room) => (
                  <Space>
                    <Button
                      onClick={() => {
                        editItem(room);
                      }}
                    >
                      <FaPencil />
                    </Button>
                    <Button>
                      <FaRegTrashCan />
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <FormRoom
          formAction={modalAction}
          formData={currentItem}
          emitClose={handleClose}
        ></FormRoom>
      </Modal>
    </>
  );
};

export default Rooms;
