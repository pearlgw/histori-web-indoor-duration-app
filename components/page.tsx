/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react';
import GetDataIndoorDuration from './getDataIndoorDuration/page';

type PersonDuration = {
    id: number;
    name: string | null;
    total_duration: string;
    created_at: Date | null;
};

const TableImageDurations = () => {
    const [data, setData] = useState<PersonDuration[]>([]);
    const [filteredData, setFilteredData] = useState<PersonDuration[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fungsi untuk mengambil data dari API
    const getData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/person-durations`);
            const data = await response.json();

            setData(data);
            setFilteredData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(); // Panggil fungsi getData saat komponen pertama kali dimuat
    }, []);

    // Handle pencarian
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter(person =>
            (person.name && person.name.toLowerCase().includes(query))
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset ke halaman pertama saat pencarian
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            {/* Pencarian */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by NIM or Name"
                    className="border px-4 py-2 rounded-lg"
                />
            </div>

            <GetDataIndoorDuration
                filteredData={filteredData}
                currentItems={currentItems}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default TableImageDurations;
