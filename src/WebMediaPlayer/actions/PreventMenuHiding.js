const preventMenuHiding = (state) => {
    return {
        ...state,
        allowMenuHiding: false,
    };
}

export default preventMenuHiding;