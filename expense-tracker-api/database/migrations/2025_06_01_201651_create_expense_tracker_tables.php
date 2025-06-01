<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('type', ['savings', 'wallet', 'credit_card']);
            $table->decimal('initial_balance', 12, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('type', ['income', 'expense']);
            $table->timestamps();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('account_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->string('description')->nullable();
            $table->decimal('amount', 12, 2);
            $table->date('date');
            $table->enum('type', ['income', 'expense', 'transfer']);
            $table->foreignId('linked_transaction_id')->nullable()->constrained('transactions')->onDelete('cascade'); // for self transfers
            $table->timestamps();
        });

        Schema::create('emis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('loan_name');
            $table->foreignId('account_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 12, 2);
            $table->integer('number_of_installments');
            $table->decimal('interest_rate', 5, 2)->nullable(); // optional
            $table->date('start_date');
            $table->timestamps();
        });

        Schema::create('emi_installments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emi_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->date('due_date');
            $table->boolean('is_paid')->default(false);
            $table->timestamps();
        });

        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->year('year');
            $table->unsignedTinyInteger('month');
            $table->decimal('amount', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('budgets');
        Schema::dropIfExists('emi_installments');
        Schema::dropIfExists('emis');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('accounts');
    }
};
