import { FC, ReactNode } from "react";
import { DraggableComp } from "./DraggableComp";
import { Droppable } from "react-beautiful-dnd";
import "./DroppableComp.css";

interface Widgets {
  content: ReactNode;
  id: string;
  preview: ReactNode;
}

interface DroppableCompProps {
  columnId: string;
  widgets: Widgets[];
  isWidgets?: boolean;
}

export const DroppableComp: FC<DroppableCompProps> = ({ columnId, widgets, isWidgets }) => {
  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided) => {
        return (
          <div className="droppable-content" {...provided.droppableProps} ref={provided.innerRef}>
            {widgets.map((item, index) => (
              <DraggableComp
                key={item.id}
                draggableId={item.id}
                content={item.content}
                preview={item.preview}
                isWidgets={isWidgets}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
