import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@/layouts/Breadcrumbs/Breadcrumbs";
import { MainApiRequest } from "@/services/MainApiRequest"; // Thay thế với API thực tế của bạn
import "./ProfileUser.scss";
import userImg from "@/assets/cus1.jpg";

const ProfileUser = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | File>("");
  const [user, setUser] = useState({ imageUrl: "" });

  // Lấy thông tin người dùng từ API khi component mount
  const fetchUserProfile = async () => {
    try {
      const response = await MainApiRequest.get("/auth/callback");
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setAddress(response.data.data.address);
      setPhone(response.data.data.phone);
      setImage(response.data.data.image);
      setId(response.data.data.id);
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Cập nhật thông tin người dùng
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      email,
      name,
      address,
      phone,
      // image
    };
    try {
      await MainApiRequest.put(`/user/${id}`, updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setUser({ ...user, imageUrl: URL.createObjectURL(file) }); // Thay thế ảnh hiện tại bằng URL tạm
      setImage(file); // Lưu ảnh để upload sau
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image); // Gửi ảnh thực lên server
      try {
        const response = await MainApiRequest.post("/upload-avatar", formData);
        if (response.status === 200) {
          alert("Image uploaded successfully!");
          setUser({ ...user, imageUrl: response.data.imageUrl }); // Cập nhật ảnh từ server
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };


  return (
    <>
      <Breadcrumbs title="Profile User" pagename="Profile User" />
      <section className="profile-section py-5 d-flex justify-content-center align-items-center">
        <Card className="shadow-sm p-4 w-50 ">
          <Card.Header className="border-bottom pb-3">
            <h3 className="h4 font-bold m-0">My Profile</h3>
          </Card.Header>
          <Card.Body>
            <div className="profile-img-container">
              <img
                src={user.imageUrl || userImg}
                alt="Profile"
                className="profile-img"
              />
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image-upload-input"
                  className="d-none"
                />
                <Button
                  variant="primary"
                  onClick={() => document.getElementById("image-upload-input")?.click()}
                  className="upload-btn"
                >
                  Upload Image
                </Button>

              </div>
            </div>
            <hr />
            <Form onSubmit={handleUpdateProfile}>
              <Form.Group controlId="email" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="name" className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="address" className="mb-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="phone" className="mb-4">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Button
                className="primaryBtn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </>
  );
};

export default ProfileUser;
