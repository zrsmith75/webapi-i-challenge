import React, { Component } from "react";
import { User } from "./User";
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
          <User user={user} key={user.id} />
        ))}
      </div>
    );
  }
}
