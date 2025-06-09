import React from "react";
import { Container, Image } from "react-bootstrap";
import bannerImage from "../images/maps.gif";
import profileImage from "../images/profile.png";

const BehindTheProject = () => {
  return (
    <div className="behind-the-project-page">
      <div
        className="banner-container"
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
          backgroundColor: "#333",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={bannerImage}
          alt="Banner"
          fluid
          style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
        />
        <div
          className="banner-text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 style={{ color: "#ddd" }}>Behind the Project</h1>
          <h2 style={{ color: "#ddd" }}>About the Creator</h2>
        </div>
      </div>

      <Container
        className="content-container"
        style={{ marginTop: "20px", paddingLeft: 0, position: "relative" }}
      >
          <div style={{ display: "flex", justifyContent: "flex-start", position: "relative" }}>
            <Image
              src={profileImage}
              alt="Profile"
              roundedCircle
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                marginLeft: "-150px",
                position: "absolute",
                top: "-120px",
                zIndex: 10,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "90px",
                left: "-150px",
                zIndex: 10,
                color: "#333",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              Mark Regie A. Magtangob
            </div>
            <div
              style={{
                position: "absolute",
                top: "130px",
                left: "-150px",
                zIndex: 10,
                color: "#666",
                fontWeight: "normal",
                fontSize: "1.2rem",
              }}
            >
              Student from Polytechnic University of the Philippines
            </div>
            <div style={{ display: "flex", position: "absolute", top: "170px", left: "-150px", zIndex: 10, gap: "20px" }}>
              <div
                style={{
                  color: "#555",
                  fontSize: "2rem",
                  fontWeight: "normal",
                  width: "470px",
                  minHeight: "200px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Personal Profile</span>
                <p style={{ whiteSpace: "pre-line", width: "90%", lineHeight: "1.5em", textAlign: "left" }}>
                  I am a third-year BSIT student at the Polytechnic University of the Philippines, Quezon City. I am continuously improving my skills in different areas of IT as I prepare for a career in the fast-changing tech industry.
                </p>
              </div>
              <div
                style={{
                  color: "#555",
                  fontSize: "2rem",
                  fontWeight: "normal",
                  width: "370px",
                  minHeight: "200px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  textAlign: "left",
               
                }}
              >
                <span style={{ fontWeight: "bold" }}>Technical Skills</span>
                <p style={{ whiteSpace: "pre-line", width: "90%", lineHeight: "1.5em", textAlign: "left" }}>
                  Front-end Development{"\n"}
                  Web Development{"\n"}
                  UI/UX Designer/System Designer{"\n"}
                  Scrum Development{"\n"}
                  Front-end Development{"\n"}
                  Low-Code Development
                </p>
              </div>
              <div
                style={{
                  color: "#555",
                  fontSize: "2rem",
                  fontWeight: "normal",
                  width: "850px",
                  minHeight: "200px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Skills and expertise</span>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div style={{ width: "30%" }}>
                    <span style={{ fontWeight: "normal" }}>Soft Skills:</span>
                    <p>
                      Teamwork and collaboration<br/>
                      Problem-solving<br/>
                      Time management<br/>
                      Creativity<br/>
                      Adaptability
                    </p>
                  </div>
                  <div style={{ width: "30%", textAlign: "left" }}>
                    <span style={{ fontWeight: "normal" }}>Tools and Software:</span>
                    <p>
                      Visual Studio Code, Visual Studio Community, Pycharm,<br/>
                      Figma, Canva, Lucidchart, Autodesk Sketchbook
                    </p>
                  </div>
                  <div style={{ width: "30%", textAlign: "left" }}>
                    <span style={{ fontWeight: "normal" }}>Programming Languages:</span>
                    <p>
                      HTML<br/>
                      CSS<br/>
                      JavaScript<br/>
                      C#<br/>
                      Python<br/>
                      Java
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "33rem",
                marginBottom: "2rem",
                position: "relative",
                left: "-150px",
                width: "1800px",
                minHeight: "150px",
                backgroundColor: "#d0d0d0",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                padding: "20px",
                color: "#333",
                fontSize: "1.8rem",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              This is the new long wide container placed under the three containers.
            </div>
          </div>
      </Container>
    </div>
  );
};

export default BehindTheProject;
