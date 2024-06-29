import React from "react";
import { DragHandle } from "./DragHandle";

export const StaticTableRow = ({ row }) => {
    return (
        <tr className="shadow-md outline-indigo-600 outline-1" {...row.getRowProps()}>
            {row.cells.map((cell, i) => {
                if (i === 0) {
                    return (
                        <td className="bg-white" {...cell.getCellProps()}>
                            <DragHandle isDragging />
                            <span>{cell.render("Cell")}</span>
                        </td>
                    );
                }
                return (
                    <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                    </td>
                );
            })}
        </tr>
    );
};
