<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id', 
        'brand', 
        'model', 
        'promotion', 
        'price', 
        'discount_percent', 
        'stock', 
        'description', 
        'image_url', 
        'type', 
        'size', 
        'fuel_efficiency_class', 
        'wet_grip_class', 
        'noise_emission'
    ];
}
