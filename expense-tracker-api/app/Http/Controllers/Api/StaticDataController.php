<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Currency;
use Illuminate\Http\JsonResponse;

class StaticDataController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::all(['id', 'name', 'type']);
        $currencies = Currency::all(['id', 'code', 'name', 'symbol']);

        return response()->json([
            'categories' => $categories,
            'currencies' => $currencies,
            // add more static data here as needed
        ]);
    }
}
