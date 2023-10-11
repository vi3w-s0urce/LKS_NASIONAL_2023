import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { axiosAuth } from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";

const DetailForm = () => {
    const { slug } = useParams();
    const { token } = useAuth();

    const [DataState, setState] = useState({
        status: '',
        message: '',
        data: '',
        isLoading: true,
    });

    const endpoint = 'v1/forms/' + slug;

    useEffect(()=> {
        setState({isLoading: true});

        axiosAuth(token).get(endpoint)
            .then(response => {
                setState({status: response.data.status, message: response.data.message, data: response.data.data, isLoading: false});
            })
            .catch(error => {
                setState({ isLoading: false });
            });
    }, []);

    const { data, isLoading } = DataState;
    
    if (!isLoading) {
        return (
            <section className="ml-52 py-8 px-10">
                <h1 className="font-bold text-2xl mb-8">Detailed Form</h1>
                <div className="flex flex-col justify-center items-center">
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
                                { data.allowed_domains.join(',') !== '' ? data.allowed_domains.map((items) => (
                                    <span className="bg-slate-200 rounded-xl py-1 px-2 text-sm">{items}</span>
                                ))
                                : (
                                    <span className="bg-sky-200 rounded-xl py-1 px-2 text-sm text-sky-800">All domain allowed</span>
                                )}
                            </div>
                            <div className="flex justify-center items-center gap-3">
                                <Icon icon="line-md:clipboard-arrow" width="30" />
                                { data.limit_one_response === 1 ? (
                                    <span className="border-2 border-sky-200 text-sm py-1 px-2 rounded-xl text-sky-500">Limit One Response</span>
                                ) : (
                                    <span className="border-2 border-slate-200 text-sm py-1 px-2 rounded-xl text-slate-500">No Limit</span>
                                ) }
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="font-bold text-xl">Description: </p>
                            <p className="text-lg text-slate-500">{data.description}</p>
                        </div>
                        <div className="mt-8">
                            <h1 className="font-bold text-xl mb-2">Question:</h1>
                            <div className="flex flex-col gap-2">
                            { data.question.length > 0 ? data.question.map((items) => (
                                <div className="border-2 rounded-xl p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl">{items.name}</h2>
                                        <div className="flex gap-3 items-center">
                                            <Icon icon="mi:delete" width="30" className="text-red-300 hover:text-red-500 transition-all cursor-pointer"/>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        { items.choice_type === "short answer" ? (
                                            {/* <input type="text" className="border-2 p-2 rounded-xl w-full" placeholder="Short answer" disabled /> */}
                                            <input type="date" />
                                        ) : items.choice_type === "paragraph" ? (
                                            <textarea type="text" className="border-2 p-2 rounded-xl w-full" placeholder="Paragraph" disabled></textarea>
                                        ) : null}
                                    </div>
                                </div>
                            )) : null }
                            <div className="border-2 rounded-xl p-4 flex flex-col justify-center items-center border-sky-200 text-sky-500 gap-2 cursor-pointer hover:bg-sky-500 hover:text-white transition-all">
                                <Icon icon="line-md:plus-circle" width="50"/>
                                <p className="font-bold text-xl">Add Question</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default DetailForm;