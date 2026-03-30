import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import "./HistoryTable.css";

function HistoryTable() {
    const [historyData, setHistoryData] = useState([]);
    useEffect(() => {
        setHistoryData([])

    }, [])
    const [globalFilter, setGlobalFilter] = useState("");
    const columns = useMemo(
        () => [
            {
                header: "No",
                accessorKey: "no",
            },
            {
                header: "Original URL",
                accessorKey: "originalUrl",
            },
            {
                header: "Short URL",
                accessorKey: "shortUrl",
            },
            {
                header: "Created At",
                accessorKey: "createdAt",
            },
            {
                header: "Clicked count",
                accessorKey: "clickedCount",
            },
        ],
        []
    );

    const fakeData = [
        {
            no: 1,
            originalUrl: "https://google.com",
            shortUrl: "https://short.ly/abc123",
            createdAt: "2026-03-30 10:00",
            clickedCount: 120,
        },
        {
            no: 2,
            originalUrl: "https://facebook.com",
            shortUrl: "https://short.ly/def456",
            createdAt: "2026-03-29 14:20",
            clickedCount: 85,
        },
        {
            no: 3,
            originalUrl: "https://youtube.com",
            shortUrl: "https://short.ly/ghi789",
            createdAt: "2026-03-28 09:15",
            clickedCount: 230,
        },
        {
            no: 4,
            originalUrl: "https://github.com",
            shortUrl: "https://short.ly/jkl012",
            createdAt: "2026-03-27 18:45",
            clickedCount: 60,
        },
        {
            no: 5,
            originalUrl: "https://openai.com",
            shortUrl: "https://short.ly/mno345",
            createdAt: "2026-03-26 12:10",
            clickedCount: 310,
        },
    ];

    const table = useReactTable({
        data: fakeData,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });



    return (
        <>
            <div className="history-container">
                <h3 className="history-title">History</h3>
                <div>
                    {historyData ?
                        (
                            <>
                                <input
                                    value={globalFilter ?? ""}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    placeholder="Search..."
                                    style={{ marginBottom: 10 }}
                                />
                                <div className="history-table">
                                    <table>
                                        <thead>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <tr key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => (
                                                        <th
                                                            key={header.id}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                            {" "}
                                                            {{
                                                                asc: "🔼",
                                                                desc: "🔽",
                                                            }[header.column.getIsSorted()] ?? ""}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody>
                                            {table.getRowModel().rows.map((row) => (
                                                <tr key={row.id}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <td key={cell.id}>
                                                            {flexRender(
                                                                cell.column.columnDef.cell ?? cell.getValue(),
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="pagination">
                                        <button onClick={() => table.previousPage()}>Prev</button>
                                        <button onClick={() => table.nextPage()}>Next</button>

                                        <span>
                                            Page {table.getState().pagination.pageIndex + 1} /{" "}
                                            {table.getPageCount()}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )

                        : (
                            <>
                                <p>No history</p>
                            </>
                        )


                    }
                </div>
            </div>

        </>
    )
}

export default HistoryTable;