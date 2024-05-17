<?php

use App\Http\Controllers\LoginController;
use App\Models\Data;
use App\Models\Perangkat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'auth'
], function () {
    Route::post('get-perangkat', function (Request $request) {

        $cek = Perangkat::where('nama_perangkat', $request->nama_perangkat)->where('kd_perangkat', $request->kd_perangkat)->first();
        if ($cek) {
            return response()->json($cek);
        } else {
            return response()->json([
                'status' => '404',
            ]);
        }
    });
    Route::post('store-data', function (Request $request) {

        $perangkat = Perangkat::where('kd_perangkat', $request->kd_perangkat)
            ->where('nama_perangkat', $request->nama_perangkat)->first();

        Data::create([
            'perangkat_id' => $perangkat->id,
            'suhu' => $request->suhu,
            'humidity' => $request->humidity,
            'kelembapan_tanah' => $request->kelembapan_tanah,
        ]);
    });
});
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [LoginController::class, 'login']);
    Route::post('refresh', [LoginController::class, 'refresh']);
});
