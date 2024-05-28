import RealtimeCharts from "@/Components/RealtimeCharts";
import GuestLayout from "@/Layouts/GuestLayout";
import { Dialog } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";

import React, { useEffect, useRef, useState } from "react";

function Home(props) {
    const [perangkat, setPerangkat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("get"); // Ganti URL_API_ANDA dengan URL endpoint API Anda
                setPerangkat(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000); // Memanggil fetchData setiap 5 detik
        return () => clearInterval(interval); // Membersihkan interval saat komponen dibongkar
    }, []);
    console.log(perangkat);
    return (
        <>
            <div className="bg-gray-200 w-full h-full flex justify-center text-white max-h-[95vh] overflow-auto">
                <div className="py-6 px-8">
                    <div className="flex justify-between gap-3 ">
                        <div className="bg-blue-500 flex items-center rounded-md py-1 px-2 gap-3 w-full">
                            <div className="">
                                <h3 className="text-5xl font-bold text-white text-center">
                                    {perangkat.length}
                                </h3>
                            </div>
                            <div className="">
                                <p className="text-white font-medium font-mono text-xs">
                                    Perangkat kelembapan tanah yang anda miliki
                                </p>
                                <Link className="text-white text-xs">
                                    Lihat perangkat yang ada
                                </Link>
                            </div>
                        </div>
                    </div>
                    {perangkat.length > 0 ? (
                        perangkat.map((perangkat, key) => (
                            <RealtimeCharts key={key} perangkat={perangkat} />
                        ))
                    ) : (
                        <div className="w-full flex justify-center  flex-col h-full py-6">
                            <h3 className="font-bold text-blue-500 text-3xl">
                                Tidak Ada Perangkat
                            </h3>
                            <p>
                                Anda belum memiliki perangkat 1 pun pada akun
                                anda, silahkan mendaftarkan perangkat anda
                                melalui tombol dibawah ini
                            </p>
                            <Link
                                href={route("add-perangkat")}
                                className="py-2 bg-blue-500 text-white font-bold text-center "
                            >
                                Tambah Perangkat
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
Home.layout = (page) => <GuestLayout children={page} />;
export default Home;
