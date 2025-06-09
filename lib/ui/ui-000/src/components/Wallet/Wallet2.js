import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();
          
    if(provider){
        console.log("good");
        console.log(provider);
        startApp(provider);
          
    }else{
        console.log("download");
    }
    
    function startApp(provider) {
        if(provider !== window.ethereum){
            console.error('Multi wallets installed');
        }
    }