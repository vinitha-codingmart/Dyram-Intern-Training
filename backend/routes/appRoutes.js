module.exports = app => {
  const jwt = require("jsonwebtoken");
  const key = require("../config/keys.json");

  //Controllers
  const Calls = require("../controllers/callController");
  const Users = require("../controllers/userController");
  const Subs = require("../controllers/subscribeController");
  const Plans = require("../controllers/planController");

  //Stripe
  const stripe = require("stripe")(
    "sk_test_lqpMzKgSp4UFgO9B2icgkTN2001fLTM0f6"
  );
  const uuid = require("uuid/v1");

  //Routes
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

  app.post("/checkoutSign", async (req, res) => {
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

  app.post("/signUp", async (req, res) => {
    let resp = await Users.addUser(
      req.body.name,
      req.body.pass,
      req.body.validity
    );
    res.send(resp);
  });

  app.post("/login", async (req, res) => {
    let resp = await Users.loginUser(req.body.name, req.body.pass);
    res.send(resp);
  });

  app.post("/validity", async (req, res) => {
    let resp = await Users.getUsers(
      jwt.verify(req.body.data.id, key.tokenKey).id
    );
    res.send(resp);
  });

  app.post("/subscribe", async (req, res) => {
    let resp = await Subs.addSub(
      jwt.verify(req.body.data.id, key.tokenKey).id,
      req.body.validity
    );
    res.send(resp);
  });

  app.post("/getSubs", async (req, res) => {
    let resp = await Subs.getSub(jwt.verify(req.body.data.id, key.tokenKey).id);
    res.send(resp);
  });

  app.post("/unsubscribe", async (req, res) => {
    let resp = await Subs.delSub(jwt.verify(req.body.data.id, key.tokenKey).id);
    res.send({ status: "success" });
  });

  app.post("/subValidity", async (req, res) => {
    let resp = await Subs.getValidity(
      jwt.verify(req.body.data.id, key.tokenKey).id
    );
    res.send(resp);
  });

  app.post("/getData", async (req, res) => {
    let resp = await Subs.getData(
      jwt.verify(req.body.data.id, key.tokenKey).id
    );
    res.send(resp);
  });

  app.post("/planSub", async (req, res) => {
    let resp = await Plans.addPlans(
      jwt.verify(req.body.data.id, key.tokenKey).id,
      req.body.planId
    );
    res.send(resp);
  });

  app.post("/getPlan", async (req, res) => {
    let resp = await Plans.getPlans(
      jwt.verify(req.body.data.id, key.tokenKey).id
    );
    res.send(resp);
  });
};
