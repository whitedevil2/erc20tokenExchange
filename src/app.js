
//creating an object for the Application
App={

  loading:false,
  //contracts object
  contracts: {},

  //asynchronous load function
  load: async ()=>{
    //app Loading
    console.log("App is loading");
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();

  },

  //configuration code for Web3 specified by Metamask
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  //Account loading function
  loadAccount: async ()=>{
    App.account=web3.eth.accounts[0];
    console.log(App.account);
  },

  loadContract: async () =>{
    //fetching the json files
    const RakeshCoin=await $.getJSON('RakeshCoin.json');
    const ShivaniCoin=await $.getJSON('ShivaniCoin.json');
    const SandipCoin=await $.getJSON('SandipCoin.json');

    //creates an java interface to communicate with the Contracts
    //(doubt)
    App.contracts.rakeshcoin=TruffleContract(RakeshCoin);
    App.contracts.rakeshcoin.setProvider(App.web3Provider);

    App.contracts.sandipcoin=TruffleContract(SandipCoin);
    App.contracts.sandipcoin.setProvider(App.web3Provider);

    App.contracts.shivanicoin=TruffleContract(ShivaniCoin);
    App.contracts.shivanicoin.setProvider(App.web3Provider);


    //Fetching values from Blockchain
    App.rakeshcoin=await App.contracts.rakeshcoin.deployed();
    App.sandipcoin=await App.contracts.sandipcoin.deployed();
    App.shivanicoin=await App.contracts.shivanicoin.deployed();

  },

  //render function to render the data on html page
  render: async ()=>{

    if(App.loading)
    return;

    App.setLoading(true);
    $('#account').html(App.account);
    App.setLoading(false);
  },

  setLoading: (boolean)=>{
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },

  getBalanceSandip:async ()=>{
    App.balance_sandip=await App.sandipcoin.balanceOf(App.account);
    App.balance_sandipcoins=web3.fromWei(App.balance_sandip.toNumber(), "ether" )
    $('#balance_sandip').html(App.balance_sandipcoins);

  },

  getBalanceShivani:async ()=>{
    App.balance_shivani=await App.shivanicoin.balanceOf(App.account);
    App.balance_shivanicoins=web3.fromWei(App.balance_shivani.toNumber(), "ether" )
    $('#balance_shivani').html(App.balance_shivanicoins);
  },

  getBalanceRakesh:async () =>{

    App.balance_rakesh=await App.rakeshcoin.balanceOf(App.account);
    App.balance_rakeshcoins=web3.fromWei(App.balance_rakesh.toNumber(), "ether" )
    $('#balance_rakesh').html(App.balance_rakeshcoins);
  }
}



//doubt
$(()=>{
  $(window).load(()=>{
    App.load();
  })
})
