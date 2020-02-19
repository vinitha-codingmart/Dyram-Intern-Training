module.exports = app => {
  const multer = require("multer");
  const fs = require("fs");

  //Stripe
  const stripe = require("stripe")(
    "sk_test_lqpMzKgSp4UFgO9B2icgkTN2001fLTM0f6"
  );
  const uuid = require("uuid/v1");

  const Calls = require("../controllers/callController");

  app.get("/", (req, res) => {
    res.send("Working Fine!!");
  });

  app.post("/storeCall", async (req, res) => {
    let resp = await Calls.addCall(
      req.body.channel,
      req.body.stats.Duration,
      req.body.stats.UserCount,
      req.body.stats.SendBytes,
      req.body.stats.RecvBytes,
      req.body.stats.SendBitrate,
      req.body.stats.RecvBitrate
    );
    res.send(resp);
  });

  app.post("/checkout", async (req, res) => {
    console.log(req.body);
    let status;
    try {
      let token = req.body.token;
      let customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });

      let idempotencyKey = uuid();

      let charge = await stripe.charges.create(
        {
          amount: 0.4 * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Subscribed to premium with amount ${0.4 * 100}`,
          shipping: {
            name: "Jenny Rosen",
            address: {
              line1: "510 Townsend St",
              postal_code: "98140",
              city: "San Francisco",
              state: "CA",
              country: "US"
            }
          }
        },
        {
          idempotencyKey
        }
      );
      console.log("Charge : ", charge);
      status = "done";
    } catch (error) {
      console.log("error : ", error);
      status = "fail";
    }
    res.json({ status });
  });
};
