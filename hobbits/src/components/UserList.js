import React, { Component } from "react";
import axios from "axios";

export default class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:4001/api/users`).then(res => {
      this.setState({ users: res.data });
      console.log(this.state.users);
    });
  }
  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <div className="badge">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    );
  }
}
