<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use App\Models\Allowed_Domain;
use App\Models\Form;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function index() {
        $data = Form::where('creator_id', '=', auth()->user()->id)->get();
        return new ApiResource(200, 'Get all forms success', $data);
    }

    public function create(Request $request) {
        $limit_one_response = $request->limit_one_response;

        if ($limit_one_response == 'true') {
            $limit_one_response = 1;
        } else {
            $limit_one_response = 0;
        }

        $allowed_domains = $request->allowed_domains;

        $validator = Validator::make( $request->all(), [
            'name' => 'required',
            'slug' => 'required|unique:forms,slug|alpha_dash',
            'allowed_domains' => 'array',
        ]);

        if (!$validator->fails()) {
            $data_form = [
                "name" => $request->name,
                "slug" => $request->slug,
                "description" => $request->description,
                "limit_one_response" => $limit_one_response,
                "creator_id" => auth()->user()->id,
            ];

            $create_form = Form::create($data_form);

            $form_id = $create_form->id;
            $allowed_domains = implode(', ' , $allowed_domains);
            $data_allowed_domains = [
                "form_id" => $form_id,
                "domain" => $allowed_domains,
            ];

            $create_allowed_domains = Allowed_Domain::create($data_allowed_domains);
            
            return new ApiResource(200, 'Create form success', $create_form);
        } else {
            return new ApiResource(422, 'Invalid field', $validator->messages());
        }
    }

    public function detail(string $slug) {
        $data_detail = Form::where('slug', '=', $slug)->first();

        
        if ($data_detail) {
            $form_id = $data_detail->id;
            $creator_id = $data_detail->creator_id;
            $creator_detail = User::where('id', '=', $creator_id)->first();
            $data_allowed_domains = Allowed_Domain::where('form_id', '=', $form_id)->first();
            $allowed_domains = $data_allowed_domains->domain;
            $data_question = Question::where('form_id', '=', $form_id)->get();
            $data_detail["allowed_domains"] = explode(', ', $allowed_domains);
            $data_detail["creator"] = $creator_detail;

            if ($data_question) {
                $data_detail["question"] = $data_question;
            }

            $user_domain = explode('@', auth()->user()->email)[1];

            if (!in_array($user_domain, $data_detail->allowed_domains) && $data_detail->allowed_domains[0] != "" && $creator_id != auth()->user()->id){
                return new ApiResource(403, 'Forbidden access', null);
            }

            return new ApiResource(200, 'Get form Success', $data_detail);
        } else {
            return new ApiResource(404, 'Form not found', '404');
        }
    }
}
