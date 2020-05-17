<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Cart;

class CartController extends Controller{

    public function getCart(Request $request){
        return Cart::where('user_id', Auth::user()->id)
            ->leftJoin('products', 'product_id', '=', 'products.id')
            ->get();
    }

    public function addCart(Request $request){
        $cartItem = Cart::where('user_id', Auth::user()->id)->where('product_id', $request->productId)->first();
        if ($cartItem){
            $cartItem->increment('quantity', $request->quantity);
        }else{
            Cart::create([
                'user_id' => Auth::user()->id,
                'product_id' => $request->productId,
                'quantity' => $request->quantity,
            ]);
        }
    }
    
}
