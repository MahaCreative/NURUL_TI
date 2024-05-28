import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function RealtimeCharts({ perangkat }) {
    // State untuk menyimpan data grafik
    const [chartSuhu, setChartSuhu] = useState([]);
    const [chartHum, setChartHum] = useState([]);
    const [chartKT, setChartKT] = useState([]);
    useEffect(() => {
        // Fungsi untuk membuat opsi grafik berdasarkan data
        const createChartSuhu = (device) => {
            const limitedData = device.data.slice(-20); // Ambil 20 titik terakhir
            const categories = limitedData.map((entry) =>
                moment(entry.created_at).format("HH:mm")
            );
            return {
                chart: {
                    type: "areaspline",
                    animation: Highcharts.svg,
                },
                title: {
                    text: "Suhu Perangkat: " + device.nama_perangkat,
                },
                yAxis: {
                    title: {
                        text: "Suhu (°C)",
                    },
                    min: 16,
                    max: 40,
                    tickInterval: 3,
                },

                xAxis: {
                    categories: categories, // Set sumbu x dengan data waktu
                },
                series: [
                    {
                        name: "Suhu",
                        data: limitedData.map((entry) => entry.suhu),
                        color: "rgba(255,0,0,0.4)",
                    },
                ],
            };
        };
        const createChartHum = (device) => {
            const limitedData = device.data.slice(-20); // Ambil 20 titik terakhir
            const categories = limitedData.map((entry) =>
                moment(entry.created_at).format("HH:mm")
            );
            return {
                chart: {
                    type: "areaspline",
                    animation: Highcharts.svg,
                },
                title: {
                    text: "Kelembapan Ruangan: " + device.nama_perangkat,
                },
                yAxis: {
                    title: {
                        text: "Kelembapan Ruangna (°C)",
                    },
                    min: 16,
                    max: 40,
                    tickInterval: 3,
                },
                xAxis: {
                    categories: categories, // Set sumbu x dengan data waktu
                },
                series: [
                    {
                        name: "Humadity",
                        data: limitedData.map((entry) => entry.humidity),
                        color: "rgba(0,255,0,0.4)",
                    },
                ],
            };
        };
        const createChartKT = (device) => {
            const limitedData = device.data.slice(-20); // Ambil 20 titik terakhir
            const categories = limitedData.map((entry) =>
                moment(entry.created_at).format("HH:mm")
            );
            return {
                chart: {
                    type: "areaspline",
                    animation: Highcharts.svg,
                },
                title: {
                    text:
                        "Kelembapan Tanah Perangkat: " + device.nama_perangkat,
                },
                xAxis: {
                    categories: categories, // Set sumbu x dengan data waktu
                },
                series: [
                    {
                        name: "Kelembapan Tanah",
                        data: limitedData.map(
                            (entry) => entry.kelembapan_tanah
                        ),
                        color: "rgba(0,0,255,0.4)",
                    },
                ],
            };
        };

        // Buat opsi grafik untuk setiap perangkat dan tambahkan ke state
        const options = createChartSuhu(perangkat);
        setChartSuhu(options);
        const optionsHum = createChartHum(perangkat);
        setChartHum(optionsHum);
        const optionsKT = createChartKT(perangkat);
        setChartKT(optionsKT);
    }, [perangkat]);
    console.log(perangkat);
    return (
        <div className="my-3">
            <div>
                <h3 className="font-bold text-2xl text-blue-500 tracking-tighter">
                    Data Statistik Perangkat
                </h3>
                <h3 className="font-bold text-lg text-blue-500 tracking-tighter">
                    {perangkat.nama_perangkat}
                </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white my-3 rounded-md shadow-sm shadow-gray-300/50 py-1 px-4">
                    <p className="mb-5 text-green-500 font-semibold font-sans text-xs pt-3">
                        Suhu Ruangan
                    </p>
                    <CircularProgressbar
                        minValue={perangkat.min_suhu}
                        maxValue={perangkat.max_suhu}
                        value={perangkat.data[perangkat.data.length - 1].suhu}
                        text={`${
                            perangkat.data[perangkat.data.length - 1].suhu
                        }%`}
                        circleRatio={0.75}
                        styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: "butt",
                            trailColor: "#eee",
                            textColor: `rgb(${
                                255 -
                                (perangkat.data[perangkat.data.length - 1]
                                    .suhu /
                                    100) *
                                    255
                            }, ${
                                (perangkat.data[perangkat.data.length - 1]
                                    .suhu /
                                    100) *
                                255
                            }, 0)`,
                            pathColor: `rgb(${
                                255 -
                                (perangkat.data[perangkat.data.length - 1]
                                    .suhu /
                                    100) *
                                    255
                            }, ${
                                (perangkat.data[perangkat.data.length - 1]
                                    .suhu /
                                    100) *
                                255
                            }, 0)`,
                        })}
                    />
                </div>
                <div className="bg-white my-3 rounded-md shadow-sm shadow-gray-300/50 py-1 px-4">
                    <p className="mb-5 text-green-500 font-semibold font-sans text-xs pt-3">
                        Kelembapan Ruangan
                    </p>
                    <CircularProgressbar
                        minValue={perangkat.min_hum}
                        maxValue={perangkat.max_hum}
                        value={
                            perangkat.data[perangkat.data.length - 1].humidity
                        }
                        text={`${
                            perangkat.data[perangkat.data.length - 1].humidity
                        }%`}
                        circleRatio={0.75}
                        styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: "butt",
                            trailColor: "#eee",
                            textColor: `rgb(${
                                (perangkat.data[perangkat.data.length - 1]
                                    .humidity /
                                    100) *
                                255
                            }, ${
                                255 -
                                (perangkat.data[perangkat.data.length - 1]
                                    .humidity /
                                    100) *
                                    255
                            }, 0)`,
                            pathColor: `rgb(${
                                255 -
                                (perangkat.data[perangkat.data.length - 1]
                                    .humidity /
                                    100) *
                                    255
                            }, ${
                                (perangkat.data[perangkat.data.length - 1]
                                    .humidity /
                                    100) *
                                255
                            }, 0)`,
                        })}
                    />
                </div>
                <div className=" bg-white my-3 rounded-md shadow-sm shadow-gray-300/50 py-1 px-4">
                    <p className="mb-5 text-green-500 font-semibold font-sans text-xs pt-3">
                        Kelembapan Tanah
                    </p>
                    <CircularProgressbar
                        minValue={perangkat.min_kt}
                        maxValue={perangkat.max_kt}
                        value={
                            perangkat.data[perangkat.data.length - 1]
                                .kelembapan_tanah
                        }
                        text={`${
                            perangkat.data[perangkat.data.length - 1]
                                .kelembapan_tanah
                        }%`}
                        circleRatio={0.75}
                        styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: "butt",
                            trailColor: "#eee",
                            textColor: `rgb(${
                                (perangkat.data[perangkat.data.length - 1]
                                    .kelembapan_tanah /
                                    100) *
                                255
                            }, ${
                                255 -
                                (perangkat.data[perangkat.data.length - 1]
                                    .kelembapan_tanah /
                                    100) *
                                    255
                            }, 0)`,
                            pathColor: `rgb(${
                                255 -
                                (perangkat.data[perangkat.data.length - 1]
                                    .kelembapan_tanah /
                                    100) *
                                    255
                            }, ${
                                (perangkat.data[perangkat.data.length - 1]
                                    .kelembapan_tanah /
                                    100) *
                                255
                            }, 0)`,
                        })}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3 ">
                <HighchartsReact highcharts={Highcharts} options={chartSuhu} />
                <HighchartsReact highcharts={Highcharts} options={chartHum} />
                <HighchartsReact highcharts={Highcharts} options={chartKT} />
            </div>
        </div>
    );
}
