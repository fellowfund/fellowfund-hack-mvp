var express = require("express");
var router = express.Router();

router.post("/verify", async function (req, res, next) {
  console.log(req.body);
  const { proof } = req.body;
  const app_id = "app_staging_e5b0118ebb3d7997239ffc3c131eb863";
  const action = "verify-human";

  try {
    // Make a POST request to Worldcoin's API to verify the proof
    const response = await axios.post(
      `https://developer.worldcoin.org/api/v1/verify/${app_id}`,
      {
        ...proof,
        action: action,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    // If the verification is successful, return the verified status
    if (response.status === 200 && response.data.success) {
      return res.status(200).json({ verified: true });
    } else {
      return res.status(200).json({ verified: false });
    }
  } catch (error) {
    // Handle any errors from the API call
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Error verifying Worldcoin proof" });
  }
});

module.exports = router;
