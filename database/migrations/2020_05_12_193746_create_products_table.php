<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->string('brand', 256);
            $table->string('name', 256);
            $table->boolean('promotion');
            $table->decimal('price', 8, 2);
            $table->decimal('discount_percent', 8, 2)->nullable();
            $table->decimal('stock', 8, 2);
            $table->text('description')->nullable();

            $table->enum('type', ['winter', 'summer', 'all_season'])->nullable();
            $table->string('size', 50)->nullable();
            $table->string('fuel_efficiency_class', 10)->nullable();
            $table->string('wet_grip_class', 10)->nullable();
            $table->integer('noise_emission')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
