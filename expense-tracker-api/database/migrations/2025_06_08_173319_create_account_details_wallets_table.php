<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('account_details_wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->string('wallet_provider');
            $table->string('wallet_type');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('account_details_wallets');
    }
};
