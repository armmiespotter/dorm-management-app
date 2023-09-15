import { Card, Table, Col, Row, Button, Space } from "antd";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainModal from "../components/modals/ModalContainer";
import FormRoom from "../components/forms/FormRoom";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { Room } from "../utils/type";

const Rooms = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataColumn, setDataColumn] = useState<ColumnType<ColumnsType>[]>([]);
  const [isModalActive, setIsModalAvtice] = useState(false);
  const [modalFooter, setModalFooter] = useState<ReactNode>([]);
  const [modalTitle, setModalTitle] = useState("TEST001");
  const [formAction, setFormAction] = useState("");
  const [formData, setFormData] = useState<Room>({
    id: 0,
    roomNumber: "",
    price: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchDataSource();
  });

  const fetchDataSource = async () => {
    await axios
      .get("http://localhost:3000/rooms")
      .then(({ data: dataSource }) => {
        setDataSource(dataSource);
      });
    fetchDataColumn();
  };
  const fetchDataColumn = () => {
    const dataColumn: ColumnType<ColumnsType>[] = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Room Number",
        dataIndex: "roomNumber",
        key: "roomNumber",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Action",
        key: "action",
        render: (room: Room) => (
          <Space size="middle">
            <Link to={`/rooms/${room.id}`}>
              <Button size="small">View</Button>
            </Link>
            <Button
              size="small"
              onClick={() => {
                handleEditButton(room.id);
              }}
            >
              Edit
            </Button>
            <Button size="small">Add Invoice</Button>
            <Button size="small" danger>
              Delete
            </Button>
          </Space>
        ),
      },
    ];
    setDataColumn(dataColumn);
  };

  const handleSubmit = () => {};
  const handleCancel = () => {
    setIsModalAvtice(false);
  };
  const handleAddButton = () => {
    setFormAction("create");
    setModalTitle("CREATE");
    setModalFooter([<Button>ADD</Button>]);
    setIsModalAvtice(true);
    console.log(formAction);
  };
  const handleEditButton = (roomId: number) => {
    setFormAction("update");
    setModalTitle("UPDATE");
    setModalFooter([<Button>Update</Button>]);
    setIsModalAvtice(true);
    console.log(formAction, roomId);
  };
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Card title="Lists">
            <Space style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={handleAddButton}>
                Add
              </Button>
            </Space>
            <Table dataSource={dataSource} columns={dataColumn} />
          </Card>
        </Col>
      </Row>
      <MainModal
        title={modalTitle}
        isModalOpen={isModalActive}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        modalFooter={modalFooter}
      >
        <FormRoom formAction={formAction} formData={formData}></FormRoom>
      </MainModal>
    </>
  );
};

export default Rooms;
