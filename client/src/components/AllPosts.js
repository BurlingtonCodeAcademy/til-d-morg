import { useEffect, useState } from "react";

function AllPosts(props) {
  const [things, setThings] = useState([]);
 

  useEffect(() => {
    if (things.length === 0) {
      fetch("/showall")
        .then((res) => res.json())
        .then((thingsList) => {
          setThings(thingsList);
        });
    }
  });

  return (
    <>
      <table width="80%" border="2px">
        <thead>
          <tr>
            <th>Title</th>
            <th>Topic</th>
            <th>Attachments</th>
            <th>Author</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        {things.map((data, index) => {
          return (
            <tbody key = {index}>
              <tr>
                <td>{data.title}</td>
                <td>{data.topic}</td>
                <td>{data.attachment}</td>
                <td>{data.author}</td>
                <td></td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default AllPosts;
