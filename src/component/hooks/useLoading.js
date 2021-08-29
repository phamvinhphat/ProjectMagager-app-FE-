import {useState} from "react";

const useLoading = () => {
    const [loading, setLoading] = useState(false);

    function onLoading() {
        setLoading(true);
    }

    function offLoading() {
        setLoading(false);
    }

    return {
        loading,
        onLoading,
        offLoading,
    };
};

export default useLoading;
