// 评论数据用的是 mockup
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Spin, Row, Col, Typography, Divider, Anchor, Menu } from "antd"
import styles from "./DetailPage.module.css"
import { Header, Footer, ProductIntro, ProductComments } from "../../components"
import { DatePicker } from 'antd';
import { commentMockData } from "./mockup"
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { productDetailSlice } from "../../redux/productDetail/slice"
const { RangePicker } = DatePicker;

export const DetailPage: React.FC = (): JSX.Element => {
  const { touristRouteId } = useParams();

  // const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);
  const loading = useSelector(state => state.productDetail.loading)
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector(state => state.productDetail.data)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      // action 和 reducer 都从 productDetailSlice 中来
      dispatch(productDetailSlice.actions.fetchStart())
      try {
        const { data } = await axios.get(
          `http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`
        )
        dispatch(productDetailSlice.actions.fetchSuccess(data))

      } catch (error) {
        dispatch(productDetailSlice.actions.fetchFail(error.message))
      }

    }
    fetchData()
  }, [])
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
  return <div>
    <Header />
    <div className={styles["page-content"]}>
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
          <Col span={11}><RangePicker open style={{ marginTop: 20 }} /></Col>
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
        <div dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}></div>


      </div>
      {/* 费用 */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>产品费用</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}></div>
      </div>
      {/* 预订须知 */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>预定须知</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}></div>
      </div>
      {/* 商品评价*/}
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation="center">
          <Typography.Title level={3}>产品评价</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments
            data={commentMockData}
          />

        </div>

      </div>
    </div>
    <Footer />
  </div>
}
