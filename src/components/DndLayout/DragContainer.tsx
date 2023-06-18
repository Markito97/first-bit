import { ReactNode, useState } from "react";
import { ControlValue } from "../Widgets/ControlValue";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Graph } from "../Widgets/Graph";
import { Table } from "../Widgets/Table";
import { nanoid } from "nanoid";
import { Dropdown } from "../Dropdown/Dropdown";
import { Settings } from "../../assets/Settings";
import CtrlVal from "../../assets/Group 1668.png";
import GraphPreview from "../../assets/Group 1669.png";
import TablePreview from "../../assets/Group 1670.png";
import { DroppableComp } from "./DroppableComp";
import "./DragContainer.css";

export const DragContainer = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function onDragEnd(result: DropResult, columns: GridCols) {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      if (destination.droppableId === "DROPDOWN") {
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
      } else {
        if (destItems.length > 1) {
          const find = destItems.findIndex((item) => item.id !== removed.id);

          const [removeItem] = destItems.splice(find, 1);

          sourceItems.push(removeItem);
        }
      }

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
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
          items: copiedItems,
        },
      });
    }
  }

  return (
    <div className="drag-container">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
        {Object.entries(columns).map(([columnId, column]) => {
          if (columnId === "DROPDOWN") {
            return (
              <Dropdown isOpen={isOpen} key={columnId}>
                <DroppableComp
                  isWidgets={columnId === "DROPDOWN"}
                  widgets={column.items}
                  columnId={columnId}
                />
              </Dropdown>
            );
          }
          return (
            <div key={columnId}>
              <DroppableComp widgets={column.items} columnId={columnId} />
            </div>
          );
        })}
        <div className="dropdown-menu" onClick={handleToggleMenu}>
          <Settings />
        </div>
      </DragDropContext>
    </div>
  );
};

interface GridItem {
  id: string;
  content: ReactNode;
  preview: ReactNode;
}

interface GridCols {
  [key: string]: {
    items: GridItem[];
  };
}

const columnsFromBackend: GridCols = {
  ["LEFT_TOP"]: {
    items: [],
  },
  ["LEFT_BOT"]: {
    items: [],
  },
  ["RIGHT_TOP"]: {
    items: [],
  },
  ["RIGHT_BOT"]: {
    items: [],
  },
  ["DROPDOWN"]: {
    items: [
      {
        id: nanoid(),
        content: <ControlValue />,
        preview: (
          <img style={{ width: "252px", height: "252px" }} src={CtrlVal} alt="control-value-cap" />
        ),
      },
      {
        id: nanoid(),
        content: <Graph />,
        preview: (
          <img style={{ width: "252px", height: "126px" }} src={GraphPreview} alt="graph-cap" />
        ),
      },
      {
        id: nanoid(),
        content: <Table />,
        preview: (
          <img style={{ width: "252px", height: "126px" }} src={TablePreview} alt="table-cap" />
        ),
      },
    ],
  },
};
