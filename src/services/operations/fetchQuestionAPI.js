import { toast } from "react-hot-toast";

import { FETCH_QUES_URL } from "../apis";

export const fetchQuestion = async (questionId) => {

    const FETCH_QUES_API = FETCH_QUES_URL + questionId;

    let result = null;

    const toastId = toast.loading("Fetching...");
    try {
        let response = await fetch(FETCH_QUES_API);
        response = await response.json();

        result = response[0]?.Question;

    } catch (error) {
        console.log("Error at fetching question>>>", error);
        toast.error("Failed to fetch question");
    }

    toast.dismiss(toastId);
    
    return result;
}