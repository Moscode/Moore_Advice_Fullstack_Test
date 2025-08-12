<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends StoreProductRequest
{
    public function rules()
    {
        return array_merge(parent::rules(), [
            // Add any additional rules for update if needed
        ]);
    }
}