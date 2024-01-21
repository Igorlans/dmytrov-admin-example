import {create} from "zustand";

const useLoading = create((set) => ({
	isLoading: false,
	setIsLoading: (isLoadingBool) =>
		set(() => ({
			isLoading: isLoadingBool
		})),
}));

export default useLoading;