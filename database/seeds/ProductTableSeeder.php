<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Product;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::truncate();

        $faker = Faker::create();

        $brands = [
            'Pirelli',
            'Michelin',
            'Hankook',
            'Good Year',
            'Maxxis',
            'Hartland',
            'Dunlop',
            'Bridgestone',
        ];

        


        for ($i = 0; $i < 50; $i++) {
            $brand = $faker->randomElement($brands);

            Product::create([
                'category_id' => $faker->numberBetween(1, 6),
                'brand' => $brand,
                'name' => $brand . strtoupper($faker->bothify(' ?##')),
                'promotion' => ($i == 0),
                'price' => $faker->randomFloat(2, 100, 1000),
                'discount_percent' => $faker->numberBetween(0, 10),
                'stock' => $faker->numberBetween(4, 40),
                'image_url' => '', //TODO
                'type' => $faker->randomElement(['winter', 'summer', 'all_season']),
                'size' => ($faker->numberBetween(27, 71) * 5) . '/'.($faker->numberBetween(5, 17) * 5).'/R'.$faker->numberBetween(10, 27).'  82 T &#9432;',
                'fuel_efficiency_class' => $faker->randomElement(['A', 'B', 'C', 'E', 'F', 'G']),
                'wet_grip_class' => $faker->randomElement(['A', 'B', 'C', 'E', 'F', 'G']),
                'noise_emission' => $faker->numberBetween(50, 100)
            ]);
        }

        

        /*
           
        $table->string('fuel_efficiency_class', 10)->nullable();
        $table->string('wet_grip_class', 10)->nullable();
        $table->integer('noise_emission')->nullable();
*/

       
    }
}
