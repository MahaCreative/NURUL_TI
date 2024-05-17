import RealtimeCharts from "@/Components/RealtimeCharts";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function Show(props) {
    const perangkat = props.perangkat;
    const [show, setShow] = useState("statistik");
    const [params, setParams] = useState({ dari: "", sampai: "" });
    const columns = [
        {
            name: "#",
            selector: (row, i) => i + 1,
            width: "60px",
        },
        {
            name: "Suhu",
            selector: (row) => row.suhu + "C",
            width: "70px",
        },
        {
            name: "Kelembapan Ruangan",
            selector: (row) => row.humidity + "C",
        },
        {
            name: "Kelembapan Tanah",
            selector: (row) => row.kelembapan_tanah,
        },
    ];
    return (
        <div className="min-h-[80vh] max-h-[80vh] overflow-auto px-8 py-8 ">
            <div className="flex bg-gray-200">
                <button
                    onClick={() => setShow("statistik")}
                    className={`${
                        show == "statistik"
                            ? "bg-blue-500 font-bold text-white"
                            : ""
                    } py-2 text-lg px-4 transition-all duration-300 ease-in-out`}
                >
                    Statistik
                </button>
                <button
                    onClick={() => setShow("data")}
                    className={`${
                        show == "data" ? "bg-blue-500 font-bold text-white" : ""
                    } py-2 text-lg px-4 transition-all duration-300 ease-in-out`}
                >
                    Data Tabel
                </button>
            </div>
            <div className="">
                {show == "statistik" && (
                    <div className="py-6">
                        <RealtimeCharts perangkat={perangkat} />
                    </div>
                )}
                {show == "data" && (
                    <div className="py-6">
                        <div className="flex justify-end gap-2 mb-4">
                            <div>
                                <p className="text-xs">Dari Tanggal</p>
                                <TextInput
                                    type="date"
                                    value={params.dari}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            dari: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <p className="text-xs">Sampai Tanggal</p>
                                <TextInput
                                    type="date"
                                    value={params.sampai}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            sampai: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <DataTable
                                data={perangkat.data}
                                columns={columns}
                                dense
                                pagination
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Show.layout = (page) => <GuestLayout children={page} />;
