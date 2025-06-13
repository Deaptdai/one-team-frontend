import myAxios from "../plugins/myAxios";
import { getCurrentUserState, setCurrentUserState } from "../states/user";

export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState();
    if (currentUser) {
        return currentUser;
    }
    //不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.data.code === 200 && res.data.data) {
        // 更新当前用户状态
        setCurrentUserState(res.data.data);
        return getCurrentUserState();
    }
    return null;
}

