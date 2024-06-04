function Confirm(){
  return (
    <>
      <main className="bg_gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div id="confirm">
                <div className="icon icon--order-success svg add_bottom_15">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
                    <g fill="none" stroke="#8EC343" stroke-width="2">
                      <circle cx="36" cy="36" r="35"
                             style={{strokeDasharray:'240px,240px',strokeDashoffset:'480px'}} ></circle>
                      <path d="M17.417,37.778l9.93,9.909l25.444-25.393"
                           style={{strokeDasharray:'50px,50px',strokeDashoffset:'0px'}} ></path>
                    </g>

                  </svg>
                </div>
                <h2>Order completed!</h2>
                <p>You will receive a confirmation email soon!</p>
              </div>
            </div>
          </div>

        </div>


      </main>
    </>
  )
}

export default Confirm
