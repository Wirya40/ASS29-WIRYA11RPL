"use client";

import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  Card,
  Row,
  Col,
  Spin,
  Typography,
  Tag,
  message,
} from "antd";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FASHION + MAKEUP / BEAUTY categories
  const fashionBeautyCategories = [
    "beauty",
    "fragrances",
    "skin-care",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
    "womens-watches",
    "sunglasses",
  ];

  useEffect(() => {
    async function load() {
      try {
        // IMPORTANT: increase limit or fashion items don't show
        const res = await fetch(
          "https://dummyjson.com/products?sort=price&limit=200"
        );

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();

        // Filter fashion + makeup products
        const filtered = data.products.filter((item) =>
          fashionBeautyCategories.includes(item.category)
        );

        setProducts(filtered);
      } catch (err) {
        console.error(err);
        message.error("Error fetching products!");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4C72FF",
          borderRadius: 12,
          fontSize: 15,
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #eef2ff, #ffffff)",
          padding: "40px 70px",
        }}
      >
        <Title
          level={1}
          style={{
            textAlign: "center",
            marginBottom: 10,
            fontWeight: 800,
            background: "linear-gradient(to right, #4C72FF, #7F9BFF)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Fashion & Beauty Collection
        </Title>

        <Paragraph
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 40,
          }}
        >
          Fashion + Makeup products fetched using the DummyJSON Sort API.
        </Paragraph>

        {loading && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
            <Spin size="large" />
          </div>
        )}

        <Row gutter={[24, 24]} justify="center">
          {!loading &&
            products.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 12,
                    boxShadow:
                      "0 6px 18px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.03)",
                  }}
                  cover={
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        height: 250,
                        width: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    />
                  }
                >
                  <Title level={4}>{item.title}</Title>

                  <Paragraph ellipsis={{ rows: 2 }}>
                    {item.description}
                  </Paragraph>

                  <div>
                    <Tag color="blue">${item.price}</Tag>
                    <Tag color="green">⭐ {item.rating}</Tag>
                    <Tag color="purple">{item.category}</Tag>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </ConfigProvider>
  );
}
