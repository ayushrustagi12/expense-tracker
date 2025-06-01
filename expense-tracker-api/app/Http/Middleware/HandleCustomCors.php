<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleCustomCors
{
    public function handle(Request $request, Closure $next): Response
    {
        // Define your allowed origins (MUST be exact, including protocol and port)
        $allowedOrigin = 'http://localhost:8080'; // Your React app URL

        // Handle preflight (OPTIONS) requests first
        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->header('Access-Control-Allow-Origin', $allowedOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Max-Age', '3600'); // Cache preflight for 1 hour
        }

        // Get the response after the request has been processed by your application
        $response = $next($request);

        // Set CORS headers for actual requests
        $response->header('Access-Control-Allow-Origin', $allowedOrigin);
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH', 'DELETE', 'OPTIONS');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->header('Access-Control-Allow-Credentials', 'true'); // Required if your frontend sends cookies/auth headers

        return $response;
    }
}