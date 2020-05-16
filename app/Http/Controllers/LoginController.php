<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\User;

class LoginController extends Controller{

    use AuthenticatesUsers;

    public function __construct(){
        $this->middleware('guest');
    }

    public function checkUser(Request $request){
        $isUser = User::select('email')->where('email', $request->email)->first();
        return response()->json($isUser?true:false);
        
    }

    public function login(Request $request){
        $this->validateLogin($request);

        if ($this->attemptLogin($request)) {
            $user = $this->guard()->user();
            $user->generateToken();

            return response()->json([
                'data' => $user->toArray(),
            ]);
        }

        return $this->sendFailedLoginResponse($request);
    }

    protected function sendFailedLoginResponse(Request $request){
        $errors = [ 'error' => trans('auth.failed') ];

        return response()->json($errors, 422);
    }
}
