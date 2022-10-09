import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomeScreen from "./screens/homeScreen";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <main>
          <HomeScreen />
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
