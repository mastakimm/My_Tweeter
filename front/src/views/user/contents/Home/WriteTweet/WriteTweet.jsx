import {useRef, useState} from 'react'
import DefaultPP from "@/assets/temps/default_pp.png"
import {EmojiSvg, GifSvg, ImageSvg, MicroSvg} from "@/assets/write_tweet/index.js";
import {Button} from "@/components/ui/button.jsx";
import {v4 as uuidv4} from "uuid";
import {Link} from "react-router-dom";

import { tweetService } from "@/_services";

export const WriteTweet = ({compose}) => {
    const [files, setFiles] = useState([]);
    const [textContent, setTextContent] = useState("");
    const spanRef = useRef(null);
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(!textContent.length) return;

        const formData = new FormData();
        formData.append("text", textContent);

        // Ajouter chaque fichier à FormData
        files.forEach((file, index) => {
            formData.append(`file[${index}]`, file);
        });

        tweetService.newTweet(formData)
        setTextContent("");
        spanRef.current.textContent = "";
        setFiles([]);

    }

    const handleInputSpan = () => {
        setTextContent(spanRef.current.textContent);
    }
    const handleInputFileChange = (e) => {
        if (!e.target.files.length || files.length >= 4) return;

        const allowedExtensions = ["png", "jpeg", "jpg", "gif"];
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) return;

        file.url = URL.createObjectURL(file);
        setFiles([...files, file]);
    }
    console.log(files)
    return (
        <form encType="multipart/form-data" className={`${!compose ? "border-b border-gray-300 dark:border-gray-700 min-h-[7.5rem] max-h-[100vh] p-4" : "backdrop-blur-sm p-5 absolute bg-white dark:bg-black top-[20%] left-[20%] border w-[45rem] rounded-2xl z-10"}`}
              onSubmit={handleOnSubmit}>
            <div className={"flex"}>
                <Link to={"/profile/user"} className={"h-fit w-12 min-w-12 hover:opacity-90"}>
                    <img src={DefaultPP} alt="pp user" className={"w-100 rounded-full "}/>
                </Link>
                <div className={`flex-col min-w-[calc(100%_-_3rem)] w-[calc(100%_-_3rem)] pl-2  min-h-10 ${compose &&  "min-h-56" }`}>
                    <div className="relative">
                        <span onInput={handleInputSpan} ref={spanRef} contentEditable="true" className="text-xl relative outline-0 block w-full bg-transparent rounded py-1 px-2"></span>
                        {!textContent &&
                            <span className="text-xl outline-0 absolute top-1 left-2 text-gray-400 pointer-events-none" aria-hidden="true">Quoi de neuf ?!</span>}
                    </div>
                    <div className={"flex flex-wrap gap-3 mt-3 "}>
                        {files.map((file) => (
                            files.length === 1 ? (
                                    <img key={uuidv4()} className={"object-cover w-100 rounded-2xl border-gray-300 border dark:border-none"} src={file.url} alt=""/>) :
                                (<img key={uuidv4()} className={"object-cover w-[47.7%] max-h-[15rem] rounded-2xl border-gray-300 border dark:border-none"} src={file.url} alt=""/>)
                        ))}
                    </div>
                </div>
            </div>
            <div className={`flex border-gray-300 dark:border-gray-700 border-t justify-between p-2 mt-3 gap-x-4 items-center`}>
                <div className={"flex p-2 gap-x-4"}>
                    <label htmlFor={"files"}>
                        <input  onChange={handleInputFileChange} type="file" id={"files"} className={"w-0 h-0 hidden"}/>
                        <ImageSvg cursor={"cursor-pointer"} width={"1.4rem"} fill={"none"}/>
                    </label>
                    <GifSvg cursor={"cursor-pointer"} width={"1.4rem"} fill={"none"}/>
                    <EmojiSvg cursor={"cursor-pointer"} width={"1.4rem"} fill={"none"}/>
                    <MicroSvg cursor={"cursor-pointer"} width={"1.3rem"} fill={"none"}/>
                </div>
                <Button variant={'yz'} className={`text-white text-md ${!textContent ? "opacity-70 hover:cursor-not-allowed hover:bg-blue-500" : "opacity-100 hover:cursor-pointer"}`}>Poster</Button>
            </div>
        </form>
    )
}
