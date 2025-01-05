import React, { useEffect, useState } from 'react';

type PersonDuration = {
    id: number;
    name: string | null;
    total_duration: string; // Durasi dalam format HH:MM:SS
    created_at: Date | null;
};

type Props = {
    filteredData: PersonDuration[];
    currentItems: PersonDuration[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
};

const GetDataIndoorDuration: React.FC<Props> = ({
    filteredData,
    currentItems,
    currentPage,
    totalPages,
    handlePageChange
}) => {
    // Fungsi untuk memformat tanggal
    const formatDate = (date: Date | string | null) => {
        if (!date) return 'Ongoing';
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return 'Invalid Date';
        return dateObj.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Komponen Stopwatch
    const Stopwatch: React.FC = () => {
        const [time, setTime] = useState(0); // Waktu dalam detik

        useEffect(() => {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => clearInterval(timer); // Membersihkan interval saat komponen unmount
        }, []);

        // Mengubah detik menjadi format HH:MM:SS
        const formatTime = (seconds: number) => {
            const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            return `${hours}:${minutes}:${secs}`;
        };

        return <span>{formatTime(time)}</span>;
    };

    return (
        <div className="relative overflow-x-auto shadow-md bg-slate-200 rounded-lg px-10 py-5">
            {filteredData.length > 0 ? (
                <>
                    <table className="w-full text-sm mt-4 rounded-xl">
                        <thead className="text-xs text-white uppercase bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Total Duration</th>
                                <th scope="col" className="px-6 py-3">Created At</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((person, index) => (
                                <tr className="bg-white border-b border-black" key={person.id}>
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{person.name || 'Unknown'}</td>
                                    <td className="px-6 py-4">
                                        {person.total_duration === '00:00:00' ? (
                                            <Stopwatch />
                                        ) : (
                                            person.total_duration || 'N/A'
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{formatDate(person.created_at)}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={`/person-durations/${person.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Details
                                        </a>
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
                                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                    }`}
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
    );
};

export default GetDataIndoorDuration;