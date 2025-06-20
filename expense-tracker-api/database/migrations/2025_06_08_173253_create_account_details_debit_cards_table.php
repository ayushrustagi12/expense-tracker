<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('account_details_debit_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->string('holder_name')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('card_number')->nullable();
            $table->foreignId('linked_bank_account_id')
                ->nullable()
                ->constrained('accounts')
                ->onDelete('set null'); // if linked account is deleted, unlink the card
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('account_details_debit_cards');
    }
};
