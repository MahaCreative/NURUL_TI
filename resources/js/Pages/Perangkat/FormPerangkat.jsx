import { useForm } from "@inertiajs/react";
import { Input, TextField } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

export default function FormPerangkat({ onClose }) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });
    const { data, setData, post, reset, errors } = useForm({
        nama_perangkat: "",
        kd_perangkat: "",
        min_suhu: 0,
        max_suhu: 0,
        min_hum: 0,
        max_hum: 0,
        min_kt: 0,
        max_kt: 0,
    });
    const submit = (e) => {
        e.preventDefault();
        onClose(false);
        swalWithBootstrapButtons
            .fire({
                title: "Tambah Perangkat",
                text: "Tambahkan 1 perangkat baru?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    post(route("create-perangkat"), {
                        onSuccess: () => {
                            onClose(false);
                            reset();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Sukses",
                                text: "Berhasil menambah 1 perangkat baru",
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

                        onError: () => {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Error",
                                text: "Gagal menambah 1 perangkat baru",
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
                            setTimeout(() => {
                                onClose(true);
                            }, 1500);
                        },
                    });
                }
            });
    };
    console.log(errors);
    return (
        <form onSubmit={submit} className="flex flex-col gap-3">
            <TextField
                label="nama perangkat"
                id="filled-basic"
                className="w-full block text-xs"
                helperText={errors.nama_perangkat && errors.nama_perangkat}
                error={errors.nama_perangkat ? true : false}
                value={data.nama_perangkat}
                name="nama_perangkat"
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                variant="filled"
            />
            <TextField
                label="Kode perangkat"
                id="filled-basic"
                className="w-full block text-xs"
                helperText={errors.kd_perangkat && errors.kd_perangkat}
                error={errors.kd_perangkat ? true : false}
                value={data.kd_perangkat}
                name="kd_perangkat"
                onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                }
                variant="filled"
                type="numeric"
            />
            <div className="my-2">
                <h3 className="text-xs font-bold text-blue-500">
                    Data Suhu Ruangan
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <TextField
                        label="Min Suhu"
                        id="filled-basic"
                        className="w-full block text-xs"
                        helperText={errors.min_suhu && errors.min_suhu}
                        error={errors.min_suhu ? true : false}
                        value={data.min_suhu}
                        name="min_suhu"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        variant="filled"
                        type="numeric"
                    />
                    <TextField
                        label="Max Suhu"
                        id="filled-basic"
                        className="w-full block text-xs"
                        helperText={errors.max_suhu && errors.max_suhu}
                        error={errors.max_suhu ? true : false}
                        value={data.max_suhu}
                        name="max_suhu"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        variant="filled"
                    />
                </div>
            </div>
            <div className="my-2">
                <h3 className="text-xs font-bold text-blue-500">
                    Data Suhu Ruangan
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <TextField
                        label="Min Kelembapan Ruangan"
                        id="filled-basic"
                        className="w-full block text-xs"
                        helperText={errors.min_hum && errors.min_hum}
                        error={errors.min_hum ? true : false}
                        value={data.min_hum}
                        name="min_hum"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        variant="filled"
                    />
                    <TextField
                        label="Max Kelembapan Ruangan"
                        id="filled-basic"
                        className="w-full block text-xs"
                        helperText={errors.max_hum && errors.max_hum}
                        error={errors.max_hum ? true : false}
                        value={data.max_hum}
                        name="max_hum"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        variant="filled"
                    />
                </div>
            </div>
            <div className="my-2">
                <h3 className="text-xs font-bold text-blue-500">
                    Data Suhu Ruangan
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <TextField
                        label="Min Kelembapan Tanah"
                        id="filled-basic"
                        className="w-full block text-xs"
                        helperText={errors.min_kt && errors.min_kt}
                        error={errors.min_kt ? true : false}
                        value={data.min_kt}
                        name="min_kt"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        variant="filled"
                    />
                    <TextField
                        label="Max Kelembapan Tanah"
                        id="filled-basic"
                        className="w-full block text-xs"
                        helperText={errors.max_kt && errors.max_kt}
                        error={errors.max_kt ? true : false}
                        value={data.max_kt}
                        name="max_kt"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                        variant="filled"
                    />
                </div>
            </div>
            <div>
                <button className="text-white py-1 px-4 text-xs bg-blue-500">
                    Tambah Perangkat
                </button>
            </div>
        </form>
    );
}
