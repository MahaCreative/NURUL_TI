import { Link, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import { error } from "highcharts";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Register(props) {
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        foto: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = -e.clientX / 5;
            const y = -e.clientY / 5;
            const container = document.getElementById("container");
            if (container) {
                container.style.backgroundPositionX = `${x}px`;
                container.style.backgroundPositionY = `${y}px`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("register"), {});
    };

    return (
        <div className="">
            <Toaster position="top-center" reverseOrder={false} />
            <div id="container" className="px-8">
                <form
                    onSubmit={submitHandler}
                    className="bg-white py-2 px-3 rounded-md w-full"
                >
                    <h1 className="text-center font-medium text-xl">
                        Silahkan masukkan data diri anda untuk membuat akun
                    </h1>
                    <div className="flex flex-col w-full gap-4 my-2">
                        <TextField
                            label={"Nama Lengkap"}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                            error={errors.name ? true : false}
                            helperText={errors.name && errors.name}
                            className="border py-1 border-blue-500 w-full rounded-md"
                            id="name"
                            name="name"
                            required
                        />
                        <TextField
                            label={"Email"}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            error={errors.email ? true : false}
                            helperText={errors.email && errors.email}
                            className="border py-1 border-blue-500 w-full rounded-md"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                        <TextField
                            label={"Foto"}
                            onChange={(e) =>
                                setData({ ...data, foto: e.target.files[0] })
                            }
                            error={errors.foto ? true : false}
                            helperText={errors.foto}
                            className="border py-1 border-blue-500 w-full rounded-md"
                            type="file"
                            id="foto"
                            name="foto"
                            required
                        />
                        <TextField
                            label={"Password"}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            className="border py-1 border-blue-500 w-full rounded-md"
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 hover:cursor-pointer"
                    >
                        Register
                    </button>
                    <Link
                        href={route("register")}
                        className="w-full bg-blue-600 text-white rounded-md py-2 hover:cursor-pointer block mt-2 text-center
                    "
                    >
                        Login Akun
                    </Link>
                </form>
            </div>
        </div>
    );
}
