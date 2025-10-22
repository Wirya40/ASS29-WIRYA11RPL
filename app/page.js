"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Card, Row, Col, Typography, Spin, Tag, Button } from "antd";
import { ShoppingOutlined, ShoppingCartOutlined, StarFilled } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=12&sort=desc");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const customTheme = {
    token: {
      colorPrimary: "#ff6b00",
      borderRadius: 14,
      fontSize: 16,
      colorBgContainer: "#fffaf5",
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div
        style={{
          background: "linear-gradient(135deg, #fff5ec 0%, #fffaf5 100%)",
          minHeight: "100vh",
          padding: "60px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <Title
            level={2}
            style={{
              fontWeight: 700,
              fontSize: 36,
              color: "#ff6b00",
              textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <ShoppingOutlined /> Koleksi Produk Terbaru
          </Title>
          <Paragraph style={{ color: "#666", fontSize: 18 }}>
            Temukan produk populer dengan harga terbaik hari ini!
          </Paragraph>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <Spin size="large" />
            <p style={{ color: "#999", marginTop: 10 }}>Memuat data produk...</p>
          </div>
        ) : (
          <Row gutter={[32, 32]} justify="center">
            {products.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  hoverable
                  variant="borderless" // ✅ menggantikan bordered={false}
                  cover={
                    <div style={{ position: "relative" }}>
                      <img
                        alt={item.title}
                        src={item.thumbnail}
                        style={{
                          height: 220,
                          width: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: 14,
                          borderTopRightRadius: 14,
                          transition: "transform 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <Tag
                        color="orange"
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          fontWeight: 600,
                        }}
                      >
                        {item.category.toUpperCase()}
                      </Tag>
                    </div>
                  }
                  style={{
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                  }}
                >
                  <Title level={5} style={{ marginBottom: 4 }}>
                    {item.title}
                  </Title>
                  <Text type="secondary">{item.brand}</Text>
                  <div style={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
                    <StarFilled style={{ color: "#faad14", marginRight: 4 }} />
                    <Text>{item.rating}</Text>
                  </div>
                  <Paragraph style={{ fontSize: 14, color: "#666" }}>
                    {item.description.slice(0, 65)}...
                  </Paragraph>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 16,
                    }}
                  >
                    <Text strong style={{ fontSize: 18, color: "#ff6b00" }}>
                      ${item.price}
                    </Text>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<ShoppingCartOutlined />}
                      size="middle"
                    >
                      Beli
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </ConfigProvider>
  );
}
