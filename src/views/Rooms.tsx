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

  const fetchRoomsList = async () => {
    await fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => {
        setroomsList(data);
      });
  };

  useEffect(() => {
    fetchRoomsList();
  });

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
  return (
    <>
      <p>number: {number}</p>
      <p>price: {price}</p>
      <table>
        <tr>
          <th>Id</th>
          <th>Number</th>
          <th>Price</th>
          <th>control</th>
        </tr>
        {roomsList.map((room: Room, index) => {
          return (
            <tr key={index}>
              <td>{room.id}</td>
              <td>{room.roomNumber}</td>
              <td>{room.price}</td>
              <td>
                <button>add invoice</button>
                <button
                  onClick={(e) => {
                    deleteRoom(e, room.id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      <hr />
      <div>
        <label>number</label>
        <input type="text" onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <label>price</label>
        <input
          type="number"
          onChange={(e) => {
            setPrice(e.target.valueAsNumber);
          }}
        />
      </div>

      <button onClick={(e) => handleSubmit(e)}>add</button>
    </>
  );
};

export default Rooms;
