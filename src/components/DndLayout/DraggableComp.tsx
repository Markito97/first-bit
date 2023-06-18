import { FC, ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./DraggableComp.css";

interface DraggableCompProps {
  draggableId: string;
  content: ReactNode;
  index: number;
  preview: ReactNode;
  isWidgets?: boolean;
}

export const DraggableComp: FC<DraggableCompProps> = ({
  draggableId,
  content,
  index,
  preview,
  isWidgets,
}): JSX.Element => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="draggable-content"
            style={{
              ...provided.draggableProps.style,
            }}
          >
            {isWidgets ? preview : content}
          </div>
        );
      }}
    </Draggable>
  );
};
