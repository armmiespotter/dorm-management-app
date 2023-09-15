import { useEffect, useState } from "react";
import axios from "axios";
type DateSection = {
  id: number;
  month: string;
  year: string;
  isActive: boolean;
};
const DateSections = () => {
  const [dateSectionLists, setDateSectionLists] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(0);

  useEffect(() => {
    getDateSectionsLists();
  });

  const getDateSectionsLists = async () => {
    await axios
      .get(`http://localhost:3000/date-sections`)
      .then((res) => setDateSectionLists(res.data));
  };

  const createDateSection = async () => {
    const dateSectionObj = {
      month: month,
      year: year,
      isActive: true,
    };
    await axios
      .post("http://localhost:3000/date-sections", dateSectionObj)
      .then(() => {
        resetState();
      });
  };
  const deleteDateSection = async (event: any, dateSectionId: number) => {
    event?.preventDefault();
    await axios
      .delete(`http://localhost:3000/date-sections/${dateSectionId}`)
      .then(() => {
        resetState();
      });
  };
  const resetState = () => {
    setMonth("");
    setYear(0);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("click");

    createDateSection();
  };
  return (
    <>
      <table>
        <tr>
          <th>Id</th>
          <th>Month</th>
          <th>Year</th>
          <th>Control</th>
        </tr>
        {dateSectionLists.map((dateSection: DateSection, index) => {
          return (
            <tr key={index}>
              <th>{dateSection.id}</th>
              <th>{dateSection.month}</th>
              <th>{dateSection.year}</th>
              <th>
                <button
                  onClick={(event) => {
                    deleteDateSection(event, dateSection.id);
                  }}
                >
                  delete
                </button>
              </th>
            </tr>
          );
        })}
      </table>
      <hr />
      <p>{month}</p>
      <p>{year}</p>
      <hr />
      <div>
        <label htmlFor="">month</label>
        <input
          type="text"
          onChange={(event) => {
            setMonth(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="">year</label>
        <input
          type="number"
          onChange={(event) => {
            setYear(event.target.valueAsNumber);
          }}
        />
      </div>
      <button
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        add
      </button>
    </>
  );
};

export default DateSections;
