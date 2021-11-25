import { Row, Col, Typography, Spin } from "antd";
import { useTranslation } from "react-i18next";

import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";

import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import {
  ProductCollection,
  BusinessPartners,
  SideMenu,
  Carousel,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecommendProductList } from "../../redux/reducer/recommendProduct/slice";

// 注意：在 Home组件中引入antd样式文件，如果有些用户比较聪明，没有访问主页，而是直接使用路由访问了其它页面，那么antd的样式就会丢失；
import "antd/dist/antd.css";
// 最好放在组件中，如果放在index.js/app.js则会延长加载index.js/App.js的时间（即延长白屏时间）
import "react-lazy-load-image-component/src/effects/blur.css";

export const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.recommendProduct.loading);
  const error = useSelector((state) => state.recommendProduct.error);
  const recommendProductList = useSelector(
    (state) => state.recommendProduct.recommendProductList
  );

  useEffect(() => {
    dispatch(getRecommendProductList());
  }, []);

  if (loading) {
    return (
      <Spin
        size={"large"}
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
    return <div>网站出错：{error}</div>;
  }
  return (
    <MainLayout>
      <Row style={{ marginTop: 20 }}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Row>
      <ProductCollection
        title={
          <Typography.Title level={3} type="warning">
            {t("home_page.hot_recommended")}
          </Typography.Title>
        }
        sideImage={sideImage}
        products={recommendProductList[0].touristRoutes}
      />
      {/* <LazyLoad height={600} once={true}>
      </LazyLoad> */}
      <ProductCollection
        title={
          <Typography.Title level={3} type="danger">
            {t("home_page.new_arrival")}
          </Typography.Title>
        }
        sideImage={sideImage2}
        products={recommendProductList[1].touristRoutes}
      />
      {/* <LazyLoad height={600} once={true}>
      </LazyLoad> */}
      <ProductCollection
        title={
          <Typography.Title level={3} type="success">
            {t("home_page.domestic_travel")}
          </Typography.Title>
        }
        sideImage={sideImage3}
        products={recommendProductList[2].touristRoutes}
      />
      <BusinessPartners />
    </MainLayout>
  );
};

export default Home;
