import React , {Component} from "react";
import { Navigation } from "./components/Navigations/Navigation";
import { Logo } from "./components/Logo/Logo";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import  Register from "./components/Register/Register";

import  Signin  from "./components/Signin/Signin";
import { Rank } from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import {params} from './Particles/Particles';
import "./App.css";




const app = new Clarifai.App({
  apiKey: "72ca89f50bc54d7c9d4417f2a82bad75",
}); 

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxFaces: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data[0]._id,
        name: data[0].name,
        email: data[0].email,
      },
    });
    console.log(this.state.user);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifai = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifai.left_col * width,
      topRow: clarifai.top_row * height,
      rightCol: width - clarifai.right_col * width,
      bottomRow: height - clarifai.bottom_row * height,
    };
  };

  displayFaceBlock = (boxFaces) => {
    this.setState({ boxFaces: boxFaces });
    console.log(boxFaces);
  };

  onSubmitChange = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if(response){
          fetch("http://localhost:3002/api/v1/users/image/s", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              console.log(count);
              this.setState({
                user: {
                  entries: count,
                },
              });
            })
            .then(console.log(this.state.user.entries));
        }
        this.displayFaceBlock(this.calculateFaceLocation(response))
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
   
    return (
      <div>
        <Particles className="particles" params={params} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <>
            <Logo />
            <Rank name={this.state.user.name} entries ={this.state.user.entries}/>
            <ImageLinkForm
              inputChange={this.onInputChange}
              onSubmitt={this.onSubmitChange}
            />
            <FaceRecognition
              box={this.state.boxFaces}
              imageUrl={this.state.imageUrl}
            />
          </>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
