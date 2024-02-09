import React, { ReactNode, useState } from "react";
import Navigation from "./Navigation";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import JoinGame from "./JoinGame"
import Cookies from "universal-cookie";


const Layout = ({ children,channel }) => {
  const api_key = "36pmgbqhc6m5";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  console.log(token);
  if (token) {    
    client.connectUser(
      {          
        id: cookies.get("userId"),
        name: cookies.get("username"),           
      },
      token
    )
    .then((user) => {
      setIsAuth(true);
    });

  }

  return (
    <div>
    <Navigation />
    <Chat client={client}>
          <JoinGame />
          {/* <button onClick={logOut}> Log Out</button> */}
        </Chat>
    <main>{children}</main>
  </div>
  );
};

export default Layout;
