import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { axiosAuth } from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import axios from "axios";

const DetailForm = () => {
    const { slug } = useParams();
    const { token, user } = useAuth();

    const [DataState, setState] = useState({
        status: '',
        message: '',
        data: '',
        isLoading: true,
    });

    const [createQuestion, setCreateQuestion] = useState({
        status: '',
        message: '',
        data: '',
        dom_error: '',
    });

    const [response, setResponse] = useState('');

    const [isAdded, setIsAdded] = useState(false);
    const [choices_type, setChoicesType] = useState('');
    const [errorSubmit, setErrorSubmit] = useState({
        status: '',
        message: '',
    });

    const endpoint = 'v1/forms/' + slug;

    const getFormApi = () => {
        setState({ isLoading: true })
        axiosAuth(token).get(endpoint)
            .then(response => {
                setState({ status: response.data.status, message: response.data.message, data: response.data.data, isLoading: false });
            })
            .catch(error => {
                let status = error.response.data.status;
                let message = error.response.data.message;
                let dom = <div className='flex justify-center items-center gap-2 bg-red-100 p-2 rounded-lg border-2 border-red-400 text-red-400 font-bold'>
                    <Icon icon="line-md:alert-circle" color="#f87171" width="24" /><span>{message}</span>
                </div>;
                setCreateQuestion({ dom_error: dom, message: message, status: status });
                setState({ status: status, isLoading: false });
            });
    }

    const getResponseApi = () => {
        axiosAuth(token).get('v1/forms/' + slug + '/responses')
            .then(response => {
                setResponse(response.data.data.responses);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        setState({ isLoading: true });
        getFormApi();
        getResponseApi();
    }, []);

    const addQuestionHandler = () => {
        if (!isAdded) {
            setIsAdded(true);
        } else {
            setIsAdded(false);
        }
    }

    const handleChoiceType = (e) => {
        setChoicesType(e.target.value);
    }

    const createQuestionHandler = (e) => {
        e.preventDefault();
        let question_name = e.target.name.value;
        let choice_type = e.target.choice_type.value;
        let choices
        if (choice_type === "dropdown" || choice_type === "multiple choice" || choice_type === "checkboxes") {
            choices = e.target.choices.value.split(',');
        } else {
            choices = [];
        }
        let is_required = e.target.is_required.checked;

        let endpoint_created_question = 'v1/forms/' + slug + '/questions';

        setState({ isLoading: true });

        addQuestionHandler();

        axiosAuth(token).post(endpoint_created_question, {
            'name': question_name,
            'choice_type': choice_type,
            'choices': choices,
            'is_required': is_required
        })
            .then(response => {
                getFormApi();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleDeleteQuestion = (id) => {
        setState({ isLoading: true });
        let endpoint_deleteQuestion = 'v1/forms/member-stacks/questions/' + id;
        axiosAuth(token).delete(endpoint_deleteQuestion)
            .then(response => {
                getFormApi()
            })
            .catch(error => {
                console.log(error);
            });
    }

    
    const { data, isLoading, status, message } = DataState;
    
    const current_user = JSON.parse(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const answers = [];

        data.question.forEach((item) => {
            if (item.choice_type === 'checkboxes') {
                const values_array = Array.from(e.target.querySelectorAll(`[name="question_${item.id}[]"]:checked`)).map((checkbox) => checkbox.value);
                const value = values_array.join(',');
                if (value.length > 0) {
                    answers.push({ question_id: item.id, value });
                  }
            } else {
                const value = formData.get(`question_${item.id}`);
                if (value !== '' && value !== null) {
                    answers.push({ question_id: item.id, value });
                }
            }
        });

        axiosAuth(token).post('v1/forms/' + slug +'/responses', {
            'answers': answers
        })
        .then(response => {
            setErrorSubmit({status: response.data.status, message: response.data.message});
        })
        .catch(error => {
            console.log(error.response.data.status);
            setErrorSubmit({status: error.response.data.status, message: error.response.data.message});
        });
    }

    if (status === 200 && current_user.email === data.creator.email) {
        return (
            <>
                <Loading isLoading={isLoading} status={status} message={message} />
                <section className="ml-52 py-8 px-10">
                    <h1 className="font-bold text-2xl mb-8">Detailed Form</h1>
                    <div className="flex flex-col justify-center items-center">
                        {!isLoading ? (
                            <>
                                <div className="min-w-[50%]">
                                    <div className="mb-5">
                                        <h1 className="font-bold text-4xl">{data.name}</h1>
                                    </div>
                                    <div className="flex gap-8 items-center">
                                        <div className="flex justify-center items-center gap-3">
                                            <Icon icon="line-md:external-link-rounded" width="30" />
                                            <Link to={`/forms/${slug}`} className="text-sky-500 font-bold">formify.com/{slug}</Link>
                                        </div>
                                        <div className="flex justify-center items-center gap-3">
                                            <Icon icon="line-md:account" width="30" />
                                            {data.allowed_domains.join(',') !== '' ? data.allowed_domains.map((items) => (
                                                <span className="bg-slate-200 rounded-xl py-1 px-2 text-sm">{items}</span>
                                            ))
                                                : (
                                                    <span className="bg-sky-200 rounded-xl py-1 px-2 text-sm text-sky-800">All domain allowed</span>
                                                )}
                                        </div>
                                        <div className="flex justify-center items-center gap-3">
                                            <Icon icon="line-md:clipboard-arrow" width="30" />
                                            {data.limit_one_response === 1 ? (
                                                <span className="border-2 border-sky-200 text-sm py-1 px-2 rounded-xl text-sky-500">Limit One Response</span>
                                            ) : (
                                                <span className="border-2 border-slate-200 text-sm py-1 px-2 rounded-xl text-slate-500">No Limit</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <p className="font-bold text-xl">Description: </p>
                                        <p className="text-lg text-slate-500">{data.description}</p>
                                    </div>
                                    <div className="mt-8">
                                        <h1 className="font-bold text-xl mb-2">Question:</h1>
                                        <div className="flex flex-col gap-2">
                                            {data.question.length > 0 ? data.question.map((items) => (
                                                <div className="border-2 rounded-xl p-4">
                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-xl">{items.name}
                                                            {items.is_required === 1 ? (
                                                                <span className="text-red-500 font-bold"> *</span>
                                                            ) : null}
                                                        </h2>
                                                        <div className="flex gap-3 items-center">
                                                            <Icon icon="mi:delete" width="30" className="text-red-300 hover:text-red-500 transition-all cursor-pointer" onClick={() => handleDeleteQuestion(items.id)} />
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex">
                                                        {items.choice_type === "short answer" ? (
                                                            <input type="text" className="border-2 p-2 rounded-xl w-full" placeholder="Short answer" disabled />
                                                        ) : items.choice_type === "paragraph" ? (
                                                            <textarea type="text" className="border-2 p-2 rounded-xl w-full" placeholder="Paragraph" disabled></textarea>
                                                        ) : items.choice_type === "multiple choice" ? (
                                                            items.choices.split(',').map((choices_item) => (
                                                                <div className="flex items-center mr-5">
                                                                    <input type="radio" className="mr-2" disabled />
                                                                    <label>{choices_item}</label>
                                                                </div>
                                                            ))
                                                        ) : items.choice_type === "date" ? (
                                                            <input type="date" className="border-2 p-2 rounded-xl text-slate-500" disabled />
                                                        ) : items.choice_type === "checkboxes" ? (
                                                            items.choices.split(',').map((choices_item) => (
                                                                <div className="flex items-center mr-5">
                                                                    <input type="checkbox" className="mr-2" disabled />
                                                                    <label>{choices_item}</label>
                                                                </div>
                                                            ))
                                                        ) : items.choice_type === "dropdown" ? (
                                                            <select className="border-2 rounded-xl p-2 mt-2" disabled>
                                                                <option selected disabled>Select</option>
                                                                {items.choices.split(',').map((choices_item) => (
                                                                    <option type="checkbox" className="mr-2" disabled>{choices_item}</option>
                                                                ))}
                                                            </select>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            )) : null}
                                            {isAdded ? (
                                                <form method="POST" className="border-2 rounded-xl p-4 border-sky-200 flex flex-col gap-2" onSubmit={createQuestionHandler}>
                                                    <div>
                                                        <label>Question</label>
                                                        <input type="text" name="name" className="border-2 p-2 mt-2 rounded-xl w-full focus:border-sky-500 focus:outline-none transition-all" placeholder="Add question name" required />
                                                    </div>
                                                    <div className="mt-2 flex gap-3 justify-between">
                                                        <div className="w-full flex flex-col">
                                                            <label>Type</label>
                                                            <select name="choice_type" className="border-2 rounded-xl p-2 mt-2" onChange={handleChoiceType} required>
                                                                <option selected>Select question type</option>
                                                                <option value="short answer">Short answer</option>
                                                                <option value="paragraph">Paragraph</option>
                                                                <option value="date">Date</option>
                                                                <option value="multiple choice">Multiple Choice</option>
                                                                <option value="dropdown">Dropdown</option>
                                                                <option value="checkboxes">Checkboxes</option>
                                                            </select>
                                                        </div>
                                                        <div className="w-full">
                                                            <label>Option</label>
                                                            <div className="mt-2 flex items-center">
                                                                <input type="checkbox" value="true" name="is_required" className="appearance-none w-5 h-5 border-2 mr-3 rounded-lg checked:bg-sky-400 transition-all duration-300" />
                                                                <label>Required question</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {choices_type === "dropdown" || choices_type === "multiple choice" || choices_type === "checkboxes" ? (
                                                        <div>
                                                            <label>Choices</label>
                                                            <input type="text" name="choices" className="border-2 p-2 mt-2 rounded-xl w-full focus:border-sky-500 focus:outline-none transition-all" placeholder="Add choices, Example: choices1, choices2" required />
                                                        </div>
                                                    ) : null}
                                                    {createQuestion.dom_error}
                                                    <div className="flex justify-between mt-3">
                                                        <button onClick={addQuestionHandler} className="border-2 py-2 px-4 rounded-lg flex items-center gap-2 font-bold text-slate-500 hover:bg-slate-500 hover:text-white transition-all duration-300"><Icon icon="line-md:arrow-small-left" width="20" />Cancel</button>
                                                        <div className="flex gap-3">
                                                            <button type="reset" className="border-2 border-red-200 py-2 px-4 rounded-lg flex items-center gap-2 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">Reset</button>
                                                            <button type="submit" className="border-2 py-2 px-4 bg-sky-400 text-white border-sky-200 rounded-lg flex items-center gap-2 font-bold hover:bg-sky-500 transition-all duration-300">Create</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="border-2 rounded-xl p-4 flex flex-col justify-center items-center border-sky-200 text-sky-500 gap-2 cursor-pointer hover:bg-sky-500 hover:text-white transition-all" onClick={addQuestionHandler}>
                                                    <Icon icon="line-md:plus-circle" width="50" />
                                                    <p className="font-bold text-xl">Add question</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h1 className="font-bold text-xl mb-2">Response: <span className="text-slate-500">{response.length}</span></h1>
                                        <div className="flex flex-col gap-5">
                                            {response.length ? response.map((itemsResponse) => (
                                                <div className="border-2 rounded-xl p-4">
                                                    <div className="flex gap-2 items-center mb-3">
                                                        <Icon icon="line-md:account" width="50" />
                                                        <div className="flex flex-col">
                                                            <p className="text-xl">{itemsResponse.user.name}</p>
                                                            <p className="text-sm text-slate-500">{itemsResponse.user.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        {Object.keys(itemsResponse.answer).map((key) => (
                                                            <div className="border-2 rounded-xl p-4">
                                                                <h2 className="text-xl">{key}</h2>
                                                                <p className="mt-2">{itemsResponse.answer[key]}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )) : (<div className="border-2 rounded-xl p-4 flex flex-col justify-center items-center border-red-200 text-red-500 gap-2">
                                                <Icon icon="line-md:alert-circle" width="50" />
                                                <p className="font-bold text-xl">Not have any response yet!</p>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </section>
            </>
        )
    } else if (status === 403) {
        return (
            <>
                <section className="ml-52 py-8 px-10 flex justify-center items-center h-screen">
                    Forbidden
                </section>
            </>
        )
    } else {
        return (
            <section className="ml-52 py-8 px-10">
                <h1 className="font-bold text-2xl mb-8">Detailed Form</h1>
                <div className="flex flex-col justify-center items-center">
                    {!isLoading ? (
                        <>
                            <div className="min-w-[50%]">
                                <div className="mb-5">
                                    <h1 className="font-bold text-4xl">{data.name}</h1>
                                </div>
                                <div className="flex gap-8 items-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <Icon icon="line-md:external-link-rounded" width="30" />
                                        <Link to={`/forms/${slug}`} className="text-sky-500 font-bold">formify.com/{slug}</Link>
                                    </div>
                                    <div className="flex justify-center items-center gap-3">
                                        <Icon icon="line-md:account" width="30" />
                                        {data.allowed_domains.join(',') !== '' ? data.allowed_domains.map((items) => (
                                            <span className="bg-slate-200 rounded-xl py-1 px-2 text-sm">{items}</span>
                                        ))
                                            : (
                                                <span className="bg-sky-200 rounded-xl py-1 px-2 text-sm text-sky-800">All domain allowed</span>
                                            )}
                                    </div>
                                    <div className="flex justify-center items-center gap-3">
                                        <Icon icon="line-md:clipboard-arrow" width="30" />
                                        {data.limit_one_response === 1 ? (
                                            <span className="border-2 border-sky-200 text-sm py-1 px-2 rounded-xl text-sky-500">Limit One Response</span>
                                        ) : (
                                            <span className="border-2 border-slate-200 text-sm py-1 px-2 rounded-xl text-slate-500">No Limit</span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <p className="font-bold text-xl">Description: </p>
                                    <p className="text-lg text-slate-500">{data.description}</p>
                                </div>
                                <div className="mt-8">
                                    <h1 className="font-bold text-xl mb-2">Question:</h1>
                                    <form method="post" className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                        {data.question.length > 0 ? data.question.map((items) => (
                                            <div className="border-2 rounded-xl p-4">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-xl">{items.name}
                                                        {items.is_required === 1 ? (
                                                            <span className="text-red-500 font-bold"> *</span>
                                                        ) : null}
                                                    </h2>
                                                </div>
                                                <div className="mt-3 flex">
                                                    {items.choice_type === "short answer" ? (
                                                        <input type="text" name={`question_${items.id}`} className="border-2 p-2 rounded-xl w-full" placeholder="Short answer" />
                                                    ) : items.choice_type === "paragraph" ? (
                                                        <textarea type="text" name={`question_${items.id}`} className="border-2 p-2 rounded-xl w-full" placeholder="Paragraph"></textarea>
                                                    ) : items.choice_type === "multiple choice" ? (
                                                        items.choices.split(',').map((choices_item) => (
                                                            <div className="flex items-center mr-5">
                                                                <input type="radio" name={`question_${items.id}`} value={choices_item} className="mr-2" />
                                                                <label>{choices_item}</label>
                                                            </div>
                                                        ))
                                                    ) : items.choice_type === "date" ? (
                                                        <input type="date" name={`question_${items.id}`} className="border-2 p-2 rounded-xl text-slate-500" />
                                                    ) : items.choice_type === "checkboxes" ? (
                                                        items.choices.split(',').map((choices_item) => (
                                                            <div className="flex items-center mr-5">
                                                                <input type="checkbox" name={`question_${items.id}[]`} value={choices_item} className="mr-2" />
                                                                <label>{choices_item}</label>
                                                            </div>
                                                        ))
                                                    ) : items.choice_type === "dropdown" ? (
                                                        <select className="border-2 rounded-xl p-2 mt-2" name={`question_${items.id}`}>
                                                            <option selected disabled>Select</option>
                                                            {items.choices.split(',').map((choices_item) => (
                                                                <option className="mr-2" value={choices_item}>{choices_item}</option>
                                                            ))}
                                                        </select>
                                                    ) : null}
                                                </div>
                                            </div>
                                        )) : null}
                                        { errorSubmit.status === 422 ? (
                                            <div className="border-2 rounded-xl p-4 flex flex-col justify-center items-center border-red-200 text-red-500 gap-2">
                                                <Icon icon="line-md:alert-circle" width="50" />
                                                <p className="font-bold text-xl">{errorSubmit.message}</p>
                                            </div>
                                        ) : errorSubmit.status === 200 ? (
                                            <div className="border-2 rounded-xl p-4 flex flex-col justify-center items-center border-green-200 text-green-500 gap-2">
                                                <Icon icon="line-md:clipboard-to-clipboard-check-transition" width="50" />
                                                <p className="font-bold text-xl">{errorSubmit.message}</p>
                                            </div>
                                        ) : null }
                                        <div className="flex justify-end mt-3">
                                            <div className="flex gap-3">
                                                <button type="reset" className="border-2 border-red-200 py-2 px-4 rounded-lg flex items-center gap-2 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">Reset</button>
                                                <button type="submit" className="border-2 py-2 px-4 bg-sky-400 text-white border-sky-200 rounded-lg flex items-center gap-2 font-bold hover:bg-sky-500 transition-all duration-300">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </section>
        );
    }
}

export default DetailForm;