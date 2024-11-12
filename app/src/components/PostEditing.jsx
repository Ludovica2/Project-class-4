import { useState } from "react"
import ContentEditable from "react-contenteditable";

const PostEditing = () => {
    const [field, setField] = useState("Crea il tuo post...");

    const handleChange = (event) => {
        setField(event.target.value);
    }

    return (
        <>
            <div className="m-5 border border-gray-300 rounded">
                <div className="">
                    <h3 className="p-4">Aggiungi un post</h3>
                    <div className="w-full h-[1px] mb-5 bg-slate-200"></div>
                </div>
                <div className="border border-slate-400 m-4 p-1 h-16">
                    <ContentEditable onChange={handleChange} disabled={false} html={field}/>
                </div>
                <div className="flex justify-between mt-6 p-4 bg-slate-200">
                    <div>
                        <button className="p-2 mr-2">
                            <i className="fa-solid fa-camera text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                        </button>
                        <button className="p-2 mr-2">
                            <i className="fa-solid fa-video text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                        </button>
                        <button className="p-2 mr-2">
                            <i className="fa-solid fa-location-dot text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                        </button>
                    </div>                  
                    <button className="btn">Invia</button>
                </div>
            </div>
            
        </>
    )
}

export default PostEditing