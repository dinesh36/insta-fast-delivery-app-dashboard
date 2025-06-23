const debounce = (func: () => void, delay: number = 300): () => void => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
};

export default debounce;
