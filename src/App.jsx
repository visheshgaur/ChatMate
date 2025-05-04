
// import { useState } from 'react'
// import './App.css'
// import { useRef } from 'react';
// import { useEffect } from 'react';
// import { ZIM } from 'zego-zim-web';

// function App() {
//    const [zimInstance,setZimInstance]=useState(null);
//    const [userInfo,setUserInfo]=useState(null);
//    const[messages,setMessages]=useState([]);
//    const[messageText,setMessageText]=useState('');
//    const[isLoggedIn,setIsLoggedIn]=useState(false);
//    const[selectedUser,setSelectedUser]=useState("vishesh");

//    const appID=217988202;
//    const tokenA="04AAAAAGgYYFwADIYWn+unELzICUejtwCxK0N8v8yUjTxEEamVmkc+RTDRDATkdZ3K5NJ7y5+UQc4ewsVmsXp3xLVCDDH0vqaI50qENR3Ag3LHJmIyTmGtgozITpE9aVaqxTG+56oHFf9mBG0LAxJdPjfSffxikaykPQ7e2W2vQ6St6IKapIxH4m4rwdk/+PAq51w3J7MIU3OdMpM9xLZxeNHpm5HhmScS693sOoxYJjS6LJmqCzQd6jG+DuFXeAxi2lEZOyuU6otbAQ==";
//    const tokenB="04AAAAAGgYYIQADLqruYKijqEQ51deQACwlvpyuVDrjmasXn6zICrm/mDjtJzMcCLCFAoSZZYK2lur3awG3qAxR9qmbwn6I14DUMMXLLonxkXzKbppmOh9nspymExSXEBNo/7u8CVDXxp9MKYP/D2VSVmfTzZNsBd/ztrZTsaUu1n/OA3Hq276rmmq7UNepJ8JN1zBQUPAYN1p6LxR4IZ9Z13z1thBn3brlj2CeYwJ9fThLpzn6Te/puyN1iISkrPZFsSDYjljYh4B";
//    const messageEndRef=useRef(null);
//    useEffect(()=>{
//     const instance=ZIM.create({appID});
//     setZimInstance(instance);
//     instance.on('error',(zim,errorInfo)=>{
//       console.log('Error',errorInfo.code,errorInfo.message);
//        });
//        instance.on('connectionStateChanged',(zim, { state, event })=>{
//         console.log('connectionStateChanged', state, event );
        
//     });
//     instance.on('peerMessageReceived',(zim, { messageList})=> {
//      setMessages(prevMessages=>[...prevMessages,...messageList])

//   });
//   instance.on('tokenWillExpire', (zim, { second })=> {
//     console.log('tokenWillExpire in', second);
//     // You can call the renewToken method to renew the token. 
//     // To generate a new Token, refer to the Prerequisites.
//     zim.renewToken(selectedUser==="vishesh"?tokenA:tokenB)
//         .then(()=>{
//           console.log("token renewed");
          
//             // Renewed successfully.
//         })
//         .catch(()=>{
//           console.log("renewed failed");
          
//             // Renew failed.
//         })
// });
//   return(
//     instance.destroy()
//   )
//    },[]);
//    useEffect(()=>{
//     if(messageEndRef.current){
//       messageEndRef.current.scrollIntoView({behaviour:"smooth"})
//     }
//    },[messages])

//    const handleLogin=()=>{
//     const info={userId:selectedUser,userName:selectedUser==="vishesh"?'Client A':'Client B'};
//     setUserInfo(info);
//     const loginToken=selectedUser==="vishesh"?tokenA:tokenB;
//     if(zimInstance){
//       zimInstance.login({info,loginToken})
//       .then(()=>{
//         setIsLoggedIn(true);
//         console.log(`${info.userName} login successfully`);
        
//       })
//       .catch((err)=>{
//         console.log("login failed",err);
        
//       })
//     }
//     else{
//       console.log("zim instance not ready yet")
//     }
//    }
//    const handleSendMessage=()=>{
//     if(!isLoggedIn){
//       console.log("user not logged in");
//       return;
      
//     }
//     const toConversationID=selectedUser==="vishesh"?"vishesh":"utkarsh";
//     const conversationType=0;
//     const messageTextObj={
//       type:1,
//       message:messageText,
//       extendedData:''
//     };
//     const config={
//       priority:1
//     }
//     if(!zimInstance){
//       return;
//     }
//     zimInstance.sendMessage(messageTextObj, toConversationID, conversationType, config)
//     .then(function ({ message }) {
//       setMessages(prevMessages=>[...prevMessages,message])
//       console.log("message sent successfully");
      
//         // Message sent successfully.
//     })
//     .catch(function (err) {
//       console.log("error in sending message",err);
      
//         // Failed to send a message.
//     });
//     setMessageText('');
//     const formatTime=(timestamp)=>{
//       const date=new Date(timestamp);
//       date.toLocaleTimeString([],{
//         hour:'2-digit',minute:'2-digit'
//       })
//     }
//    }
//   return (
//     <>
//      <div className="text-3xl font-bold underline text-center mt-10 bg-red-50">
//      <h1>Zego cloud chat app</h1>
//      {!isLoggedIn?(
//       <div>
//         <h2>select user</h2>
//         <select onChange={(e)=>{setSelectedUser(e.target.value)}} value={selectedUser}>
//           <option value="vishesh">vishesh</option>
//           <option value="utkarsh">utkarsh</option>
//         </select>
//         <button onClick={handleLogin}>Login</button>
//         </div>
//      ):(
//       <div>
//         <h2>Chatting as {userInfo.userName} with {selectedUser==="vishesh"?"Client B":"Client A"}</h2>
//         <div>
//           {messages.map((msg,i)=>{
//             const isOwnMessage=msg.senderUserID===userInfo.userID;  
//             return(
//               <div key={i} className='flex ' style={{justifyContent:isOwnMessage?'flex-end':'flex-start'}}>
//                 <div style={{background:isOwnMessage?'#dcf8c6':'#fff',color:'#000'}}>
//                     <div>{msg.message}</div>
//                     <div>{formatTime(msg.timestamp)}</div>
//                 </div>

//               </div>

              
//             )
//           })}
//           <div ref={messageEndRef}></div>
//           <div>
//             <input type='text' placeholder='enter your message' value={messageText} onChange={(e)=>setMessageText(e.target.value)} ></input>
//           <button onClick={handleSendMessage}> SEND</button>
//           </div>
//         </div>
//       </div>
//      )}
//     </div>
//     </>
//   )
// }

// export default App
import { useState, useRef, useEffect } from 'react';
import { ZIM } from 'zego-zim-web';

function App() {
  const [zimInstance, setZimInstance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState('vishesh');


  // const appID = 217988202;
  // const tokenA = "04AAAAAGgYgIUADO4lUpH1NRfvW+0J0wCwI2p1by/MhNkcyMnpPQ6PEpY08nQcJqY/gHSqkaNGPxxRVLqNJ/axYFbsVP90734iRzIEBOagDRvC9NDxUQDGsLL8Cw+iV3zREaQ5+34r0jZDBmE0Twy1ARl/eUT7wC9IMaxD1twAuEEsH76ODKPAEJjUQJV33mkkjkMVzc2Yl1a0QILQDWA4q2TEQTv+o8KGX3MgrRjgRTr3RvdWcRjS8v/SJ1bUMYfZFv1yMC9VVXkB";
  // const tokenB = "04AAAAAGgYgKMADCCsgGqmuCwmj4q9IACxc1McSThOCD9kKiHDi3jJOt4gcIl2O8Gj9q2rezeubBr9GGsMfnZU+brkqKRhM4OychXqp9BenSl8WiHqpg5qUGKNEj+SelxthYML1vijBISL+/N5QXuKs67beJjLqMwkzPzrcFUJ7UN05wG8a4SEhMMw44vRT+s0PQI+vxqU+ZuGskHNGKlSeR2CCeNveYjlQOe+p4QNKDj81BpMcjB/EPXrVFXY2gUYQ3saXIcrQ1BdAQ==";
  const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
  const tokenA = import.meta.env.VITE_ZEGO_TOKEN_A;
  const tokenB = import.meta.env.VITE_ZEGO_TOKEN_B;
  
  const messageEndRef = useRef(null);

  useEffect(() => {
    const instance = ZIM.create({ appID });
    setZimInstance(instance);

    instance.on('error', (zim, errorInfo) => {
      console.log('Error', errorInfo.code, errorInfo.message);
    });

    instance.on('connectionStateChanged', (zim, { state, event }) => {
      console.log('connectionStateChanged', state, event);
    });

    instance.on('peerMessageReceived', (zim, { messageList }) => {
      setMessages((prevMessages) => [...prevMessages, ...messageList]);
    });

    instance.on('tokenWillExpire', (zim, { second }) => {
      console.log('tokenWillExpire in', second);
      zim
        .renewToken(selectedUser === 'vishesh' ? tokenA : tokenB)
        .then(() => console.log('token renewed'))
        .catch(() => console.log('token renew failed'));
    });

    return () => {
      instance.destroy();
    };
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // const handleLogin = () => {
  //   const info = {
  //     userID: selectedUser,
  //     userName: selectedUser === 'vishesh' ? 'Client A' : 'Client B',
  //   };
  //   setUserInfo(info);
  //   const loginToken = selectedUser === 'vishesh' ? tokenA : tokenB;
  //   if (zimInstance) {
  //     console.log("ziminstance=",zimInstance)
  //     console.log(info);
  //     console.log(loginToken);
  //     zimInstance
  //     .login({ userInfo: info, token: loginToken })
     
  //     .then(() => {
        
  //         setIsLoggedIn(true);
  //         console.log(`${info.userName} logged in successfully`);
  //       })
  //       .catch((err) => {
  //         console.log("hello");
          
  //         console.log('Login failed', err);
  //       });
  //   } else {
  //     console.log('ZIM instance not ready yet');
  //   }
  // };
  const handleLogin = () => {
    const info = {
      userID: selectedUser,
      userName: selectedUser === 'vishesh' ? 'Client A' : 'Client B',
    };
    setUserInfo(info);
    const loginToken = selectedUser === 'vishesh' ? tokenA : tokenB;
  
    if (zimInstance) {
      
  
      zimInstance.login(info, loginToken) // ✅ Correct syntax
        .then(() => {
          setIsLoggedIn(true);
          console.log(`${info.userName} logged in successfully`);
        })
        .catch((err) => {
          console.log("Login failed", err);
        });
    }
  };
  

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      console.log('User not logged in');
      return;
    }
    const toConversationID = selectedUser === 'vishesh' ? 'utkarsh' : 'vishesh';
    const conversationType = 0;
    const messageTextObj = {
      type: 1,
      message: messageText,
      extendedData: '',
    };
    const config = {
      priority: 1,
    };
    if (!zimInstance) return;
    zimInstance
      .sendMessage(messageTextObj, toConversationID, conversationType, config)
      .then(({ message }) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log('Message sent successfully');
      })
      .catch((err) => {
        console.log('Error in sending message', err);
      });
    setMessageText('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Zego Cloud Chat App</h1>

        {!isLoggedIn ? (
          <div className="space-y-4 text-center">
            <h2 className="text-lg">Select User</h2>
            <select
              className="border p-2 rounded w-full"
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser}
            >
              <option value="vishesh">vishesh</option>
              <option value="utkarsh">utkarsh</option>
            </select>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Chatting as {userInfo.userName} with{' '}
              {selectedUser === 'vishesh' ? 'Client B' : 'Client A'}
            </h2>
            <div className="h-80 overflow-y-auto bg-gray-50 p-4 rounded border">
              {messages.map((msg, i) => {
                const isOwnMessage = msg.senderUserID === userInfo.userID;
                return (
                  <div
                    key={i}
                    className={`flex mb-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded px-4 py-2 max-w-xs break-words shadow text-sm ${
                        isOwnMessage ? 'bg-green-200' : 'bg-white'
                      }`}
                    >
                      <div>{msg.message}</div>
                      <div className="text-gray-500 text-xs text-right">
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef}></div>
            </div>
            <div className="flex space-x-2 mt-4">
              <input
                type="text"
                placeholder="Enter your message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
