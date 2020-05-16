<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Product;

class ProductController extends Controller{
    
    public function search(Request $request){
        $products = Product::query();
        if ($request->has('category')){
            $products->where('category_id', $request->category);
        }
        if ($request->has('searchTerm')){
            $products->where('brand', 'like', '%'.$request->searchTerm.'%')
                ->orWhere('name', 'like', '%'.$request->searchTerm.'%')
                ->orWhere('size', 'like', '%'.$request->searchTerm.'%');
        }
        if ($request->has('maxResults')){
            $products->limit($request->maxResults);
        }
        return $products->get();
    }

    public function promoProduct(Request $request){
        return Product::where('promotion','true')->first();
    }

    
}
