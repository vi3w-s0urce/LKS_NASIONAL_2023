import { Link } from "react-router-dom";

const Card = (props) => {
    const { name, slug, desc, id } = props;
    return (
        <div key={id} className="shadow-xl bg-white border-2 border-slate-200 hover:border-sky-200 p-5 rounded-xl hover:shadow-sky-200 transition-all duration-300">
            <div className="mb-3">
                <p className="font-bold text-2xl mb-1">{name}</p>
                <p className="text-slate-500 text-sm">{slug}</p>
            </div>
            <div>
                <p>{desc}</p>
            </div>
            <div className="mt-4 flex flex-row-reverse">
                <button className="font-bold border-2 border-slate-200 p-2 rounded-xl hover:bg-sky-400 hover:text-white transition-all duration-300">
                    <Link to={`/forms/${slug}`}>View Form</Link>
                </button>
            </div>
        </div>
    );
}

export default Card