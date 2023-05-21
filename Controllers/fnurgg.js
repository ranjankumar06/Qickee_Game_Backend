const fnurModel = require("../models/fnurggModel")


exports.reviewCount = async (req, res) => {
    try {
        let { count } = req.body
        const presentValue = await fnurModel.findOne({})
        if (presentValue) {
            let add = presentValue.count + count
            const userdata = await fnurModel.updateOne({ count: presentValue.count }, { $set: { count: add } });
            const present = await fnurModel.findOne({})
            res.status(200).json({
                message: "count updated success",
                result: present,
            });
        }
        else {
            const userdata = await fnurModel.create({
                count: count
            });
            res.status(200).json({
                message: "count  success",
                result: userdata,
            });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ success: false, message: "Somthing went wrong !" });
    }
};

exports.getAllreviev = async (req, res) => {
    try {
        const data = await fnurModel.find();
        res.send({ result: data });
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}


exports.updateReview = async (req, res) => {
    try {
        const user = req.body._id;
        const { count } = req.body;
        const data = await fnurModel.findOneAndUpdate(
            { _id: user },
            {
                $set: {
                    count: count
                },
            },
            { new: true }
        );
        if (!data) {
            return res.status(404).json({
                success: true,
                massage: "not Exist",
                result: null,
            });
        }
        res
            .status(200)
            .json({ success: true, massage: "review updated successfully", result: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};