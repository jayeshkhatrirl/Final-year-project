import Razorpay from 'razorpay';


    export const CreateOrders = async(req,res,next)=>{
        try{
            const instance = new Razorpay({
                key_id:"rzp_test_yh1IjEg9DR4MKK",
                key_secret:"gWtJnAL7dATeujOiS7l8Px85",
            })
            const {amount , currency,receiptId} = req.body;
            
            const options = {
                      amount: 500000,  // amount in the smallest currency unit
                      currency: "INR",
                      receipt: receiptId,
                   };
            const order = await instance.orders.create(options);
            // console.log(order);
            if(!order) return res.status(500).send("error occured");
            res.json(order);
        }catch(err){
            console.log(err);
        }
    }

