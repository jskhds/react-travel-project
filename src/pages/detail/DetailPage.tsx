// 评论数据用的是 mockup
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, Typography, Divider, Anchor, Menu } from "antd";
import styles from "./DetailPage.module.css";
import {
  Header,
  Footer,
  ProductIntro,
  ProductComments,
} from "../../components";
import { DatePicker, Button, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"
import { commentMockData } from "./mockup";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  productDetailSlice,
  getProductDetail,
} from "../../redux/productDetail/slice";
import { MainLayout } from "../../layouts";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice"

const { RangePicker } = DatePicker;

export const DetailPage: React.FC = (): JSX.Element => {
  const { touristRouteId } = useParams();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useDispatch();

  const jwt = useSelector(s => s.user.token) as string
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProductDetail(touristRouteId));
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错:{error}</div>;
  }
  return (
    <div>
      <MainLayout>
        {/* 产品简介 与 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            {/* 产品详情组件 在 components 中 */}
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.shortDescription}
                price={product.price}
                coupons={product.coupons}
                points={product.points}
                discount={product.discount}
                rating={product.rating}
                // 注意这里的 picture 是走马灯，传入的是 url
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              {/* 购物车按钮 */}
              <Button
              style={{ marginTop: 50, marginBottom: 30, display: "block" }}
              type="primary"
              danger
              // 和 header 里面的 购物车 button loading 状态连接在一起才不会一直转圈，为什么？
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(
                  addShoppingCartItem({ jwt, touristRouteId: product.id })
                );
              }}
            >
                <ShoppingCartOutlined />
                添加商品
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key={"detailMenu1"}>
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key={"detailMenu2"}>
              <Anchor.Link href="#fees" title="产品费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key={"detailMenu3"}>
              <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key={"detailMenu4"}>
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};
