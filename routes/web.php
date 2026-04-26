<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AvanceController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GarageController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\PosteController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\PromotionnerController;
use App\Http\Controllers\TacheController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenteController;
use App\Http\Controllers\VoitureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Login
Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store']);
Route::get('/dashboard', [DashboardController::class, 'show'])->middleware(['auth'])->name('dashboard');

//Log out
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
})->name('logout');

//Dashboard
Route::resource('voitures', VoitureController::class)->except('index');
Route::resource('promotions', PromotionController::class)->except('index');
Route::resource('garage', GarageController::class)->except('index');
Route::resource('clients', ClientController::class)->except('index');
Route::resource('avances', AvanceController::class)->except('index');
Route::resource('credits', CreditController::class)->except('index');
Route::resource('maintenances', MaintenanceController::class)->except('index');
Route::resource('users', UserController::class)->except('index');
Route::resource('postes', PosteController::class)->except('index');
Route::resource('promotionner', PromotionnerController::class)->except('index');
Route::resource('taches', TacheController::class)->except('index');
Route::post('/deletePromo/{voiture}', [PromotionnerController::class, 'deleteAssign'])->name('delete.promo');;

//Marque termine Tache
Route::post('/taches/{id}/terminer', [TacheController::class, 'terminer']);

//Home Page
Route::get('/', [HomeController::class, 'show']);
//Cars List
Route::get('/cars', [CarsController::class, 'show']);

//Contact
Route::get('/contact', function (Request $request) {
    return Inertia::render('Contact', [
        'carId' => $request->query('carId'),
    ]);
});
Route::resource('contacts', ContactController::class)->except('index');








