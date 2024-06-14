import React, { useRef } from "react";
import { useDrag } from "react-dnd";

const KanbanItem = ({ id, children }: any) => {
    const ref = useRef(null);
    const [collected, drag] = useDrag(() => ({
        type: "card",
        item: { id }
    }))

    let dragAction = 0;
    if (collected) {
        const { isDragging } = collected as any;
        dragAction = isDragging ? 0 : 1;
    }

    const opacity = dragAction;
    drag(ref);
    return (
        <div ref={ref} style={{ opacity }}>
            {children}
        </div>
    );
};

export default KanbanItem;