import React from "react";
import styles from "./SideMenu.module.css"
import { sideMenuList } from "./mockup";
import { Menu } from "antd"
import { GifOutlined, GithubFilled } from "@ant-design/icons"
export const SideMenu: React.FC = () => {
    // 三层菜单
    return <Menu mode="vertical" className={styles["side-menu"]}>
        {sideMenuList.map((m, index) => {
            return <Menu.SubMenu
                key={`side-menu-${index}`}
                title={<span>  <GifOutlined />  {m.title} </span>}>
                {m.subMenu.map((sm, smindex) => (
                    <Menu.SubMenu
                        key={`sm-menu-${smindex}`}
                        title={<span><GifOutlined />{sm.title}</span>}>
                        {sm.subMenu.map((sms, smsindex) => (
                            <Menu.Item
                                key={`sms-menu-${smsindex}`}
                                title={<span><GithubFilled />{sms}</span>}>

                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ))}

            </Menu.SubMenu>
        })}
    </Menu>
}