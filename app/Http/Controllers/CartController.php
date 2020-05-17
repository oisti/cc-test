<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Cart;

class CartController extends Controller{

    public function getCart(Request $request){

        $userCartItems = Cart::where('user_id', Auth::user()->id);
    
        
        return $userCartItems->get();
    }

    public function addCart(Request $request){

    }
    
}
