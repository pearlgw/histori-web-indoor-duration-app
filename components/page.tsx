/* eslint-disable @next/next/no-img-element */
"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

type PersonDuration = {
    id: number;
    nim: string | null;
    name: string | null;
    labeled_image: string;
    start_time: string;
    end_time: string | null;
};

function TableImageDurations() {
    const [data, setData] = useState<PersonDuration[]>([]);
    const [filteredData, setFilteredData] = useState<PersonDuration[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/person-durations`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                // Sort by start_time from latest to oldest
                const sortedData = (data.person_durations || []).sort((a: PersonDuration, b: PersonDuration) =>
                    new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
                );
                setData(sortedData);
                setFilteredData(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter(person =>
            (person.name && person.name.toLowerCase().includes(query)) ||
            (person.nim && person.nim.toLowerCase().includes(query))
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to page 1 when searching
    };

    // Handle pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="relative overflow-x-auto shadow-md bg-slate-200 rounded-lg px-10 py-5">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by NIM or Name"
                    className="border px-4 py-2 rounded-lg"
                />
            </div>

            {filteredData.length > 0 ? (
                <>
                    <table className="w-full text-sm mt-4 rounded-xl">
                        <thead className="text-xs text-white uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NIM
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((person) => (
                                <tr className="bg-white border-b border-black" key={person.id}>
                                    <td className="px-6 py-4">
                                        <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/person-duration/show-labeled-image/?filename=${person.labeled_image}`} alt={person.name || 'Unknown'} className="w-52" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.nim || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(person.start_time).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {person.end_time ? new Date(person.end_time).toLocaleString() : 'Ongoing'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>No Person data available</p>
            )}
        </div>
    )
}

export default TableImageDurations;