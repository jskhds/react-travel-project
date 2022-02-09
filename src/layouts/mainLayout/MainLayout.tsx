import React from "react";
import styles from "./MainLayout.module.css"
import { Header, Footer} from "../../components"

// In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: props.children
export const MainLayout: React.FC = ({ children }) => {
    return <>
         <Header />
         <div className={styles["page-content"]}>
            { children}
         </div>
         <Footer />
    </>
}