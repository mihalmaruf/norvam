import React, { useRef } from "react";
import { useDrop } from "react-dnd";

const KanbanColumn = ({ status, changeTaskStatus, children }: any) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: "card",
        drop(item: any) {
            changeTaskStatus(item.id, status);
        }
    });
    drop(ref);
    return <div ref={ref}> {children}</div>;
};

export default KanbanColumn;
