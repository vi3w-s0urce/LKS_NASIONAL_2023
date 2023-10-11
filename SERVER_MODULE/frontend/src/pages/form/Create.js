import { Icon } from "@iconify/react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { axiosAuth } from "../../api/axiosConfig";
import Loading from "../../components/Loading";

const Create = () => {

    const [responseState, setState] = useState({
        status: '',
        message: '',
        data: '',
        dom_error: '',
        isLoading: false,
    });

    const { token } = useAuth();
    const navigate = useNavigate();

    let dom;

    const handleSubmit = (e) => {
        e.preventDefault();

        let name = e.target.name.value;
        let slug = e.target.slug.value;
        let description = e.target.description.value;
        let allowed_domains = e.target.allowed_domains.value.split(",");
        let limit_one_response = e.target.limit_one_response.checked;

        setState({ isLoading: true });

        axiosAuth(token).post('v1/forms', {
            name: name,
            slug: slug,
            description: description,
            allowed_domains: allowed_domains,
            limit_one_response: limit_one_response,
        })
            .then(response => {
                setState({ isLoading: false, status: response.data.status, message: response.data.message })
                setTimeout(()=> {
                    navigate('/');
                }, 2000);
            })
            .catch(error => {
                let message = error.response.data.message;
                dom = <div className='flex justify-center items-center gap-2 bg-red-100 p-2 rounded-lg border-2 border-red-400 text-red-400 font-bold w-1/2'>
                        <Icon icon="line-md:alert-circle" color="#f87171" width="24" /><span>{message}</span>
                      </div>;
                setState({ isLoading: false, status: error.response.data.status, message: error.response.data.message, dom_error: dom })
            })
    };

    return (
        <>
            <Loading isLoading={responseState.isLoading} status={responseState.status} message={responseState.message} />
            <section className="ml-52 py-8 px-10">
                <h1 className="font-bold text-2xl mb-8">Create Form</h1>
                <form method="POST" className="flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-1/2">
                        <h1 className="text-2xl font-bold">Form</h1>
                        <h1 className="text-slate-400">Silahkan isi untuk membuat form</h1>
                    </div>
                    <div className="flex gap-5 w-1/2">
                        <div className="flex flex-col w-1/2">
                            <label className="mb-2">Name <span className="text-red-500 font-bold">*</span></label>
                            <input type="text" className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none transition-all duration-300' name="name" placeholder="Add form name" required />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="mb-2">Slug <span className="text-red-500 font-bold">*</span></label>
                            <input className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none transition-all duration-300' name="slug" placeholder="Example: this-is-slug" required />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="mb-2">Description <span className="text-red-500 font-bold">*</span></label>
                        <input type="text" className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none transition-all duration-300' name="description" placeholder="Add form description" required />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="mb-2">Allowed Domains</label>
                        <input type="text" className='border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none transition-all duration-300' name="allowed_domains" placeholder="Example: wordskill.com, webtech.id" />
                    </div>
                    <div className="flex items-center w-1/2">
                        <input type="checkbox" value="true" name="limit_one_response" className="appearance-none w-5 h-5 border-2 mr-3 rounded-lg checked:bg-sky-400 transition-all duration-300" />
                        <label>Limit One Response</label>
                    </div>
                    {responseState.dom_error}
                    <div className="flex justify-between w-1/2">
                        <a href="/" className="border-2 py-2 px-4 rounded-lg flex items-center gap-2 font-bold text-slate-500 hover:bg-slate-500 hover:text-white transition-all duration-300"><Icon icon="line-md:arrow-small-left" width="20" />Cancel</a>
                        <div className="flex gap-3">
                            <button type="reset" className="border-2 border-red-200 py-2 px-4 rounded-lg flex items-center gap-2 font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">Reset</button>
                            <button type="submit" className="border-2 py-2 px-4 bg-sky-400 text-white border-sky-200 rounded-lg flex items-center gap-2 font-bold hover:bg-sky-500 transition-all duration-300">Create</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Create;