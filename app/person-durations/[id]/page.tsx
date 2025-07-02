/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

type PersonDetail = {
    id: number;
    nim: string;
    name: string;
    start_time: string;
    end_time: string;
    labeled_image: string | null;
};

async function fetchPersonDetails(id: string): Promise<PersonDetail[]> {
    const res = await fetch(`https://bengkelkoding.dinus.id/indoor-api/person-durations/${id}/details`, {
        cache: 'no-store', // Selalu fetch data terbaru
    });

    if (!res.ok) {
        throw new Error('Failed to fetch details');
    }

    return res.json();
}

function formatDate(date: string | null): string {
    if (!date) return "onGoing"; // Jika end_time null, tampilkan "onGoing"
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return new Date(date).toLocaleString('id-ID', options);
}

export default async function PersonDurationDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params; // Tunggu `params` sebelum mengakses properti

    let details: PersonDetail[] = [];
    try {
        details = await fetchPersonDetails(id);
    } catch (error: any) {
        return <p className="text-red-500">Error: {error.message}</p>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md bg-slate-200 rounded-lg px-10 py-5 mx-10 my-5">
            <div className='flex items-center justify-between'>
                <h1 className="text-xl font-bold mb-5">
                    Details for Person: {details && details.length > 0 ? details[0].name : 'Unknown'}
                </h1>

                <Link href="/" className="text-blue-500 hover:text-blue-700 mb-5 inline-block">
                    Back to Home
                </Link>
            </div>

            {/* Mencari gambar pertama yang tidak null */}
            {details && details.length > 0 ? (
                details.find(detail => detail.labeled_image) ? (
                    <img
                        src={`https://bengkelkoding.dinus.id/indoor-api/person-durations/show-labeled-image?filename=${details.find(detail => detail.labeled_image)?.labeled_image}`}
                        alt="Gambar 1" className='w-96'
                    />
                ) : (
                    <p>No image available</p>
                )
            ) : (
                <p>No details available</p>
            )}

            {details && details.length > 0 ? (
                <table className="w-full text-sm mt-4 rounded-xl">
                    <thead className="text-xs text-white uppercase bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">No</th>
                            <th scope="col" className="px-6 py-3">NIM</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Start Time</th>
                            <th scope="col" className="px-6 py-3">End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail, index) => (
                            <tr className="bg-white border-b border-black" key={detail.id}>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{detail.nim}</td>
                                <td className="px-6 py-4">{detail.name}</td>
                                <td className="px-6 py-4">{formatDate(detail.start_time)}</td>
                                <td className="px-6 py-4">{formatDate(detail.end_time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No details available for this person.</p>
            )}
        </div>
    );
}