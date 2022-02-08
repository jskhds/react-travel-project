//  详情页面评论组件
import React from "react";
import { Comment, Tooltip, List } from "antd"

// 组件接收列表型的数据 包含 author avatar content createDate
interface PropsType {
    data: {
        author: string;
        avatar: string;
        content: string;
        createDate: string
    }[];
}

export const ProductComments: React.FC<PropsType> = ({ data }) => {
    // 三层菜单
    return <List
        dataSource={data}
        itemLayout="horizontal"
        renderItem={(item) => {
            return <li>
                <Comment
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.createDate}
                />
            </li>
        }}
    >

    </List>
}

