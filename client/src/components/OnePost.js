//single post page to return a single post by title query
//tried both on one page and load in conditionally, but react would not let me have two use effect hooks 

import { useEffect, useState } from "react";
import Modal from "./Modal";

let entry = document.location.pathname;
let entryTitle = entry.slice(7).replace("-", " ")




function OnePosts(props) {

  const [things, setThings] = useState([]);
 
//fetches post by title
  useEffect(() => {
    if (things.length === 0) {
      fetch(`/showall/${entryTitle}`)
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

export default OnePosts;