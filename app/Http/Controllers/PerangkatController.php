<?php

namespace App\Http\Controllers;

use App\Models\Data;
use App\Models\Perangkat;
use Illuminate\Http\Request;

class PerangkatController extends Controller
{
    public function index(Request $request)
    {
        $query = Perangkat::query()->where('user_id', $request->user()->id);

        $perangkat = $query->latest()->get();
        return inertia('Perangkat/Index', compact('perangkat'));
    }
    public function create(Request $request)
    {
        $attr = $request->validate([
            "nama_perangkat" => 'required|min:6',
            "kd_perangkat" => 'required|unique:perangkats,kd_perangkat|min:6|numeric',
            "min_suhu" => 'required|numeric|lte:max_suhu',
            "max_suhu" => 'required|numeric|gte:min_suhu',
            "min_hum" => 'required|numeric|lte:max_hum',
            "max_hum" => 'required|numeric|gte:min_hum',
            "min_kt" => 'required|numeric|lte:max_kt',
            "max_kt" => 'required|numeric|gte:min_kt',
        ]);
        $attr['user_id'] = $request->user()->id;
        $perangkat = Perangkat::create($attr);
        $data = Data::create([
            'perangkat_id' => $perangkat->id,
            "suhu" => 0,
            "humidity" => 0,
            "kelembapan_tanah" => 0,
        ]);
        return redirect()->back();
    }

    public function delete(Request $req)
    {

        $perangkat = Perangkat::findOrFail($req->id);
        $perangkat->delete();
        return redirect()->back();
    }

    public function show(Request $request)
    {

        $query = Perangkat::query()->with(['data' => function ($q) {
            $q->get();
        }])->where('id', $request->id);
        $perangkat = $query->latest()->first();
        return inertia('Perangkat/Show', compact('perangkat'));
    }
}
