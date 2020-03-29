// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid/v4";
// import { API_URL } from "../config/URLs";

// const itemsFromBackend = [];
// const columnsFromBackend = {
//   [uuid()]: {
//     name: "Requested",
//     items: [{ id: 1, content: "refresh" }]
//   },
//   [uuid()]: {
//     name: "In Progress",
//     items: [] //backend
//   },
//   [uuid()]: {
//     name: "Done",
//     items: []
//   }
// };
// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems
//       }
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems
//       }
//     });
//   }
// };
// const [columns, setColumns] = useState(columnsFromBackend);
// const Todos = () => {
//   return (
//     <div>
//       <DragDropContext
//         onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
//         {Object.entries(columns).map(([columnId, column], index) => {
//           return (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 background: "#035449",
//                 minHeight: "100em"
//               }}
//               key={columnId}>
//               <h2 style={{ color: "#81ecec" }}>{column.name}</h2>
//               <div style={{ margin: 8 }}>
//                 <Droppable droppableId={columnId} key={columnId}>
//                   {(provided, snapshot) => {
//                     return (
//                       <div
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                         style={{
//                           background: snapshot.isDraggingOver
//                             ? "#F39C9E"
//                             : "#5F7974",
//                           padding: 4,
//                           width: 250,
//                           minHeight: "30rem"
//                         }}>
//                         {column.items.map((item, index) => {
//                           return (
//                             <Draggable
//                               key={item.id}
//                               draggableId={item.id}
//                               index={index}>
//                               {(provided, snapshot) => {
//                                 return (
//                                   <div
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     style={{
//                                       userSelect: "none",
//                                       paddingTop: 20,
//                                       margin: "0 0 8px 0",
//                                       minHeight: "3rem",
//                                       backgroundColor: snapshot.isDragging
//                                         ? "#263B4A"
//                                         : "#456C86",
//                                       color: "white",
//                                       textAlign: "center",
//                                       ...provided.draggableProps.style
//                                     }}>
//                                     {/* Draggable items */}
//                                     {itemsFromBackend && item.content}
//                                     {/* <div>
//                                       <img
//                                         className={classes.profilePicture}
//                                         alt="profile"
//                                         src={`${API_URL}/${url}`}
//                                       />
//                                     </div> */}
//                                     {/* <div>created By: {createdBy}</div>
//                                     <div>
//                                       <Moment fromNow>{createdAt}</Moment>
//                                     </div> */}
//                                   </div>
//                                 );
//                               }}
//                             </Draggable>
//                           );
//                         })}
//                         {provided.placeholder}
//                       </div>
//                     );
//                   }}
//                 </Droppable>
//               </div>
//             </div>
//           );
//         })}
//       </DragDropContext>
//     </div>
//   );
// };

// export default Todos;

import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "uuid/v4";
// import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { API_URL } from "../config/URLs";

const useStyles = makeStyles((theme) => {
  return {
    dashboardBg: {
      background: "#333333"
    },
    paper: {
      background: "#424242",
      padding: "10px",
      margin: "20px",
      textAlign: "center"
    },
    title: {
      color: "#90CAF9",
      fontSize: "1.2rem"
    },
    amount: {
      color: "#FFFFFF",
      fontSize: "2rem",
      marginTop: "30px"
    },
    projectBg: {
      marginTop: "-40px",
      background: "#2d3436",
      color: "#95afc0"
    },
    projectTitle: {
      fontSize: "2.7rem",
      paddingTop: "10px",
      marginBottom: "2px"
    },
    projectDate: {
      marginTop: "-3px",
      color: "#ff7979"
    },
    income: {
      color: "#95afc0"
    },
    expenses: {
      color: "#eb4d4b"
    },
    moneyLeft: {
      color: "#7ed6df"
    },
    profilePicture: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      marginTop: "5px"
    }
  };
});

const Todos = (props) => {
  //CSS CLASS
  const classes = useStyles();

  const itemsFromBackend = [
    { id: uuid(), content: "First task" },
    { id: uuid(), content: "Second task" },
    { id: uuid(), content: "Third task" },
    { id: uuid(), content: "Fourth task" },
    { id: uuid(), content: "Fifth task" }
  ];

  const columnsFromBackend = {
    [uuid()]: {
      name: "This to do",
      items: props.projectTodos
    },

    [uuid()]: {
      name: "In Progress",
      items: []
    },
    [uuid()]: {
      name: "Completed",
      items: []
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%"
      }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#356357"
              }}
              key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}>
                                    {item.content}
                                    <div>
                                      <img
                                        className={classes.profilePicture}
                                        alt="profile"
                                        src={`${API_URL}/${props.url}`}
                                      />
                                    </div>{" "}
                                    <div>created By: {props.createdBy}</div>
                                    <div>
                                      <Moment fromNow>{props.createdAt}</Moment>{" "}
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Todos;
