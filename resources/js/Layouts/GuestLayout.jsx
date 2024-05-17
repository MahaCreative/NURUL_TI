import { Link, usePage } from "@inertiajs/react";
import { Add, Home, Logout, Widgets } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";

export default function GuestLayout({ children }) {
    const [Menu, setMenu] = useState(false);
    const { auth } = usePage().props;

    return (
        <div className="relative bg-white h-screen">
            <div className="flex bg-blue-500 py-3 px-4 justify-between items-center">
                <h3 className="font-bold tracking-tighter text-xl text-white">
                    IOT Kelembapan Tanah
                </h3>
            </div>
            {children}
            <div className="relative w-full justify-end flex px-4">
                <div>
                    <div
                        className={`absolute bottom-14 right-4 transition-all duration-300 ${
                            Menu
                                ? "max-h-screen opacity-100"
                                : "max-h-0 opacity-50"
                        } overflow-hidden`}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="text-blue-500">
                                <Link href={route("home")}>
                                    <Fab color="inherit">
                                        <Tooltip title="Home">
                                            <Home color="inherit" />
                                        </Tooltip>
                                    </Fab>
                                </Link>
                            </div>
                            <div className="text-blue-500">
                                <Link href={route("add-perangkat")}>
                                    <Fab color="inherit">
                                        <Tooltip title="Add Perangkat">
                                            <Add color="inherit" />
                                        </Tooltip>
                                    </Fab>
                                </Link>
                            </div>
                            <div className="text-red-500">
                                <Fab color="inherit">
                                    <Link
                                        as="button"
                                        method="post"
                                        href={route("proses-logout")}
                                    >
                                        <Tooltip title="Logout">
                                            <Logout color="inherit" />
                                        </Tooltip>
                                    </Link>
                                </Fab>
                            </div>
                        </div>
                    </div>
                    <div className="text-blue-500">
                        <Fab onClick={() => setMenu(!Menu)} color="inherit">
                            <Widgets color="inherit" />
                        </Fab>
                    </div>
                </div>
            </div>
        </div>
    );
}
