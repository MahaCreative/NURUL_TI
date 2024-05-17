import GuestLayout from "@/Layouts/GuestLayout";
import { Link, router } from "@inertiajs/react";
import { Dialog, Input } from "@mui/material";
import React, { useState } from "react";
import FormPerangkat from "./FormPerangkat";
import Swal from "sweetalert2";

export default function Index(props) {
    const perangkat = props.perangkat;
    const [openDialog, setOpenDialog] = useState(false);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
    });
    const deleteHandler = (id) => {
        swalWithBootstrapButtons
            .fire({
                title: "Hapus Perangkat",
                text: "Anda yakin ingin menghapus perangkat?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.post(route("delete-perangkat", { id: id }), {
                        onSuccess: () => {
                            onClose(false);

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Sukses",
                                text: "1 Perangkat berhasil di hapus",
                                showConfirmButton: false,
                                timer: 1500,
                                showClass: {
                                    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
                                },
                                hideClass: {
                                    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
                                },
                            });
                        },
                    });
                }
            });
    };
    return (
        <div className="min-h-[80vh] max-h-[80vh] overflow-auto px-8 py-8">
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div className="min-w-[85vw] bg-white py-2 px-3">
                    <FormPerangkat onClose={setOpenDialog} />
                </div>
            </Dialog>
            {perangkat.length > 0 ? (
                <div>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setOpenDialog(true)}
                            className="bg-blue-500 py-2 px-4 text-white text-xs"
                        >
                            Tambah Perangkat
                        </button>
                        <Input
                            className="border-b border-blue-500 px-2 py-1"
                            placeholder="Cari Perangkat"
                        />
                    </div>
                    {perangkat.map((item, key) => (
                        <div
                            key={key}
                            className="my-2 bg-white rounded-md py-2 px-4 shadow-sm shadow-gray-500/50"
                        >
                            <h3 className="font-medium text-blue-500 text-xl tracking-tighter">
                                {item.nama_perangkat}
                            </h3>
                            <h3 className="font-medium text-blue-500 text-base tracking-tighter">
                                {item.kd_perangkat}
                            </h3>
                            <div>
                                <p className="font-medium text-blue-500">
                                    Nilai Suhu
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3 text-xs">
                                        <p>Min Suhu:</p>
                                        <p>{item.min_suhu} C</p>
                                    </div>
                                    <div className="flex gap-3 text-xs">
                                        <p>Max Suhu:</p>
                                        <p>{item.min_suhu} C</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-blue-500">
                                    Nilai Kelembapan Ruangan
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3 text-xs">
                                        <p>Min Kelembapan Ruangn:</p>
                                        <p>{item.min_suhu} C</p>
                                    </div>
                                    <div className="flex gap-3 text-xs">
                                        <p>Max Kelembapan Ruangn:</p>
                                        <p>{item.min_suhu} C</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-blue-500">
                                    Nilai Kelembapan Ruangan
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3 text-xs">
                                        <p>Min Kelembapan Tanah:</p>
                                        <p>{item.min_kt} </p>
                                    </div>
                                    <div className="flex gap-3 text-xs">
                                        <p>Max Kelembapan Tanah:</p>
                                        <p>{item.min_kt} </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <Link
                                    href={route("show-perangkat", {
                                        id: item.id,
                                    })}
                                    className=" my-2 bg-blue-500 text-white text-xs font-bold px-4 py-1"
                                >
                                    Lihat Perangkat
                                </Link>
                                <button
                                    onClick={() => deleteHandler(item.id)}
                                    className=" my-2 bg-red-500 text-white text-xs font-bold px-4 py-1"
                                >
                                    Hapus Perangkat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full flex justify-center  flex-col h-full py-6">
                    <h3 className="font-bold text-blue-500 text-3xl">
                        Tidak Ada Perangkat
                    </h3>
                    <p>
                        Anda belum memiliki perangkat 1 pun pada akun anda,
                        silahkan mendaftarkan perangkat anda melalui tombol
                        dibawah ini
                    </p>
                    <button
                        onClick={() => setOpenDialog(true)}
                        className="py-2 bg-blue-500 text-white font-bold "
                    >
                        Tambah Perangkat
                    </button>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
