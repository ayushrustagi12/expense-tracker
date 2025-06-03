<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->prepend(\App\Http\Middleware\HandleCustomCors::class);
        $middleware->prepend(\Illuminate\Cookie\Middleware\EncryptCookies::class);
        $middleware->prepend(\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class);
        $middleware->prepend(\Illuminate\Session\Middleware\StartSession::class);
        $middleware->prepend(\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
