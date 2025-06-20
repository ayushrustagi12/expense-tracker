<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('account_details_credit_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->string('holder_name')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('card_number')->nullable();
            $table->decimal('credit_limit', 12, 2)->nullable();
            $table->unsignedTinyInteger('billing_cycle_day')->nullable(); // 1 to 31
            $table->boolean('is_auto_debit_enabled')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('account_details_credit_cards');
    }
};
