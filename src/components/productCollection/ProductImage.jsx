import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ProductImage = ({ id, size, imageSrc, price, title, history }) => {
  return (
    <Link to={`/productDetail/${id}`}>
      {size === "large" ? (
        <LazyLoadImage src={imageSrc} effect="blur" height={285} width={485} />
      ) : (
        <LazyLoadImage src={imageSrc} effect="blur" height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ¥ {price} 起
        </Typography.Text>
      </div>
    </Link>
  );
};
