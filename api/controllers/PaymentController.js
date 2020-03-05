const StripeApiKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(StripeApiKey);
const User = require("../models/User");
const Token = require("../models/Token");

const PaymentController = () => {
  const buyCoins = async (req, res) => {
    const { body, token } = req;
    const { card, pointsId } = body;
    const { id } = token;
    let customer;

    try {
      let user = await User.findByPk(id);

      // create customer on stripe
      if (user.stripeCustomerId === null) {
        customer = await createStripeCustomer(body, user);

        // if error in create customer on stripe
        if (!customer.id)
          return res.status(500).json({
            success: false,
            error:
              "There is some error while payment. Please try after sometime or connect to customer support",
            err:
              customer.raw && customer.raw.message
                ? customer.raw.message
                : customer
          });
      }

      user = await User.findByPk(id);
      const selectedToken = await Token.findByPk(pointsId);

      if (user.stripeCustomerId) {
        const createCharge = await stripe.charges.create({
          amount: selectedToken.amount * 100,
          currency: "usd",
          source: card.id,
          description: "Buy Tokens",
          customer: user.stripeCustomerId
        });

        if (createCharge.id && createCharge.status === "succeeded") {
          const updatedTokens = user.tokenCount + selectedToken.count;

          await User.update({ tokenCount: updatedTokens }, { where: { id } });

          return res.status(200).json({
            success: true,
            msg: "Your Payment has been done successfully",
            paymentStatus: createCharge.status,
            updatedTokens
          });
        }
        return res.status(500).json({
          success: false,
          msg:
            "There is some error while Payment. Please try after sometime or connect to customer support ",
          error: err.raw && err.raw.message ? err.raw.message : err
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
        error: err.raw && err.raw.message ? err.raw.message : err
      });
    }
  };

  const createStripeCustomer = async (body, user) => {
    const { email } = user;

    try {
      const customer = await stripe.customers.create({
        email
      });

      await User.update(
        { stripeCustomerId: customer.id },
        {
          where: {
            email
          }
        }
      );

      return customer;
    } catch (err) {
      return err;
    }
  };

  return {
    buyCoins,
    createStripeCustomer
  };
};

module.exports = PaymentController;
