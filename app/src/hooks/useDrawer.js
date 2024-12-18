import { useDispatch, useSelector } from "react-redux"
import { setIsOpenReviewDrawer } from "../store/slices/drawerSlice";

const drawerMAP = {
    review: {
        name: "isOpenReviewDrawer",
        action: setIsOpenReviewDrawer,
    }
}

export const useDrawer = (type) => {
    const { name, action } = drawerMAP[type];

    const dispatch = useDispatch();
    const isOpenDrawer = useSelector((state) => state.drawer[name]);

    const setIsOpenDrawer = (value) => {
        dispatch(action(value));
    }

    return [isOpenDrawer, setIsOpenDrawer];
}