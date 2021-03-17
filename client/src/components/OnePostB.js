//this is a secondary single post page for _id querying

//tried both on one page and load in conditionally, but react would not let me have two use effect hooks 

import { useEffect, useState } from "react";
import Modal from "./Modal";

let entry = document.location.pathname;
let entryID = entry.slice(10)



function OnePostB(props) {

  const [things, setThings] = useState([]);
 
//fetches post by id.
  useEffect(() => {
    if (things.length === 0) {
      fetch(`/onepost/${entryID}`)
        .then((res) => res.json())
        .then((thingsList) => {
          setThings(thingsList);
        });
    }
  });

  return (
    <>
    <h1>SinglePost</h1>
      <table width="80%" border="2px">
        <thead>
          <tr>
            <th>Title</th>
            <th>Topic</th>
            <th>Attachments</th>
            <th>Author</th>
            <th>Date/Time</th>
            <th>Options</th>
          </tr>
        </thead>
        {things.map((data, index) => {
          return (
            <tbody>
              <tr>
                <td>{data.title}</td>
                <td>{data.topic}</td>
                <td>{data.attachment}</td>
                <td>{data.author}</td>
                <td></td>
                <td><Modal/></td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default OnePostB;