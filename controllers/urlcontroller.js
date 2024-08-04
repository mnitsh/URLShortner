const URL = require("../Models/url");
const shortid = require("shortid");

async function handlerGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ msg: "url required..." });
    const shortID = shortid();
    await URL.create({
      shortID: shortID,
      redirectURL: url,
      visitHistory: [],
    });
    return res.render("home",{
      id:shortID,
    });

  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

 async function handlerRedirectUser(req,res){
  try {
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    console.log(entry);
    if (!entry) {
        return res.status(404).json({ msg: "Short ID not found" });
    }
    res.redirect(entry.redirectURL)
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal server error..."})
}
};

async function handlerAnalytics(req,res){
  try {
    const shortID = req.params.id;
    const entry = await URL.findOne({shortID});
    if(!entry){
      return res.status(404).json({msg:"Not found..."});
    }
    return res.json({Visited:entry.visitHistory.length})
  } catch (error) {
    return res.status(500).json({msg:"Internal seerver error..."})
  }

};  

module.exports = {
  handlerGenerateNewShortURL,
  handlerRedirectUser,
  handlerAnalytics
};
