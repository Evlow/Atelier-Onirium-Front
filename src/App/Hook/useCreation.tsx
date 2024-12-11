import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/configureStore";
import { creationSelectors, fetchCreationsAsync } from "../../Components/Creations/creationSlice";

export default function useCreations() {
    const creations = useAppSelector(creationSelectors.selectAll);
    const {creationsLoaded} = useAppSelector(state => state.creation);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!creationsLoaded) dispatch(fetchCreationsAsync());
    }, [creationsLoaded, dispatch])


    return {
        creations,
        creationsLoaded
    }
}
