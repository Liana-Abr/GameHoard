const router = require("express").Router();

const productRouter = require("./dbroutes/productRouter.js");
// const categoryRouter = require("./dbroutes/categoryRouter.js")
// const izdatelRouter = require("./dbroutes/izdatelRouter.js")
// const sposob_oplatyRouter = require("./dbroutes/sposob_oplatyRouter.js")
// const akziiRouter = require("./dbroutes/akziiRouter.js")
// const podcategoryRouter = require("./dbroutes/podcategoryRouter.js")
// const zakazRouter = require("./dbroutes/zakazRouter.js")
// const zakaz_productRouter = require("./dbroutes/zakaz_productRouter.js")
// const sliderRouter = require("./dbroutes/sliderRouter.js")
// const skladRouter = require("./dbroutes/skladRouter.js")
// const rassylkaRouter = require("./dbroutes/rassylkaRouter.js")
// const profileRouter = require("./dbroutes/profileRouter.js")

router.use("/product", productRouter);
// router.use("/category", categoryRouter)
// router.use("/izdatel", izdatelRouter)
// router.use("/sposob_oplaty", sposob_oplatyRouter)
// router.use("/akzii", akziiRouter)
// router.use("/podcategory", podcategoryRouter)
// router.use("/zakaz", zakazRouter)
// router.use("/zakaz_product", zakaz_productRouter)
// router.use("/slider", sliderRouter)
// router.use("/sklad", skladRouter)
// router.use("/rassylka", rassylkaRouter)
// router.use("/profile", profileRouter)

module.exports = router;