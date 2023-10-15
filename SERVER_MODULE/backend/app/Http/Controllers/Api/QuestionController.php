<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use App\Models\Answer;
use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    public function add(string $slug, Request $request){
        $data_form = Form::where('slug', '=', $slug)->first();
        $form_id = $data_form->id;

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'choice_type' => 'required|in:short answer,paragraph,date,multiple choice,dropdown,checkboxes',
        ]);

        if ($request->choice_type == "multiple choice" || $request->choice_type == "dropdown" || $request->choice_type == "checkboxes"){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'choice_type' => 'required|in:short answer,paragraph,date,multiple choice,dropdown,checkboxes',
                'choices' => 'required|array',
            ]);
        };

        if(!$validator->fails() && $data_form && $data_form->creator_id == auth()->user()->id) {
            $is_required = $request->is_required;
            if ($is_required == 'true') {
                $is_required = 1;
            } else {
                $is_required = 0;
            }
            $data_question = [
                'form_id' => $form_id,
                'name' => $request->name,
                'choice_type' => $request->choice_type,
                'is_required' => $is_required,
            ];
            if ($request->choices){
                $data_question["choices"] = implode(', ', $request->choices);
            }
            $create_question = Question::create($data_question);
            return new ApiResource(200, 'Add question success', $create_question);
        } else if($validator->fails()) {
            return new ApiResource(422, 'Invalid field', $validator->messages());
        } else {
            return new ApiResource(403, 'Forbidden access', null);
        }
    }
    public function remove($slug, $question_id){
        $data_form = Form::where('slug', '=', $slug)->first();
        if ($data_form) {
            $form_id = $data_form->id;
            $invalid_question = Question::where('id', '=', $question_id)->first();
            if ($invalid_question && $data_form->creator_id == auth()->user()->id) {
                $delete_answer =  Answer::where('question_id', '=', $question_id)->delete();
                $delete_question = Question::where('id', '=', $question_id)->delete();
                return new ApiResource(200, 'Remove question success', true);
            } else if (!$invalid_question) {
                return new ApiResource(404, 'Question not found', null);
            } else {
                return new ApiResource(403, 'Forbidden access', null);
            };
        } else {
            return new ApiResource(404, 'Form not found', null);
        }
    }
}
