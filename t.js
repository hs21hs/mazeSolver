

  async function w(){
      await wait(5000)
      //setTimeout(()=>{console.log('y')},5000)
      console.log('h')
  }
  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  w()
