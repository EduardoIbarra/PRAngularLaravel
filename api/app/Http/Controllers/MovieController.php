<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    public function index() {
        return Movie::all();
    }

    public function show($id) {
        return Movie::find($id);
    }
}
