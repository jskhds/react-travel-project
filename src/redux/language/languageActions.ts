// 声明 action 字符串为常量 同时要 export 让外部访问
export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";


//  定义 action 的接口
interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE,
    payload: "zh" | "en"
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE,
    payload: { name: string, code: string }
}


export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction


// 提取 action 对象
export const changeLanguageActionCreator = (languageCode: "zh" | "en"): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode
    }
}

// 
export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code }
    }
}