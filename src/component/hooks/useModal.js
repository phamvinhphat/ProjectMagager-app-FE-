import {useState} from "react";

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    const onShowing = () => {
        setIsShowing(true);
    };

    const offShowing = () => {
        setIsShowing(false);
    };

    return {
        isShowing,
        toggle,
        onShowing,
        offShowing,
    };
};

export default useModal;
