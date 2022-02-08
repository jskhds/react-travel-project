import React from "react";
import styles from "./BusinessPartners.module.css"
import { Row, Col, Typography, Divider} from "antd"
import facebook from "../../assets/images/facebook-807588_640.png"
import youtube from "../../assets/images/icon-720944_640.png"
import Instagram from "../../assets/images/follow-826033_640.png"
import microsoft from "../../assets/images/microsoft-80658_640.png"
import { useTranslation } from "react-i18next";
const companies = [
    {title: "facebook", src: facebook},
    {title: "youtube", src: youtube},
    {title: "Instagram", src: Instagram},
    {title: "microsoft", src: microsoft}
    
]
export const BusinessPartners:React.FC = ()=>{
    const { t } = useTranslation();    
    return <>
    <Divider orientation="left">
        <Typography.Title>        
            {t("home_page.joint_venture")}
        </Typography.Title>
    </Divider>
    <Row>
        {companies.map((item,index)=>{
            return <Col span={6} key={`companies-${index}`}>
                <img src={item.src} className={styles.Img}/>
            </Col>

        })}
    </Row>
    </>
}