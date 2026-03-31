import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { getHistory } from "../../services/shortlink";
import "./HistoryTable.css";

function HistoryTable() {
    const [historyData, setHistoryData] = useState([]);
    const [sorting, setSorting] = useState([{ id: 'createdAt', desc: true }]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    useEffect(() => {
        let sortString = "createdAt,desc";

        if (sorting.length > 0) {
            const { id, desc } = sorting[0];
            sortString = `${id},${desc ? 'desc' : 'asc'}`;
        }
        getHistory(pagination.pageIndex, pagination.pageSize, sortString).then(
            res => {
                setHistoryData(res.content);
            }
        ).catch(err => {
            console.log(err);
        })

    }, [pagination.pageIndex, pagination.pageSize])
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

    const fakeData = useMemo(() => Array.from({ length: 48 }, (_, i) => ({
        no: i + 1,
        originalUrl: `https://example.com/very-long-original-url-path-very-long-original-url-path-very-long-original-url-path-${i + 1}`,
        shortUrl: `https://short.ly/link${i + 1}`,
        createdAt: `2026-03-${30 - Math.floor(i / 5)} 10:00`,
        clickedCount: Math.floor(Math.random() * 500),
    })), []);

    const table = useReactTable({
        data: historyData,
        columns,
        pageCount: historyData.totalPages,
        state: {
            globalFilter,
            sorting,
            pagination
        },
        onPaginationChange: setPagination, // Khi bấm nút, nó sẽ update cái state này
        manualPagination: true,            // QUAN TRỌNG: Bật chế độ Server-side
        getCoreRowModel: getCoreRowModel(),
        // initialState: {
        //     pagination: {
        //         pageSize: 10,
        //     },
        // },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const getPageNumbers = () => {
        const totalPages = table.getPageCount();
        const currentPage = table.getState().pagination.pageIndex + 1;
        const pageNumbers = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pageNumbers.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pageNumbers;
    };



    return (
        <>
            <div className="history-container">
                <div>
                    {historyData ?
                        (
                            <>
                                <div className="history-content">
                                    <div className="history-searchbar">
                                        <h3 className="history-title">Your History:</h3>

                                        {/* <input
                                            className="search-input"
                                            value={globalFilter ?? ""}
                                            onChange={(e) => setGlobalFilter(e.target.value)}
                                            placeholder="Search..."
                                        /> */}
                                    </div>
                                 
                                    <div className="history-table">
                                        <table>
                                            <colgroup>
                                                <col style={{ width: "5%" }} />
                                                <col style={{ width: "40%" }} />
                                                <col style={{ width: "25%" }} />
                                                <col style={{ width: "15%" }} />
                                                <col style={{ width: "15%" }} />
                                            </colgroup>
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
                                                                {/* {" "} */}
                                                                {{
                                                                    asc: "↑",
                                                                    desc: "↓",
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
                                    </div>

                                    <div className="pagination">
                                        <button
                                            className="pagination-arrow"
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6"></polyline>
                                            </svg>
                                        </button>

                                        <div className="pagination-numbers">
                                            {getPageNumbers().map((page, index) => (
                                                <button
                                                    key={index}
                                                    className={`pagination-number ${page === table.getState().pagination.pageIndex + 1 ? "active" : ""} ${page === "..." ? "dots" : ""}`}
                                                    onClick={() => typeof page === "number" && table.setPageIndex(page - 1)}
                                                    disabled={page === "..."}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            className="pagination-arrow"
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                        </button>
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