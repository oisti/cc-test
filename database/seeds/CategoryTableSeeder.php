<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::truncate();

        $categories = [
            'Cars / Off Road Vehicles ATV',
            'Trucks',
            'Agriculture',
            'Inner tubes',
            'Skid chains',
            'Rims'
        ];

        foreach ($categories as $category){
            Category::create([
                'url_friendly' => strtolower(preg_replace('!\s+!', '-', preg_replace("/[^A-Za-z0-9 ]/", ' ', $category))),
                'name' => $category
            ]);
        }

        //
    }
}
