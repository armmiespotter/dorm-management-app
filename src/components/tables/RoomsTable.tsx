import { Button, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Room } from "../../utils/type";
import { RoomAction } from "../../utils/enum";
import RoomModal from "../modals/RoomsModal";

const RoomsList = () => {
  useEffect(() => {
    fetchDataSource();
  }, []);

  const [dataSource, setDataSource] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [currentItem, setCurrentItem] = useState<Room>();
  const fetchDataSource = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_PATH}/rooms`)
      .then(({ data: dataSource }) => {
        setDataSource(dataSource);
      });
  };
  const modalEmitSubmit = async () => {
    console.log("emit submit");
    setModalActive(false);
  };
  const modalEmitCancel = async () => {
    console.log("emit close");
    setModalActive(false);
  };
  const handleEditItem = (room: Room) => {
    setModalActive(true);
    setCurrentItem(room);
  };

  return (
    <>
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
                  handleEditItem(room);
                }}
              >
                Edit
              </Button>
            </Space>
          )}
        />
      </Table>
      <RoomModal
        modalAction={RoomAction.Update}
        modalData={currentItem}
        modalActive={modalActive}
        modalEmitSubmit={modalEmitSubmit}
        modalEmitCancel={modalEmitCancel}
      />
    </>
  );
};

export default RoomsList;
