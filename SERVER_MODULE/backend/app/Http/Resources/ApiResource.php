<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiResource extends JsonResource
{
    public $status;
    public $message;
    public function __construct($status, $message, $resource) {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
    }
    public function toResponse($request)
    {
        $status = $this->status;
        $data = 'data';
        if ($status != 200) {
            $data = 'errors';
        }
        return response()->json([
            'status' => $this->status,
            'message' => $this->message,
            $data => $this->resource,
        ], $this->status); 
    }
}
