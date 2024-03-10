import axios from "axios"
import { url } from "./util"

export const payment= (tid,amount,token) => {
    var options = {
      key: "rzp_test_uv3vq4NoADXP99",
      key_secret: "g3KmfRQFo1lZmOdfsinmrMhP",
      amount: amount*100,
      currency: "INR",
      name: "Aqua Odyssey",
      description: "For Testing",
      handler: function (response) {
          axios.put(`${url}/api/user/transaction`,{
            token:token,
            tid:tid,
            referenceId:response.razorpay_payment_id
          },{
            headers:{
                Authorization:`Bearer ${token}`
            }
          })
      },
      prefill: {
        name: "Ashizuki",
        email: "ashizuki@sigma.com",
        contact: "6969696969"
      },
      notes: {
        address: "SKCET"
      },
      theme: {
        color: "#000003"
      }
    }

    var pay = new window.Razorpay(options)
    pay.open()
  }