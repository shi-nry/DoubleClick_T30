import qs from 'qs'

class SocketWithPrincipals {
  constructor(principals, socket) {
    console.log("Generated socket.")
    console.log("Socket: ", socket);
    this.principals = principals;
    this.socket = socket;
  }

  send(...requests) {

    let result = {
      "requests": []
    }

    let i = 0;
    requests.forEach(request => {
      request.account = this.principals.accounts[0].accountId;
      request.source = this.principals.streamerInfo.appId;
      request.requestid = i;
      result.requests.push(request);
      i++;
    })

    console.log("Sending " + i + " request(s)");

    this.socket.send(JSON.stringify(result));
  }
}

const connect = function(accessToken, messageHandler) {
  return authenticate(accessToken)
    .then(userPrincipalsResponse => {
      return startWebSocket(userPrincipalsResponse, messageHandler)
    })
}

//Returns user principals response
const authenticate = function(accessToken) {
  console.log("Authenticating");
  const authenticationUrl = 'https://api.tdameritrade.com/v1/userprincipals?fields=streamerSubscriptionKeys,streamerConnectionInfo'
  const params = {headers: {'Authorization' : 'Bearer ' + accessToken}}
  return new Promise(resolve => {
    fetch(authenticationUrl, params)
      .then(response => {
        resolve(response.json());
      })
  })
}

const startWebSocket = function(userPrincipalsResponse, messageHandler) {

  return new Promise(resolve => {

    console.log("Starting web socket");

    let mySock = new WebSocket("wss://" + userPrincipalsResponse.streamerInfo.streamerSocketUrl + "/ws");


    //Start off with the login handler since authentication is necessary to pull naything from the API.
    //After login, set the message handler to the one passed in.

    const loginHandler = function(evt) {
      const data = JSON.parse(evt.data);
      if (data.response) {
        if (data.response[0].content.code === 0) {
          mySock.onmessage = messageHandler;
          console.log("Logged in to streaming API");
          resolve(new SocketWithPrincipals(userPrincipalsResponse, mySock));
        }
      }
    }

    mySock.onmessage = loginHandler;
    mySock.onclose = function() { console.log("Socket Closed"); };

    const loginRequest = {
      "requests": [
        {
          "service": "ADMIN",
          "command": "LOGIN",
          "requestid": 0,
          "account": userPrincipalsResponse.accounts[0].accountId,
          "source": userPrincipalsResponse.streamerInfo.appId,
          "parameters": {
            "credential": qs.stringify(makeCredentials(userPrincipalsResponse)),
            "token": userPrincipalsResponse.streamerInfo.token,
            "version": "1.0"
          }
        }
      ]
    }

    //Wait a second for the socket to initialize;
    setTimeout(function() {
      console.log("Logging in to streaming api");
      mySock.send(JSON.stringify(loginRequest));
    }, 1000)
  })

}

function makeCredentials(userPrincipalsResponse) {

  const tokenTimeStampAsDateObj = new Date(userPrincipalsResponse.streamerInfo.tokenTimestamp);
  const tokenTimeStampAsMs = tokenTimeStampAsDateObj.getTime();

  const credentials = {
    "userid": userPrincipalsResponse.accounts[0].accountId,
    "token": userPrincipalsResponse.streamerInfo.token,
    "company": userPrincipalsResponse.accounts[0].company,
    "segment": userPrincipalsResponse.accounts[0].segment,
    "cddomain": userPrincipalsResponse.accounts[0].accountCdDomainId,
    "usergroup": userPrincipalsResponse.streamerInfo.userGroup,
    "accesslevel": userPrincipalsResponse.streamerInfo.accessLevel,
    "authorized": "Y",
    "timestamp": tokenTimeStampAsMs,
    "appid": userPrincipalsResponse.streamerInfo.appId,
    "acl": userPrincipalsResponse.streamerInfo.acl
  }

  return credentials;
}

export default connect;
