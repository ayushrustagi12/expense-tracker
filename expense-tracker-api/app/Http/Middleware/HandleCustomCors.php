<?php

namespace App\Http\Middleware;

use Closure;

class HandleCustomCors
{
    public function handle($request, Closure $next)
    {
        if ($request->getMethod() === "OPTIONS") {
            return response('', 204)
                ->withHeaders([
                    'Access-Control-Allow-Origin' => 'http://localhost:5173',
                    'Access-Control-Allow-Methods' => '*',
                    'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN',
                    'Access-Control-Allow-Credentials' => 'true',
                ]);
        }

        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->headers->set('Access-Control-Allow-Methods', '*');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
