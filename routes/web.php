<?php


use App\Http\Controllers\PerangkatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\LoginController as WebLoginController;
use App\Models\Data;
use App\Models\Perangkat;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/






Route::get('home', function (Request $request) {


    return inertia('Home');
})->name('home');
Route::get('get', function (Request $request) {

    $perangkat = Perangkat::where('user_id', 1)->with(['data' => function ($q) {
        $q->get()->take(2);
    }])->get();
    return response()->json($perangkat);
})->name('get');
Route::get('add-perangkat', [PerangkatController::class, 'index'])->name('add-perangkat');
Route::post('create-perangkat', [PerangkatController::class, 'create'])->name('create-perangkat');
Route::post('delete-perangkat', [PerangkatController::class, 'delete'])->name('delete-perangkat');
Route::get('show-perangkat', [PerangkatController::class, 'show'])->name('show-perangkat');

Route::post('logout', [WebLoginController::class, 'logout'])->name('proses-logout');


Route::group(['middleware' => 'guest'], function () {
    Route::get('', function (Request $request) {

        return inertia('Index');
    });
    Route::post('login', [WebLoginController::class, 'login'])->name('login');
    Route::get('register', function (Request $request) {
        return inertia('Register',);
    })->name('register');
    Route::post('register', function (Request $request) {

        $request->validate([
            'name' => 'required|string|min:4',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'foto' => 'nullable|image|mimes:png,jpeg,webp,jpg'
        ]);
        $foto = $request->file('foto') ? $request->file('foto')->store('user') : 'Image/default.png';
        $password = bcrypt($request->password);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $password,
            'foto' => $foto,
        ]);
        Auth::login($user);
        return redirect()->route('home');
    });
});