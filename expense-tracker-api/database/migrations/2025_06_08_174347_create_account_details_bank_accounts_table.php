<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('account_detail_bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->string('holder_name');
            $table->string('bank_name');
            $table->string('branch');
            $table->string('account_number');
            $table->enum('account_type', ['savings', 'current']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('account_detail_bank_accounts');
    }
};
