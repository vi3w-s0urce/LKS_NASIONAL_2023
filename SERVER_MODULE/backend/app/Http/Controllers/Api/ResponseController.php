<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use App\Models\Allowed_Domain;
use App\Models\Answer;
use App\Models\Form;
use App\Models\Question;
use App\Models\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResponseController extends Controller
{
    public function index(string $slug) {
        $data_form = Form::where('slug', '=', $slug)->first();
        
        // If form not found
        if (!$data_form) {
            return new ApiResource(404, 'Form not found', null);
        }
        
        // User access validation
        $user_id = $data_form->creator_id;
        $current_user = auth()->user()->id;
        if ($user_id != $current_user) {
            return new ApiResource(403, 'Forbidden access', null);
        }
        
        // Success code
        $form_id = $data_form->id;
        $data_response = Response::where('form_id', '=', $form_id)->get();
        $data_answer = Answer::with('question')->get();
        
        $results = ['responses' => []];
        $answer = [];

        
        foreach ($data_response as $key => $response) {
            foreach($data_answer as $key => $item) {
                if ($item->response_id == $response->id){
                    $answer += [
                        $item->question->name => $item->value,
                    ];
                }
            }
            $results['responses'][] = [
                'date' => $response->date,
                'user' => User::where('id','=', $response->user_id)->first(),
                'answer' => $answer,
            ];
        }

        return new ApiResource(200, 'Get response success', $results);
    }
    
    public function submit(string $slug, Request $request) {
        $data_form = Form::where('slug', '=', $slug)->first();
        
        if ($data_form) {
            $form_id = $data_form->id;
            $question_required = Question::where('form_id', '=', $form_id)->where('is_required', '=', '1')->get();
            $limit_one_response = $data_form->limit_one_response;

            date_default_timezone_set('Asia/Jakarta');

            // Validation request
            $validation = Validator::make( $request->all(), [
                'answers' => 'array'
            ]);
            if ($validation->fails()) {
                return new ApiResource(422, 'Invalid field', $validation->messages());
            }
            
            // if user email not allowed
            $allowed_domain_data = Allowed_Domain::where('form_id', '=', $form_id)->first();
            $allowed_domain = explode(',' , $allowed_domain_data->domain);
            $user_email = explode('@', auth()->user()->email)[1];
            
            if(!in_array($user_email, $allowed_domain) && $allowed_domain[0] != "") {
                return new ApiResource(403, 'Forbidden Access', null);
            }

            // Limit one response only
            if($limit_one_response == 1){
                $user_id = auth()->user()->id;
                $response_data = Response::where('form_id', '=', $form_id)->where('user_id', '=', $user_id)->get();
                if (count($response_data)) {
                    return new ApiResource(422, 'You can not submit form twice', null);            
                }
            }
            
            // Required Question Validation //
                // User input id
                $answer_question_id = [];
                foreach ($request->answers as $answer) {
                    $answer_question_id[] = $answer['question_id'];
                }

                // Required input id
                $question_required_id = [];
                foreach ($question_required as $item) {
                    $question_required_id[] = $item->id;
                }

                // Id question haven't answer yet
                $question_not_filled = array_diff($question_required_id, $answer_question_id);

                if(count($question_not_filled)) {
                    $required_question = Question::where('id', '=', $question_not_filled)->get();
                    return new ApiResource(422, 'Question is required', $required_question);
                }

            // if success
            $create_response = Response::create([
                'form_id' => $form_id,
                'user_id' => auth()->user()->id,
                'date' => date('Y-m-d H:i:s'),
            ]);

            $response_id = $create_response->id;

            foreach ($request->answers as $answer) {
                Answer::create([
                    'response_id' => $response_id,
                    'question_id' => $answer['question_id'],
                    'value' => $answer['value'],
                ]);
            }
            return new ApiResource(200, 'Submit response success', null);
        } else {
            return new ApiResource(404, 'Form not found', null);
        }

    }
}
